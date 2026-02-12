import type { Product, Testimonial, FAQItem, TeamMember } from './types'

export const products: Product[] = [
  {
    id: 'starter-kit',
    slug: 'starter-kit',
    name: 'Starter Kit',
    price: 2999,
    originalPrice: 3999,
    description: 'Everything you need to start your wall garden. Two self-watering planters, one wooden dowel, double-sided tape mounting kit, three water absorbers, a cotton ball, and a care guide. No drilling required — just peel, press, and plant.',
    shortDescription: '2 planters + dowel + tape mounting kit',
    features: ['2 Self-watering planters (white)', '1 Wooden dowel (fits 2 planters)', 'Double-sided tape mounting kit', '3 Water absorbers + cotton ball', 'Plant care guide'],
    category: 'kit',
    badge: 'Most Popular',
    inStock: true,
    rating: 4.8,
    reviewCount: 342,
    specs: { 'Planter Size': '15cm x 12cm x 14cm', 'Dowel Length': '35cm (fits 2 planters)', 'Material': 'Precision-crafted PLA', 'Weight': '850g total', 'Reservoir': '100ml drip tray', 'Mounting': 'Double-sided tape (no drilling)' },
    colors: [{ name: 'White', hex: '#F5F0EB' }],
    imageEmoji: '🌿',
    imageBg: '#E8DDD1',
  },
  {
    id: 'add-on-planter',
    slug: 'add-on-planter',
    name: 'Add-On Planter',
    price: 1499,
    description: 'Expand your wall garden with an additional self-watering planter. Clips onto your existing dowel with a thumbscrew knob — no tools needed. Includes its own drip tray and water absorbers.',
    shortDescription: 'Single planter to expand your wall garden',
    features: ['1 Self-watering planter (white)', 'Thumbscrew clip included', 'Built-in 100ml drip tray', '3 Water absorbers + cotton ball', 'Compatible with all Planterra dowels'],
    category: 'planter',
    inStock: true,
    rating: 4.9,
    reviewCount: 87,
    specs: { 'Size': '15cm x 12cm x 14cm', 'Material': 'Precision-crafted PLA', 'Weight': '180g', 'Reservoir': '100ml drip tray', 'Compatibility': 'All Planterra dowels' },
    colors: [{ name: 'White', hex: '#F5F0EB' }],
    imageEmoji: '🪴',
    imageBg: '#F5F0EB',
  },
  {
    id: 'extended-dowel',
    slug: 'extended-dowel',
    name: 'Extended Dowel',
    price: 699,
    description: 'A longer wooden dowel that fits up to 3 planters. Perfect for wider walls or growing your collection beyond the starter setup. Includes double-sided tape mounting kit.',
    shortDescription: 'Longer dowel for up to 3 planters',
    features: ['Fits up to 3 planters', 'Solid wooden dowel', 'Double-sided tape mounting kit', 'Works with all Planterra planters'],
    category: 'accessory',
    badge: 'Coming Soon',
    inStock: false,
    rating: 0,
    reviewCount: 0,
    specs: { 'Length': '55cm', 'Material': 'Birch wood dowel', 'Includes': 'Double-sided tape mounting kit', 'Finish': 'Natural sanded' },
    imageEmoji: '🪵',
    imageBg: '#C4B5A433',
  },
]

export const testimonials: Testimonial[] = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    text: 'I was skeptical about self-watering, but it actually works. Went on a 10-day trip and came back to perfectly happy plants. The drip tray and absorbers are genius.',
    rating: 5,
    detail: 'Starter Kit, 6 months',
  },
  {
    name: 'Arjun & Meera Iyer',
    location: 'Bangalore',
    text: 'Our apartment is tiny — no balcony. These planters turned a blank kitchen wall into a herb garden. Fresh tulsi and mint every morning. And zero holes in the wall.',
    rating: 5,
    detail: 'Starter Kit, 3 months',
  },
  {
    name: 'Kavitha Reddy',
    location: 'Hyderabad',
    text: 'We rent, so no drilling was the dealbreaker. The double-sided tape holds perfectly and I can take it with me when I move. Already ordered an add-on planter.',
    rating: 5,
    detail: 'Starter Kit + Add-On, 4 months',
  },
  {
    name: 'Rahul Kapoor',
    location: 'Delhi',
    text: 'Survived Delhi summer at 45 degrees without any warping. The self-watering tray means I only refill once a week. Super durable.',
    rating: 5,
    detail: 'Starter Kit, 8 months',
  },
  {
    name: 'Ananya Desai',
    location: 'Pune',
    text: 'Gifted the starter kit to my parents. They love not having to water daily. Setup took two minutes — just tape and done.',
    rating: 5,
    detail: 'Starter Kit, 4 months',
  },
  {
    name: 'Vikram Nair',
    location: 'Kochi',
    text: 'As an architect, I appreciate the clean design. The ribbed texture looks premium, and the thumbscrew clips are clever. Recommended it to three clients already.',
    rating: 5,
    detail: 'Starter Kit + Add-On, 1 year',
  },
]

export const faqs: FAQItem[] = [
  {
    question: 'What types of plants work best with Planterra?',
    answer: 'Our planters work beautifully with trailing plants like pothos, philodendrons, and string of pearls. They are also perfect for herbs like basil, mint, and tulsi. Succulents work well too, though you would fill the drip tray less frequently. We include a plant guide with every kit.',
    category: 'Plants',
  },
  {
    question: 'How does the self-watering system actually work?',
    answer: 'Each planter has a built-in drip tray (100ml) at the bottom with three water absorbers. A cotton ball at the base wicks moisture up into the soil as it dries. Just fill the drip tray, and your plants stay hydrated for days without daily watering.',
    category: 'Product',
  },
  {
    question: 'Will mounting damage my walls?',
    answer: 'Not at all. Planterra uses double-sided tape to mount the wooden dowel — zero drilling required. The tape holds firmly on any smooth wall and peels off cleanly when you move. This is what makes Planterra perfect for renters.',
    category: 'Installation',
  },
  {
    question: 'How much weight can the dowel hold?',
    answer: 'The standard dowel (included in the Starter Kit) supports two fully watered planters with mature plants. Our Extended Dowel fits up to three planters. The double-sided tape is rated for the weight of the full setup.',
    category: 'Product',
  },
  {
    question: 'Is the material safe for plants?',
    answer: 'Yes. Our planters are precision-crafted from PLA, a plant-based bioplastic derived from corn starch. It contains no BPA or harmful chemicals and is UV-resistant under normal indoor conditions. The ribbed texture is a signature of the layer-by-layer crafting process.',
    category: 'Product',
  },
  {
    question: 'Do you ship across India? Is COD available?',
    answer: 'We ship free to all pin codes in India. Orders are dispatched within 48 hours and typically arrive in 3 to 7 business days. Yes, cash on delivery (COD) is available on all orders. If your planter arrives damaged, we will send a replacement immediately.',
    category: 'Shipping',
  },
  {
    question: 'Can I use Planterra outdoors?',
    answer: 'Yes. Our planters are UV-resistant and weatherproof, handling full Indian sun and monsoon rain. For outdoor use, ensure the double-sided tape is applied to a clean, smooth surface for best hold.',
    category: 'Product',
  },
  {
    question: 'How do I add more planters later?',
    answer: 'Simply get an Add-On Planter and clip it onto your existing dowel using the thumbscrew knob. If you need space for a third planter, grab the Extended Dowel. Start with 2, add more anytime.',
    category: 'Product',
  },
]

export const teamMembers: TeamMember[] = [
  {
    name: 'Rohan Mehta',
    role: 'Founder & Designer',
    bio: 'Former product designer at a Bangalore startup. Started Planterra after killing his 14th houseplant and refusing to accept defeat.',
    emoji: '🎨',
  },
  {
    name: 'Sneha Krishnan',
    role: 'Co-Founder & Engineer',
    bio: '3D printing obsessive and mechanical engineer. Designed the self-watering mechanism after 47 prototypes and a lot of wet floors.',
    emoji: '⚙️',
  },
  {
    name: 'Aditya Patel',
    role: 'Head of Production',
    bio: 'Manages our print farm of 12 printers. Ensures every planter that ships is perfect. Has names for each printer.',
    emoji: '🖨️',
  },
  {
    name: 'Deepa Nair',
    role: 'Plant Specialist',
    bio: 'Horticulturist who writes our care guides and tests every plant variety in our planters. Has 200+ plants at home.',
    emoji: '🌱',
  },
]

export function formatPrice(price: number): string {
  return `Rs. ${price.toLocaleString('en-IN')}`
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}
