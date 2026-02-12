import { useState, useEffect } from 'react'
import Reveal, { useScrollY } from '../components/Reveal'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { useCart } from '../context/CartContext'
import { colors, fonts } from '../lib/theme'
import { products, formatPrice, getProductBySlug } from '../lib/data'
import type { Product } from '../lib/types'
import { Link, useParams } from 'react-router-dom'

// ─── Star Rating ───
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? colors.sage : `${colors.warmStone}44`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ─── Quantity Selector ───
function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number
  onChange: (q: number) => void
}) {
  return (
    <div
      className="inline-flex items-center"
      style={{ border: `1px solid ${colors.warmStone}44` }}
    >
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="w-11 h-11 flex items-center justify-center text-lg transition-colors duration-300 cursor-pointer"
        style={{
          fontFamily: fonts.sans,
          color: colors.espresso,
          backgroundColor: 'transparent',
          border: 'none',
        }}
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <span
        className="w-12 h-11 flex items-center justify-center text-sm"
        style={{
          fontFamily: fonts.sans,
          color: colors.charcoal,
          borderLeft: `1px solid ${colors.warmStone}44`,
          borderRight: `1px solid ${colors.warmStone}44`,
        }}
      >
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="w-11 h-11 flex items-center justify-center text-lg transition-colors duration-300 cursor-pointer"
        style={{
          fontFamily: fonts.sans,
          color: colors.espresso,
          backgroundColor: 'transparent',
          border: 'none',
        }}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}

// ─── Breadcrumb ───
function Breadcrumb({ productName }: { productName: string }) {
  return (
    <Reveal>
      <nav className="flex items-center gap-2 flex-wrap mb-8 sm:mb-12">
        <Link
          to="/"
          className="text-xs tracking-[0.1em] uppercase transition-colors duration-300 hover:opacity-70"
          style={{ fontFamily: fonts.sans, color: colors.warmStone }}
        >
          Home
        </Link>
        <span className="text-xs" style={{ color: colors.warmStone, opacity: 0.4 }}>
          /
        </span>
        <Link
          to="/shop"
          className="text-xs tracking-[0.1em] uppercase transition-colors duration-300 hover:opacity-70"
          style={{ fontFamily: fonts.sans, color: colors.warmStone }}
        >
          Shop
        </Link>
        <span className="text-xs" style={{ color: colors.warmStone, opacity: 0.4 }}>
          /
        </span>
        <span
          className="text-xs tracking-[0.1em] uppercase"
          style={{ fontFamily: fonts.sans, color: colors.espresso }}
        >
          {productName}
        </span>
      </nav>
    </Reveal>
  )
}

// ─── Color Selector ───
function ColorSelector({
  productColors,
  selected,
  onSelect,
}: {
  productColors: { name: string; hex: string }[]
  selected: number
  onSelect: (i: number) => void
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs tracking-[0.1em] uppercase"
        style={{ fontFamily: fonts.sans, color: colors.warmStone }}
      >
        Color:
      </span>
      <div className="flex gap-2">
        {productColors.map((c, i) => (
          <button
            key={c.name}
            onClick={() => onSelect(i)}
            className="w-8 h-8 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              backgroundColor: c.hex,
              border: selected === i ? `2px solid ${colors.espresso}` : `2px solid ${colors.warmStone}44`,
              boxShadow: selected === i ? `0 0 0 2px ${colors.linen}, 0 0 0 4px ${colors.espresso}` : 'none',
            }}
            aria-label={c.name}
            title={c.name}
          />
        ))}
      </div>
      <span
        className="text-xs"
        style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
      >
        {productColors[selected]?.name}
      </span>
    </div>
  )
}

// ─── Specifications Table ───
function SpecsTable({ specs }: { specs: Record<string, string> }) {
  return (
    <Reveal>
      <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: colors.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              Specifications
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl mb-8 sm:mb-12"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Technical <span className="italic" style={{ color: colors.sage }}>details</span>
            </h2>

            <div>
              {Object.entries(specs).map(([key, value], i) => (
                <Reveal key={key} delay={i * 0.05}>
                  <div
                    className="flex flex-col sm:flex-row sm:items-center py-4 sm:py-5 gap-1 sm:gap-0"
                    style={{
                      borderBottom: `1px solid ${colors.warmStone}22`,
                    }}
                  >
                    <span
                      className="text-xs tracking-[0.1em] uppercase sm:w-48 flex-shrink-0"
                      style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                    >
                      {key}
                    </span>
                    <span
                      className="text-sm sm:text-base"
                      style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.8 }}
                    >
                      {value}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  )
}

// ─── Related Products ───
function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const { addToCart } = useCart()

  // Get products from same category, excluding current, fallback to all others
  let related = products.filter(
    (p) => p.category === currentProduct.category && p.id !== currentProduct.id
  )
  if (related.length < 4) {
    const extras = products.filter(
      (p) => p.id !== currentProduct.id && !related.find((r) => r.id === p.id)
    )
    related = [...related, ...extras].slice(0, 4)
  } else {
    related = related.slice(0, 4)
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: colors.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-3">
            <div>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-3 sm:mb-4"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                You May Also Like
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                Related <span className="italic" style={{ color: colors.sage }}>products</span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:opacity-70"
              style={{
                fontFamily: fonts.sans,
                color: colors.espresso,
                borderBottom: `1px solid ${colors.warmStone}44`,
                paddingBottom: '2px',
              }}
            >
              View All &rarr;
            </Link>
          </div>
        </Reveal>

        {/* Scrollable on mobile, grid on desktop */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 lg:pb-0 lg:grid lg:grid-cols-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {related.map((product, i) => (
            <Reveal
              key={product.id}
              delay={i * 0.1}
              direction="up"
              className="min-w-[70vw] sm:min-w-[45vw] lg:min-w-0 snap-center"
            >
              <div
                className="group transition-all duration-500 h-full flex flex-col"
                style={{
                  backgroundColor: colors.cream,
                  border: `1px solid ${colors.warmStone}22`,
                }}
              >
                <Link to={`/product/${product.slug}`} className="block overflow-hidden">
                  <div className="transition-transform duration-700 group-hover:scale-105">
                    <ImagePlaceholder
                      emoji={product.imageEmoji}
                      description={product.name}
                      aspect="1/1"
                      bg={product.imageBg}
                    />
                  </div>
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/product/${product.slug}`}>
                    <h4
                      className="text-base sm:text-lg mb-1 transition-colors duration-300 group-hover:text-sage"
                      style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                    >
                      {product.name}
                    </h4>
                  </Link>
                  <p
                    className="text-xs mb-3 flex-1"
                    style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                  >
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-base"
                      style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-xs tracking-[0.1em] uppercase px-3 py-2 min-h-[36px] transition-all duration-400 cursor-pointer active:scale-95"
                      style={{
                        fontFamily: fonts.sans,
                        color: colors.linen,
                        backgroundColor: colors.espresso,
                        border: 'none',
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 404 Not Found ───
function ProductNotFound() {
  return (
    <div
      className="min-h-[70vh] flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: colors.cream }}
    >
      <Reveal>
        <div className="text-center">
          <p
            className="text-6xl sm:text-8xl mb-6"
            style={{ animation: 'floatSlow 5s ease-in-out infinite' }}
          >
            🌵
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: fonts.serif, color: colors.charcoal }}
          >
            Product not <span className="italic" style={{ color: colors.sage }}>found</span>
          </h1>
          <p
            className="text-sm sm:text-base mb-8 max-w-md mx-auto"
            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
          >
            We couldn't find the product you're looking for. It may have been removed
            or the link might be incorrect.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-3 px-7 py-4 min-h-[48px] text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.25em]"
            style={{
              fontFamily: fonts.sans,
              backgroundColor: colors.espresso,
              color: colors.linen,
            }}
          >
            <span>&larr;</span>
            <span>Back to Shop</span>
          </Link>
        </div>
      </Reveal>
    </div>
  )
}

// ─── Main Product Detail Page ───
export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addToCart } = useCart()
  const scrollY = useScrollY()

  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [addedFeedback, setAddedFeedback] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1)
    setSelectedColor(0)
    setAddedFeedback(false)
    window.scrollTo(0, 0)
  }, [slug])

  if (!product) {
    return <ProductNotFound />
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div style={{ backgroundColor: colors.cream, overflowX: 'hidden' }}>
      {/* Product Section */}
      <section
        className="pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-24 lg:pb-32 relative overflow-hidden"
        style={{ backgroundColor: colors.linen }}
      >
        {/* Decorative background */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 60% 40%, ${colors.sage} 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumb productName={product.name} />

          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 gap-8">
            {/* Left: Image */}
            <div
              className="lg:col-span-6 xl:col-span-7"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
              }}
            >
              <div className="sticky top-28">
                <div className="relative">
                  {/* Badge */}
                  {product.badge && (
                    <div
                      className="absolute top-4 left-4 z-10 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase"
                      style={{
                        fontFamily: fonts.sans,
                        backgroundColor:
                          product.badge === 'Most Popular'
                            ? colors.sage
                            : product.badge === 'New'
                              ? colors.terracotta
                              : product.badge === 'Best Value'
                                ? colors.espresso
                                : colors.forest,
                        color: colors.linen,
                      }}
                    >
                      {product.badge}
                    </div>
                  )}

                  <ImagePlaceholder
                    emoji={product.imageEmoji}
                    description={product.description}
                    aspect="4/5"
                    bg={product.imageBg}
                    className="w-full"
                  />
                </div>

                {/* Color dots below image */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mt-5 sm:mt-6">
                    <ColorSelector
                      productColors={product.colors}
                      selected={selectedColor}
                      onSelect={setSelectedColor}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Details */}
            <div
              className="lg:col-span-6 xl:col-span-5"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
              }}
            >
              {/* Category badge */}
              <span
                className="inline-block text-[10px] tracking-[0.3em] uppercase mb-4 sm:mb-5 px-3 py-1.5"
                style={{
                  fontFamily: fonts.sans,
                  color: colors.sage,
                  backgroundColor: `${colors.sage}12`,
                  border: `1px solid ${colors.sage}22`,
                }}
              >
                {product.category}
              </span>

              {/* Product name */}
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl leading-[1.05] mb-4 sm:mb-5"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <Stars rating={product.rating} />
                <span
                  className="text-sm"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                >
                  {product.rating}
                </span>
                <span
                  className="text-sm"
                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                >
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 sm:mb-8">
                <span
                  className="text-3xl sm:text-4xl"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span
                      className="text-base line-through"
                      style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                    >
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span
                      className="text-xs tracking-[0.1em] uppercase px-2 py-1"
                      style={{
                        fontFamily: fonts.sans,
                        backgroundColor: `${colors.terracotta}15`,
                        color: colors.terracotta,
                      }}
                    >
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p
                className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8"
                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
              >
                {product.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px mb-6 sm:mb-8" style={{ backgroundColor: `${colors.warmStone}22` }} />

              {/* Features */}
              <div className="mb-6 sm:mb-8">
                <span
                  className="text-[10px] tracking-[0.2em] uppercase block mb-3 sm:mb-4"
                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                >
                  What's included
                </span>
                <ul className="space-y-2.5">
                  {product.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                      style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.8 }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: colors.sage }}
                      >
                        &#10003;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider */}
              <div className="w-full h-px mb-6 sm:mb-8" style={{ backgroundColor: `${colors.warmStone}22` }} />

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5 sm:mb-6">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer active:scale-[0.97]"
                  style={{
                    fontFamily: fonts.sans,
                    backgroundColor: addedFeedback ? colors.sage : colors.espresso,
                    color: colors.linen,
                    border: 'none',
                  }}
                >
                  {addedFeedback
                    ? `Added ${quantity} to Cart!`
                    : `Add to Cart \u2014 ${formatPrice(product.price * quantity)}`}
                </button>
              </div>

              {/* Stock + Shipping */}
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: product.inStock ? colors.sage : colors.terracotta,
                      animation: product.inStock ? 'pulse 2s ease-in-out infinite' : 'none',
                    }}
                  />
                  <span
                    className="text-xs tracking-[0.05em]"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                  >
                    {product.inStock ? 'In Stock — Ready to ship' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.sage}
                    strokeWidth="1.5"
                  >
                    <path d="M5 18H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h10l4 4v7a1 1 0 0 1-1 1h-2" />
                    <circle cx="7" cy="18" r="2" />
                    <circle cx="15" cy="18" r="2" />
                    <path d="M16 6h4l3 3v5a1 1 0 0 1-1 1h-1" />
                  </svg>
                  <span
                    className="text-xs tracking-[0.05em]"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                  >
                    Free shipping across India &middot; 3-7 business days
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.sage}
                    strokeWidth="1.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span
                    className="text-xs tracking-[0.05em]"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                  >
                    1-year warranty &middot; COD available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <SpecsTable specs={product.specs} />

      {/* Related Products */}
      <RelatedProducts currentProduct={product} />
    </div>
  )
}
