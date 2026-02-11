#!/bin/bash
# Run this script AFTER the ACM certificate is validated (DNS CNAME added and propagated)
# This updates the CloudFront distribution to use the custom domain and SSL cert.

set -euo pipefail

DIST_ID="E3EFYIDG8ICOS0"
CERT_ARN="arn:aws:acm:us-east-1:681574184407:certificate/5194cd41-7e17-465d-9dc5-93e5aff22604"

echo "Checking certificate status..."
STATUS=$(aws acm describe-certificate --certificate-arn "$CERT_ARN" --region us-east-1 --query 'Certificate.Status' --output text)
echo "Certificate status: $STATUS"

if [ "$STATUS" != "ISSUED" ]; then
  echo "ERROR: Certificate is not yet issued. Add the DNS CNAME record and wait for validation."
  echo "Current status: $STATUS"
  exit 1
fi

echo "Certificate is validated. Updating CloudFront distribution..."

# Get current config and ETag
ETAG=$(aws cloudfront get-distribution-config --id "$DIST_ID" --query 'ETag' --output text)
aws cloudfront get-distribution-config --id "$DIST_ID" --query 'DistributionConfig' --output json > /tmp/cf-current-config.json

# Update the config: add aliases and certificate
python3 -c "
import json
with open('/tmp/cf-current-config.json') as f:
    config = json.load(f)

config['Aliases'] = {'Quantity': 2, 'Items': ['planterra.co.in', 'www.planterra.co.in']}
config['ViewerCertificate'] = {
    'ACMCertificateArn': '$CERT_ARN',
    'SSLSupportMethod': 'sni-only',
    'MinimumProtocolVersion': 'TLSv1.2_2021'
}

with open('/tmp/cf-updated-config.json', 'w') as f:
    json.dump(config, f, indent=2)
"

aws cloudfront update-distribution --id "$DIST_ID" --if-match "$ETAG" --distribution-config file:///tmp/cf-updated-config.json

echo ""
echo "Distribution updated successfully!"
echo "After DNS propagation, your site will be live at https://planterra.co.in"
