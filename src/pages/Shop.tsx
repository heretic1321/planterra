import { useState } from 'react'
import Reveal, { useScrollY } from '../components/Reveal'
import Marquee from '../components/Marquee'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { useCart } from '../context/CartContext'
import { colors, fonts } from '../lib/theme'
import { products, formatPrice } from '../lib/data'
import type { Product } from '../lib/types'
import { Link } from 'react-router-dom'

// ─── Types ───
type CategoryFilter = 'all' | Product['category']

// ─── Category Config ───
const categories: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'kit', label: 'Kits' },
  { key: 'planter', label: 'Planters' },
  { key: 'accessory', label: 'Accessories' },
]

// ─── Badge Colors ───
function getBadgeStyle(badge: string) {
  switch (badge) {
    case 'Most Popular':
      return { backgroundColor: colors.sage, color: colors.linen }
    case 'New':
      return { backgroundColor: colors.terracotta, color: colors.linen }
    case 'Best Value':
      return { backgroundColor: colors.espresso, color: colors.linen }
    case 'Premium':
      return { backgroundColor: colors.forest, color: colors.linen }
    default:
      return { backgroundColor: colors.warmStone, color: colors.linen }
  }
}

// ─── Star Rating ───
function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
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

// ─── Product Card ───
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [addedFeedback, setAddedFeedback] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAddedFeedback(true)
    setTimeout(() => setAddedFeedback(false), 1500)
  }

  return (
    <Reveal delay={index * 0.08} direction={index % 3 === 0 ? 'left' : index % 3 === 1 ? 'up' : 'right'}>
      <div
        className="group relative flex flex-col h-full transition-all duration-500"
        style={{
          backgroundColor: colors.linen,
          border: `1px solid ${isHovered ? `${colors.sage}44` : `${colors.warmStone}22`}`,
          transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: isHovered
            ? `0 20px 60px ${colors.espresso}12, 0 8px 24px ${colors.espresso}08`
            : `0 2px 8px ${colors.espresso}06`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase"
            style={{ fontFamily: fonts.sans, ...getBadgeStyle(product.badge) }}
          >
            {product.badge}
          </div>
        )}

        {/* Image */}
        <Link to={`/product/${product.slug}`} className="block relative overflow-hidden">
          <div
            className="transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <ImagePlaceholder
              emoji={product.imageEmoji}
              description={product.name}
              aspect="4/5"
              bg={product.imageBg}
            />
          </div>
        </Link>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {/* Category */}
          <span
            className="text-[10px] tracking-[0.2em] uppercase mb-1.5"
            style={{ fontFamily: fonts.sans, color: colors.warmStone }}
          >
            {product.category}
          </span>

          {/* Name */}
          <Link to={`/product/${product.slug}`}>
            <h3
              className="text-lg sm:text-xl mb-1.5 transition-colors duration-300"
              style={{
                fontFamily: fonts.serif,
                color: isHovered ? colors.sage : colors.charcoal,
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          <p
            className="text-xs sm:text-sm leading-relaxed mb-3 flex-1"
            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
          >
            {product.shortDescription}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Stars rating={product.rating} />
            <span
              className="text-[11px]"
              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
            >
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span
              className="text-xl sm:text-2xl"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                className="text-sm line-through"
                style={{ fontFamily: fonts.sans, color: colors.warmStone }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 min-h-[44px] text-xs tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer active:scale-[0.97]"
              style={{
                fontFamily: fonts.sans,
                backgroundColor: addedFeedback ? colors.sage : colors.espresso,
                color: colors.linen,
                border: 'none',
              }}
            >
              {addedFeedback ? 'Added!' : 'Add to Cart'}
            </button>
            <Link
              to={`/product/${product.slug}`}
              className="flex items-center justify-center px-4 py-3 min-h-[44px] text-xs tracking-[0.15em] uppercase transition-all duration-500"
              style={{
                fontFamily: fonts.sans,
                color: colors.espresso,
                border: `1px solid ${colors.warmStone}44`,
              }}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Hero Banner ───
function ShopHero() {
  const scrollY = useScrollY()

  return (
    <section
      className="relative pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
      style={{ backgroundColor: colors.cream }}
    >
      {/* Decorative dot pattern */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, ${colors.sage} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* Floating decorative elements */}
      <div
        className="absolute top-20 right-12 sm:right-24 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-[0.05]"
        style={{
          border: `1px solid ${colors.sage}`,
          animation: 'floatSlow 7s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-8 left-8 sm:left-16 w-10 h-10 sm:w-16 sm:h-16 rounded-full opacity-[0.04]"
        style={{
          backgroundColor: colors.terracotta,
          animation: 'float 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-32 left-1/4 text-3xl sm:text-5xl opacity-[0.04] select-none pointer-events-none"
        style={{ animation: 'floatDeep 8s ease-in-out infinite' }}
      >
        🌿
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <Reveal>
          <span
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase block mb-4 sm:mb-6"
            style={{ fontFamily: fonts.sans, color: colors.sage }}
          >
            Curated for Your Walls
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl leading-[0.95] mb-5 sm:mb-8"
            style={{ fontFamily: fonts.serif, color: colors.charcoal }}
          >
            The <span className="italic" style={{ color: colors.sage }}>Shop</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.65 }}
          >
            Precision-crafted wall planters that stick to any wall. No drilling. Self-watering. Start with a kit or add to your collection.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Filter Tabs ───
function FilterTabs({
  active,
  onChange,
}: {
  active: CategoryFilter
  onChange: (cat: CategoryFilter) => void
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14 lg:mb-16">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className="px-4 sm:px-6 py-2.5 min-h-[40px] text-xs sm:text-sm tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer"
            style={{
              fontFamily: fonts.sans,
              backgroundColor: active === cat.key ? colors.sage : 'transparent',
              color: active === cat.key ? colors.linen : colors.espresso,
              border: `1px solid ${active === cat.key ? colors.sage : `${colors.warmStone}44`}`,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </Reveal>
  )
}

// ─── Bottom CTA ───
function BottomCTA() {
  const { addToCart } = useCart()
  const starterKit = products.find((p) => p.id === 'starter-kit')

  const handleAdd = () => {
    if (starterKit) addToCart(starterKit)
  }

  return (
    <section
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: colors.espresso }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(80px, 15vw, 280px)',
          color: colors.cream,
          opacity: 0.02,
          lineHeight: 0.9,
        }}
      >
        Shop
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <Reveal>
          <div className="flex items-center gap-4 justify-center mb-8 sm:mb-12">
            <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: `${colors.warmStone}33` }} />
            <svg width="8" height="8" viewBox="0 0 8 8" fill={colors.warmStone}>
              <circle cx="4" cy="4" r="3" />
            </svg>
            <div className="flex-1 max-w-[80px] h-px" style={{ backgroundColor: `${colors.warmStone}33` }} />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl leading-[1.1] mb-5 sm:mb-6"
            style={{ fontFamily: fonts.serif, color: colors.cream }}
          >
            Not sure where to start?
            <br />
            <span className="italic" style={{ color: colors.sage }}>
              Try the Starter Kit.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto"
            style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.8 }}
          >
            Two self-watering planters, a wooden dowel rail, and everything you need to
            mount your first wall garden. Our most popular product for good reason.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer active:scale-[0.97]"
              style={{
                fontFamily: fonts.sans,
                backgroundColor: colors.sage,
                color: colors.linen,
                border: 'none',
              }}
            >
              <span>Add Starter Kit</span>
              <span>&rarr;</span>
            </button>
            <Link
              to="/product/starter-kit"
              className="text-sm tracking-[0.1em] uppercase transition-all duration-300"
              style={{
                fontFamily: fonts.sans,
                color: colors.warmStone,
                opacity: 0.7,
                borderBottom: `1px solid ${colors.warmStone}44`,
                paddingBottom: '2px',
              }}
            >
              View Details
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.35}>
          <p
            className="mt-6 text-xs"
            style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.4 }}
          >
            {starterKit ? formatPrice(starterKit.price) : 'Rs. 2,999'} &middot; Free Shipping &middot; COD Available
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Main Shop Page ───
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all')

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div style={{ backgroundColor: colors.cream, overflowX: 'hidden' }}>
      <ShopHero />

      {/* Marquee */}
      <Marquee
        items={[
          'Self-Watering',
          'Wall-Mounted',
          'Precision-Crafted in India',
          'No Drilling Required',
          'Free Shipping',
          'COD Available',
        ]}
        speed={35}
        bg={colors.espresso}
        color={colors.cream}
      />

      {/* Product Grid */}
      <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.linen }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <FilterTabs active={activeCategory} onChange={setActiveCategory} />

          {/* Results count */}
          <Reveal>
            <p
              className="text-xs tracking-[0.1em] uppercase mb-8 sm:mb-10"
              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
            >
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </Reveal>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <Reveal>
              <div className="text-center py-20 sm:py-28">
                <p
                  className="text-4xl mb-4"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  🌱
                </p>
                <p
                  className="text-lg sm:text-xl mb-2"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  Nothing here yet
                </p>
                <p
                  className="text-sm"
                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                >
                  New products in this category are coming soon.
                </p>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <BottomCTA />
    </div>
  )
}
