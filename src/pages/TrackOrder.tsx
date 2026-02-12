import { useState } from 'react'
import Reveal from '../components/Reveal'
import { colors, fonts } from '../lib/theme'
import { Link } from 'react-router-dom'

function EditorialRule({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} style={{ color: colors.warmStone }}>
      <div className="flex-1 h-px" style={{ backgroundColor: colors.warmStone, opacity: 0.3 }} />
      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
        <circle cx="4" cy="4" r="3" />
      </svg>
      <div className="flex-1 h-px" style={{ backgroundColor: colors.warmStone, opacity: 0.3 }} />
    </div>
  )
}

interface TrackingStep {
  label: string
  date: string
  time: string
  status: 'completed' | 'current' | 'pending'
  detail: string
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim() || !email.trim()) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setShowResult(true)
    }, 1200)
  }

  const trackingSteps: TrackingStep[] = [
    {
      label: 'Order Placed',
      date: 'Feb 5, 2026',
      time: '2:34 PM',
      status: 'completed',
      detail: 'Your order has been received and confirmed.',
    },
    {
      label: 'Confirmed',
      date: 'Feb 5, 2026',
      time: '3:12 PM',
      status: 'completed',
      detail: 'Payment verified. Order is being prepared.',
    },
    {
      label: 'Shipped',
      date: 'Feb 6, 2026',
      time: '10:45 AM',
      status: 'completed',
      detail: 'Package handed to Delhivery courier.',
    },
    {
      label: 'In Transit',
      date: 'Feb 8, 2026',
      time: '6:20 AM',
      status: 'current',
      detail: 'Package is at the Mumbai sorting facility.',
    },
    {
      label: 'Delivered',
      date: 'Feb 10, 2026',
      time: '',
      status: 'pending',
      detail: 'Estimated delivery date.',
    },
  ]

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="pt-32 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden"
        style={{ backgroundColor: colors.linen }}
      >
        {/* Decorative */}
        <div
          className="absolute top-20 right-8 sm:right-16 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-[0.04]"
          style={{
            border: `1px solid ${colors.sage}`,
            animation: 'floatSlow 7s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-10 left-8 sm:left-12 w-12 h-12 sm:w-20 sm:h-20 rounded-full opacity-[0.03]"
          style={{
            border: `1px solid ${colors.terracotta}`,
            animation: 'float 5s ease-in-out infinite',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <Reveal>
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-3 sm:mb-5"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              Order Tracking
            </span>
            <h1
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05] mb-4 sm:mb-6"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Track Your{' '}
              <span className="italic" style={{ color: colors.sage }}>
                Order
              </span>
            </h1>
            <p
              className="text-sm sm:text-base leading-relaxed max-w-lg mx-auto"
              style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
            >
              Enter your order details below to check the current status and location of your shipment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 lg:p-10"
              style={{ backgroundColor: colors.linen, border: `1px solid ${colors.warmStone}22` }}
            >
              <div className="space-y-5 sm:space-y-6">
                {/* Order ID */}
                <div>
                  <label
                    className="block text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                  >
                    Order ID
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={e => setOrderId(e.target.value)}
                    placeholder="e.g. PLT-2026-0847"
                    required
                    className="w-full px-4 py-3.5 min-h-[48px] text-sm outline-none transition-all duration-300"
                    style={{
                      fontFamily: fonts.sans,
                      backgroundColor: colors.cream,
                      color: colors.charcoal,
                      border: `1px solid ${colors.warmStone}33`,
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = `${colors.sage}66` }}
                    onBlur={e => { e.currentTarget.style.borderColor = `${colors.warmStone}33` }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-xs tracking-[0.15em] uppercase mb-2"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="The email used for the order"
                    required
                    className="w-full px-4 py-3.5 min-h-[48px] text-sm outline-none transition-all duration-300"
                    style={{
                      fontFamily: fonts.sans,
                      backgroundColor: colors.cream,
                      color: colors.charcoal,
                      border: `1px solid ${colors.warmStone}33`,
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = `${colors.sage}66` }}
                    onBlur={e => { e.currentTarget.style.borderColor = `${colors.warmStone}33` }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 min-h-[52px] text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:tracking-[0.25em] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    fontFamily: fonts.sans,
                    backgroundColor: colors.espresso,
                    color: colors.linen,
                    border: 'none',
                  }}
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded-full"
                        style={{
                          border: `2px solid ${colors.linen}44`,
                          borderTopColor: colors.linen,
                          animation: 'spin 0.8s linear infinite',
                        }}
                      />
                      Tracking...
                    </span>
                  ) : (
                    'Track Order'
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Mock Tracking Result */}
      {showResult && (
        <section className="pb-16 sm:pb-24 lg:pb-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
            <Reveal>
              <EditorialRule className="mb-10 sm:mb-14 max-w-xs mx-auto" />
            </Reveal>

            {/* Order Info Card */}
            <Reveal delay={0.1}>
              <div
                className="p-6 sm:p-8 mb-8 sm:mb-10"
                style={{ backgroundColor: colors.linen, border: `1px solid ${colors.warmStone}22` }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase block mb-1"
                      style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                    >
                      Order ID
                    </span>
                    <h3
                      className="text-xl sm:text-2xl"
                      style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                    >
                      {orderId || 'PLT-2026-0847'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs tracking-[0.1em] uppercase"
                      style={{
                        fontFamily: fonts.sans,
                        backgroundColor: `${colors.sage}18`,
                        color: colors.sage,
                        border: `1px solid ${colors.sage}33`,
                      }}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: colors.sage, animation: 'pulse 2s ease-in-out infinite' }}
                      />
                      In Transit
                    </span>
                  </div>
                </div>

                <div
                  className="h-px w-full mt-5 mb-5"
                  style={{ backgroundColor: `${colors.warmStone}22` }}
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase block mb-1"
                      style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                    >
                      Carrier
                    </span>
                    <p
                      className="text-sm"
                      style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                    >
                      Delhivery Express
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase block mb-1"
                      style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                    >
                      Tracking No.
                    </span>
                    <p
                      className="text-sm"
                      style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                    >
                      DL928471625IN
                    </p>
                  </div>
                  <div>
                    <span
                      className="text-[10px] tracking-[0.2em] uppercase block mb-1"
                      style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                    >
                      Est. Delivery
                    </span>
                    <p
                      className="text-sm font-medium"
                      style={{ fontFamily: fonts.sans, color: colors.sage }}
                    >
                      Feb 10, 2026
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tracking Timeline */}
            <Reveal delay={0.2}>
              <div
                className="p-6 sm:p-8 lg:p-10"
                style={{ backgroundColor: colors.linen, border: `1px solid ${colors.warmStone}22` }}
              >
                <h3
                  className="text-lg sm:text-xl mb-8 sm:mb-10"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  Shipment Progress
                </h3>

                <div className="relative">
                  {trackingSteps.map((step, i) => {
                    const isLast = i === trackingSteps.length - 1
                    return (
                      <div
                        key={step.label}
                        className="relative flex gap-4 sm:gap-6"
                        style={{
                          paddingBottom: isLast ? 0 : '2rem',
                          opacity: step.status === 'pending' ? 0.4 : 1,
                          transition: 'opacity 0.5s ease',
                        }}
                      >
                        {/* Timeline Column */}
                        <div className="flex flex-col items-center flex-shrink-0">
                          {/* Circle */}
                          <div
                            className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                            style={{
                              backgroundColor:
                                step.status === 'completed'
                                  ? colors.sage
                                  : step.status === 'current'
                                  ? colors.cream
                                  : colors.cream,
                              border:
                                step.status === 'current'
                                  ? `2px solid ${colors.sage}`
                                  : step.status === 'pending'
                                  ? `1px solid ${colors.warmStone}66`
                                  : 'none',
                            }}
                          >
                            {step.status === 'completed' ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.linen} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : step.status === 'current' ? (
                              <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: colors.sage, animation: 'pulse 2s ease-in-out infinite' }}
                              />
                            ) : (
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: `${colors.warmStone}44` }}
                              />
                            )}

                            {/* Pulse ring for current step */}
                            {step.status === 'current' && (
                              <span
                                className="absolute inset-0 rounded-full"
                                style={{
                                  border: `2px solid ${colors.sage}`,
                                  animation: 'pulseScale 2s ease-in-out infinite',
                                }}
                              />
                            )}
                          </div>

                          {/* Connecting Line */}
                          {!isLast && (
                            <div
                              className="w-px flex-1 mt-1"
                              style={{
                                backgroundColor:
                                  step.status === 'completed' && trackingSteps[i + 1]?.status !== 'pending'
                                    ? colors.sage
                                    : `${colors.warmStone}33`,
                              }}
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-2 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                            <h4
                              className="text-base sm:text-lg"
                              style={{
                                fontFamily: fonts.serif,
                                color:
                                  step.status === 'current'
                                    ? colors.sage
                                    : step.status === 'completed'
                                    ? colors.charcoal
                                    : colors.warmStone,
                              }}
                            >
                              {step.label}
                            </h4>
                            {step.date && (
                              <span
                                className="text-xs flex-shrink-0"
                                style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                              >
                                {step.date}
                                {step.time && ` at ${step.time}`}
                              </span>
                            )}
                          </div>
                          <p
                            className="text-sm mt-1 leading-relaxed"
                            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                          >
                            {step.detail}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section
        className="py-16 sm:py-24 lg:py-32"
        style={{ backgroundColor: showResult ? colors.linen : colors.cream }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-10 sm:mb-14">
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-3 sm:mb-5"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Support
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl leading-[1.1]"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                Need help with{' '}
                <span className="italic" style={{ color: colors.sage }}>
                  your order?
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Contact Us */}
            <Reveal delay={0.1}>
              <Link
                to="/contact"
                className="block p-6 sm:p-8 text-center transition-all duration-500 group"
                style={{
                  backgroundColor: colors.cream,
                  border: `1px solid ${colors.warmStone}22`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${colors.sage}44` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${colors.warmStone}22` }}
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.sage}12` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3
                  className="text-base mb-2"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  Contact Us
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.5 }}
                >
                  Get in touch with our support team for any order-related queries.
                </p>
                <span
                  className="inline-block mt-3 text-xs transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: colors.sage }}
                >
                  Get Help &rarr;
                </span>
              </Link>
            </Reveal>

            {/* FAQ */}
            <Reveal delay={0.2}>
              <Link
                to="/faq"
                className="block p-6 sm:p-8 text-center transition-all duration-500 group"
                style={{
                  backgroundColor: colors.cream,
                  border: `1px solid ${colors.warmStone}22`,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${colors.sage}44` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${colors.warmStone}22` }}
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.sage}12` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3
                  className="text-base mb-2"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  FAQ
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.5 }}
                >
                  Find answers to common questions about shipping and delivery.
                </p>
                <span
                  className="inline-block mt-3 text-xs transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: colors.sage }}
                >
                  Read FAQ &rarr;
                </span>
              </Link>
            </Reveal>

            {/* Shipping Info */}
            <Reveal delay={0.3}>
              <div
                className="p-6 sm:p-8 text-center"
                style={{
                  backgroundColor: colors.cream,
                  border: `1px solid ${colors.warmStone}22`,
                }}
              >
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.sage}12` }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h3
                  className="text-base mb-2"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  Shipping Info
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.5 }}
                >
                  We ship free across India. Standard delivery takes 3-7 business days.
                </p>

                <div className="space-y-2.5 text-left">
                  {[
                    'Free shipping on all orders',
                    'Dispatched within 48 hours',
                    '3-7 business day delivery',
                    'Cash on delivery available',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2">
                      <span
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: colors.sage, fontSize: '12px' }}
                      >
                        &#10003;
                      </span>
                      <span
                        className="text-xs"
                        style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="py-4 sm:py-6" />
    </div>
  )
}
