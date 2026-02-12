import { useState, useCallback, useMemo } from 'react'
import Reveal, { useScrollY } from '../components/Reveal'
import { colors, fonts } from '../lib/theme'
import { faqs } from '../lib/data'
import { Link } from 'react-router-dom'

// ─── Derive unique categories from data ───
function useCategories() {
  return useMemo(() => {
    const cats = Array.from(new Set(faqs.map((f) => f.category).filter(Boolean))) as string[]
    return ['All', ...cats]
  }, [])
}

// ─── Hero Section ───
function FAQHero() {
  const scrollY = useScrollY()

  return (
    <section
      className="relative pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
      style={{ backgroundColor: colors.cream }}
    >
      {/* Parallax dot pattern */}
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
        className="absolute top-20 right-8 sm:right-20 w-16 h-16 sm:w-28 sm:h-28 rounded-full opacity-[0.05]"
        style={{
          border: `1px solid ${colors.sage}`,
          animation: 'floatSlow 7s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-10 left-6 sm:left-16 w-10 h-10 sm:w-14 sm:h-14 rounded-full opacity-[0.04]"
        style={{
          backgroundColor: colors.terracotta,
          animation: 'float 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-36 left-1/3 text-3xl sm:text-5xl opacity-[0.04] select-none pointer-events-none"
        style={{ animation: 'floatDeep 9s ease-in-out infinite' }}
      >
        ?
      </div>
      <div
        className="absolute bottom-16 right-1/4 w-6 h-6 sm:w-10 sm:h-10 rounded-full opacity-[0.03]"
        style={{
          border: `1px solid ${colors.warmStone}`,
          animation: 'floatSlow 6s ease-in-out infinite 1s',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <Reveal>
          <span
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase block mb-4 sm:mb-6"
            style={{ fontFamily: fonts.sans, color: colors.sage }}
          >
            Common Questions
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl leading-[0.95] mb-5 sm:mb-8"
            style={{ fontFamily: fonts.serif, color: colors.charcoal }}
          >
            Everything you{' '}
            <span className="italic" style={{ color: colors.sage }}>
              need to know
            </span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-xl"
            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.65 }}
          >
            From self-watering mechanics to shipping details, we have gathered
            answers to the questions our customers ask most. If you do not find
            what you are looking for, our team is always happy to help.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Category Filter Tabs ───
function CategoryTabs({
  categories,
  active,
  onChange,
}: {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}) {
  return (
    <Reveal>
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14 lg:mb-16 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className="px-4 sm:px-6 py-2.5 min-h-[40px] text-xs sm:text-sm tracking-[0.1em] uppercase transition-all duration-400 cursor-pointer"
            style={{
              fontFamily: fonts.sans,
              backgroundColor: active === cat ? colors.sage : 'transparent',
              color: active === cat ? colors.linen : colors.espresso,
              border: `1px solid ${active === cat ? colors.sage : `${colors.warmStone}44`}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </Reveal>
  )
}

// ─── FAQ Accordion Item ───
function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <Reveal delay={index * 0.04}>
      <div
        className="border-t py-5 sm:py-6 cursor-pointer"
        style={{ borderColor: `${colors.warmStone}33` }}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        aria-expanded={isOpen}
      >
        <div className="flex items-start justify-between gap-4">
          <h3
            className="text-base sm:text-lg lg:text-xl transition-colors duration-300 pr-2"
            style={{
              fontFamily: fonts.serif,
              color: isOpen ? colors.sage : colors.charcoal,
            }}
          >
            {question}
          </h3>
          <span
            className="text-xl sm:text-2xl flex-shrink-0 transition-transform duration-500 mt-0.5 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center select-none"
            style={{
              fontFamily: fonts.serif,
              color: colors.sage,
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            +
          </span>
        </div>
        <div
          className="overflow-hidden transition-all duration-500"
          style={{
            maxHeight: isOpen ? '500px' : '0',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <p
            className="pt-3 sm:pt-4 text-sm sm:text-base leading-relaxed max-w-2xl"
            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
          >
            {answer}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── FAQ Accordion Section ───
// Uses key={activeCategory} on the parent to reset openIndex on category change
function FAQAccordion({ activeCategory }: { activeCategory: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'All') return faqs
    return faqs.filter((f) => f.category === activeCategory)
  }, [activeCategory])

  const handleToggle = useCallback(
    (i: number) => {
      setOpenIndex((prev) => (prev === i ? null : i))
    },
    []
  )

  return (
    <div>
      {filteredFaqs.map((faq, i) => (
        <FAQItem
          key={`${faq.category}-${faq.question}`}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === i}
          onToggle={() => handleToggle(i)}
          index={i}
        />
      ))}
      {/* Bottom border */}
      <div className="border-t" style={{ borderColor: `${colors.warmStone}33` }} />

      {/* Empty state */}
      {filteredFaqs.length === 0 && (
        <Reveal>
          <div className="text-center py-16 sm:py-20">
            <p
              className="text-3xl mb-3"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              🌱
            </p>
            <p
              className="text-lg"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              No questions in this category yet
            </p>
          </div>
        </Reveal>
      )}
    </div>
  )
}

// ─── Still Have Questions CTA ───
function StillHaveQuestions() {
  const [hovered, setHovered] = useState<number | null>(null)

  const cards = [
    {
      label: 'Email Us',
      description: 'We typically respond within 24 hours on business days.',
      detail: 'hello@planterra.in',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.sage}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
        </svg>
      ),
      to: '/contact',
    },
    {
      label: 'Call Us',
      description: 'Monday to Saturday, 10 AM to 6 PM IST.',
      detail: '+91 80 4567 8900',
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.sage}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      to: '/contact',
    },
  ]

  return (
    <section
      className="py-16 sm:py-24 lg:py-32"
      style={{ backgroundColor: `${colors.sage}0a` }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              Need More Help?
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl leading-[1.1]"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Can&rsquo;t find what you&rsquo;re{' '}
              <span className="italic" style={{ color: colors.sage }}>
                looking for?
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.1} direction="up">
              <Link
                to={card.to}
                className="block p-6 sm:p-8 transition-all duration-500 h-full"
                style={{
                  backgroundColor: hovered === i ? colors.linen : colors.white,
                  border: `1px solid ${hovered === i ? `${colors.sage}44` : `${colors.warmStone}22`}`,
                  transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hovered === i
                    ? `0 16px 48px ${colors.espresso}10, 0 6px 20px ${colors.espresso}06`
                    : `0 2px 8px ${colors.espresso}04`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="mb-4 sm:mb-5">{card.icon}</div>
                <h3
                  className="text-lg sm:text-xl mb-2"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  {card.label}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                >
                  {card.description}
                </p>
                <p
                  className="text-sm font-medium"
                  style={{ fontFamily: fonts.sans, color: colors.sage }}
                >
                  {card.detail}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Shipping & Returns Quick Reference ───
function ShippingReturnsInfo() {
  const items = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: 'Free Shipping',
      description: 'On every order across India, no minimum required.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: '3-7 Business Days',
      description: 'Dispatched within 48 hours, delivered to your door.',
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      title: '1-Year Warranty',
      description: 'Every planter and dowel is covered against defects.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: colors.sand }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-10 sm:mb-14">
            <span
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              At a Glance
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl leading-[1.1]"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Shipping &{' '}
              <span className="italic" style={{ color: colors.sage }}>
                warranty
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} direction="up">
              <div className="flex gap-4 sm:gap-5">
                <div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${colors.sage}12` }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    className="text-base sm:text-lg mb-1"
                    style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Main FAQ Page ───
export default function FAQ() {
  const categories = useCategories()
  const [activeCategory, setActiveCategory] = useState('All')

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat)
  }, [])

  return (
    <div style={{ backgroundColor: colors.cream, overflowX: 'hidden' }}>
      <FAQHero />

      {/* FAQ Accordion Section */}
      <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.linen }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <CategoryTabs
            categories={categories}
            active={activeCategory}
            onChange={handleCategoryChange}
          />

          {/* Results count */}
          <Reveal>
            <p
              className="text-xs tracking-[0.1em] uppercase mb-6 sm:mb-8 text-center"
              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
            >
              {activeCategory === 'All'
                ? `${faqs.length} questions`
                : `${faqs.filter((f) => f.category === activeCategory).length} questions in ${activeCategory}`}
            </p>
          </Reveal>

          <FAQAccordion key={activeCategory} activeCategory={activeCategory} />
        </div>
      </section>

      <StillHaveQuestions />
      <ShippingReturnsInfo />
    </div>
  )
}
