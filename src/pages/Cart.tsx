import { useState } from 'react'
import Reveal from '../components/Reveal'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { useCart } from '../context/CartContext'
import { colors, fonts } from '../lib/theme'
import { products, formatPrice } from '../lib/data'
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

export default function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)

  const suggestedProducts = products
    .filter(p => !items.some(item => item.product.id === p.id))
    .slice(0, 3)

  const handleRemove = (productId: string) => {
    setRemovingId(productId)
    setTimeout(() => {
      removeFromCart(productId)
      setRemovingId(null)
    }, 300)
  }

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim()) {
      setPromoApplied(true)
    }
  }

  return (
    <div style={{ backgroundColor: colors.cream, minHeight: '100vh' }}>
      {/* Page Header */}
      <section className="pt-32 sm:pt-36 lg:pt-44 pb-8 sm:pb-12" style={{ backgroundColor: colors.linen }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <span
                  className="text-[10px] tracking-[0.4em] uppercase block mb-3 sm:mb-4"
                  style={{ fontFamily: fonts.sans, color: colors.sage }}
                >
                  Shopping
                </span>
                <h1
                  className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  Your Cart
                </h1>
              </div>
              <p
                className="text-sm"
                style={{ fontFamily: fonts.sans, color: colors.warmStone }}
              >
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <EditorialRule className="mt-8 sm:mt-12" />
          </Reveal>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {items.length === 0 ? (
            /* Empty State */
            <Reveal>
              <div className="text-center py-16 sm:py-24 lg:py-32">
                <div
                  className="text-7xl sm:text-8xl lg:text-9xl mb-6 sm:mb-8"
                  style={{ animation: 'floatSlow 6s ease-in-out infinite' }}
                >
                  🌵
                </div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl mb-4"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  Your cart is empty
                </h2>
                <p
                  className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                >
                  Looks like you haven't added any planters yet. Explore our collection and bring your walls to life.
                </p>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:tracking-[0.25em]"
                  style={{ fontFamily: fonts.sans, backgroundColor: colors.espresso, color: colors.linen }}
                >
                  <span>Continue Shopping</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </Reveal>
          ) : (
            /* Cart with Items */
            <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12">
              {/* Left: Cart Items */}
              <div className="lg:col-span-7">
                <div className="space-y-0">
                  {items.map((item, i) => (
                    <Reveal key={item.product.id} delay={i * 0.05}>
                      <div
                        className="flex gap-4 sm:gap-6 py-6 sm:py-8 transition-all duration-300"
                        style={{
                          borderBottom: `1px solid ${colors.warmStone}22`,
                          opacity: removingId === item.product.id ? 0 : 1,
                          transform: removingId === item.product.id ? 'translateX(-20px)' : 'translateX(0)',
                        }}
                      >
                        {/* Product Image */}
                        <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                          <ImagePlaceholder
                            emoji={item.product.imageEmoji}
                            aspect="1/1"
                            bg={item.product.imageBg}
                            className="w-20 h-20 sm:w-28 sm:h-28"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <Link
                                to={`/product/${item.product.slug}`}
                                className="block transition-colors duration-300 hover:opacity-70"
                              >
                                <h3
                                  className="text-base sm:text-lg truncate"
                                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                                >
                                  {item.product.name}
                                </h3>
                              </Link>
                              {item.product.badge && (
                                <span
                                  className="inline-block mt-1 px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase"
                                  style={{ fontFamily: fonts.sans, backgroundColor: `${colors.sage}22`, color: colors.sage }}
                                >
                                  {item.product.badge}
                                </span>
                              )}
                              <p
                                className="mt-1 text-sm"
                                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.5 }}
                              >
                                {item.product.shortDescription}
                              </p>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => handleRemove(item.product.id)}
                              className="flex-shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-300 hover:opacity-60 cursor-pointer"
                              style={{ color: colors.warmStone }}
                              aria-label={`Remove ${item.product.name}`}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </button>
                          </div>

                          {/* Price + Quantity Row */}
                          <div className="flex items-center justify-between mt-4 sm:mt-5">
                            {/* Quantity Controls */}
                            <div
                              className="flex items-center"
                              style={{ border: `1px solid ${colors.warmStone}33` }}
                            >
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300 hover:bg-opacity-5 cursor-pointer"
                                style={{ fontFamily: fonts.sans, color: colors.charcoal, backgroundColor: 'transparent' }}
                                aria-label="Decrease quantity"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </button>
                              <span
                                className="w-10 sm:w-12 text-center text-sm"
                                style={{
                                  fontFamily: fonts.sans,
                                  color: colors.charcoal,
                                  borderLeft: `1px solid ${colors.warmStone}33`,
                                  borderRight: `1px solid ${colors.warmStone}33`,
                                  lineHeight: '36px',
                                }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300 hover:bg-opacity-5 cursor-pointer"
                                style={{ fontFamily: fonts.sans, color: colors.charcoal, backgroundColor: 'transparent' }}
                                aria-label="Increase quantity"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <line x1="12" y1="5" x2="12" y2="19" />
                                  <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </button>
                            </div>

                            {/* Line Total */}
                            <div className="text-right">
                              <p
                                className="text-base sm:text-lg font-medium"
                                style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                              >
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              {item.quantity > 1 && (
                                <p
                                  className="text-xs mt-0.5"
                                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                                >
                                  {formatPrice(item.product.price)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>

                {/* Clear Cart */}
                <Reveal delay={0.2}>
                  <div className="mt-6 sm:mt-8 flex items-center justify-between">
                    <Link
                      to="/shop"
                      className="text-sm transition-colors duration-300 hover:opacity-70 inline-flex items-center gap-2"
                      style={{ fontFamily: fonts.sans, color: colors.sage }}
                    >
                      <span>&larr;</span>
                      <span>Continue Shopping</span>
                    </Link>
                    <button
                      onClick={clearCart}
                      className="text-sm transition-all duration-300 hover:opacity-70 cursor-pointer px-4 py-2"
                      style={{
                        fontFamily: fonts.sans,
                        color: colors.warmStone,
                        backgroundColor: 'transparent',
                        border: `1px solid ${colors.warmStone}33`,
                      }}
                    >
                      Clear Cart
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-5 mt-10 lg:mt-0">
                <div className="lg:sticky lg:top-28">
                  <Reveal delay={0.15}>
                    <div
                      className="p-6 sm:p-8"
                      style={{ backgroundColor: colors.linen, border: `1px solid ${colors.warmStone}22` }}
                    >
                      <h2
                        className="text-xl sm:text-2xl mb-6 sm:mb-8"
                        style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                      >
                        Order Summary
                      </h2>

                      {/* Subtotal */}
                      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                        <div className="flex items-center justify-between">
                          <span
                            className="text-sm"
                            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                          >
                            Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                          </span>
                          <span
                            className="text-sm font-medium"
                            style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                          >
                            {formatPrice(totalPrice)}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span
                            className="text-sm"
                            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                          >
                            Shipping
                          </span>
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs line-through"
                              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                            >
                              Rs. 99
                            </span>
                            <span
                              className="text-sm font-medium"
                              style={{ fontFamily: fonts.sans, color: colors.sage }}
                            >
                              Free
                            </span>
                          </div>
                        </div>

                        <div
                          className="h-px w-full"
                          style={{ backgroundColor: `${colors.warmStone}33` }}
                        />

                        <div className="flex items-center justify-between">
                          <span
                            className="text-base font-medium"
                            style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                          >
                            Estimated Total
                          </span>
                          <span
                            className="text-xl sm:text-2xl"
                            style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                          >
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>

                      {/* Promo Code */}
                      <form onSubmit={handlePromoSubmit} className="mb-6 sm:mb-8">
                        <label
                          className="block text-xs tracking-[0.1em] uppercase mb-2"
                          style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                        >
                          Promo Code
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={promoCode}
                            onChange={e => setPromoCode(e.target.value)}
                            placeholder="Enter code"
                            className="flex-1 px-4 py-3 min-h-[44px] text-sm outline-none transition-colors duration-300"
                            style={{
                              fontFamily: fonts.sans,
                              backgroundColor: colors.cream,
                              color: colors.charcoal,
                              border: `1px solid ${colors.warmStone}33`,
                              borderRight: 'none',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = `${colors.sage}66` }}
                            onBlur={e => { e.currentTarget.style.borderColor = `${colors.warmStone}33` }}
                          />
                          <button
                            type="submit"
                            className="px-4 sm:px-5 py-3 min-h-[44px] text-xs tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer"
                            style={{
                              fontFamily: fonts.sans,
                              backgroundColor: colors.sage,
                              color: colors.linen,
                              border: `1px solid ${colors.sage}`,
                            }}
                          >
                            Apply
                          </button>
                        </div>
                        {promoApplied && (
                          <p
                            className="mt-2 text-xs"
                            style={{ fontFamily: fonts.sans, color: colors.sage }}
                          >
                            Promo code applied successfully!
                          </p>
                        )}
                      </form>

                      {/* Checkout Button */}
                      <Link
                        to="/checkout"
                        className="block w-full py-4 min-h-[52px] text-center text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:tracking-[0.25em] active:scale-[0.98]"
                        style={{
                          fontFamily: fonts.sans,
                          backgroundColor: colors.espresso,
                          color: colors.linen,
                        }}
                      >
                        Proceed to Checkout
                      </Link>

                      {/* Trust Badges */}
                      <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {[
                          {
                            icon: (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5">
                                <path d="M5 12h14" />
                                <path d="M12 5l7 7-7 7" />
                              </svg>
                            ),
                            label: 'Free Shipping',
                          },
                          {
                            icon: (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5">
                                <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0" />
                                <path d="M12 8v4l3 3" />
                              </svg>
                            ),
                            label: 'COD Available',
                          },
                          {
                            icon: (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="M9 12l2 2 4-4" />
                              </svg>
                            ),
                            label: 'Secure Checkout',
                          },
                        ].map(badge => (
                          <div key={badge.label} className="flex items-center gap-1.5">
                            {badge.icon}
                            <span
                              className="text-[10px] tracking-[0.05em] uppercase"
                              style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.5 }}
                            >
                              {badge.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>

                  {/* Suggested Add-ons */}
                  {suggestedProducts.length > 0 && (
                    <Reveal delay={0.25}>
                      <div className="mt-6 sm:mt-8">
                        <h3
                          className="text-sm tracking-[0.15em] uppercase mb-4 sm:mb-5"
                          style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                        >
                          You might also like
                        </h3>
                        <div className="space-y-3">
                          {suggestedProducts.map(product => (
                            <Link
                              key={product.id}
                              to={`/product/${product.slug}`}
                              className="flex items-center gap-4 p-3 sm:p-4 transition-all duration-300"
                              style={{
                                backgroundColor: colors.linen,
                                border: `1px solid ${colors.warmStone}15`,
                              }}
                              onMouseEnter={e => {
                                e.currentTarget.style.borderColor = `${colors.sage}33`
                                e.currentTarget.style.backgroundColor = colors.cream
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.borderColor = `${colors.warmStone}15`
                                e.currentTarget.style.backgroundColor = colors.linen
                              }}
                            >
                              <ImagePlaceholder
                                emoji={product.imageEmoji}
                                aspect="1/1"
                                bg={product.imageBg}
                                className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4
                                  className="text-sm truncate"
                                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                                >
                                  {product.name}
                                </h4>
                                <p
                                  className="text-xs mt-0.5"
                                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                                >
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <span
                                className="text-xs flex-shrink-0"
                                style={{ color: colors.sage }}
                              >
                                &rarr;
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="py-8 sm:py-12 lg:py-16" />
    </div>
  )
}
