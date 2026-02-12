import { useState, useEffect } from 'react'
import Reveal, { useInView, useScrollY } from '../components/Reveal'
import Marquee from '../components/Marquee'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { useCart } from '../context/CartContext'
import { colors, fonts } from '../lib/theme'
import { products, testimonials, formatPrice } from '../lib/data'
import { Link } from 'react-router-dom'

// ─── SVG Decorative Shapes (adapted from Design 4) ───

function ArchShape({ color = colors.sage, size = 80, style = {} }: { color?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none" style={style}>
      <path d="M0 112V50C0 22.386 17.909 0 40 0C62.091 0 80 22.386 80 50V112H60V50C60 33.431 51.046 20 40 20C28.954 20 20 33.431 20 50V112H0Z" fill={color} fillOpacity="0.12" />
    </svg>
  )
}

function DotGrid({ color = colors.warmStone, cols = 5, rows = 4, style = {} }: { color?: string; cols?: number; rows?: number; style?: React.CSSProperties }) {
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={c * 16 + 4} cy={r * 16 + 4} r="2.5" fill={color} fillOpacity="0.2" />)
    }
  }
  return (
    <svg width={cols * 16} height={rows * 16} style={style}>
      {dots}
    </svg>
  )
}

function TrianglePattern({ color = colors.sand, style = {} }: { color?: string; style?: React.CSSProperties }) {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" style={{ ...style, opacity: 0.25 }}>
      <polygon points="0,60 20,0 40,60" fill={color} />
      <polygon points="40,60 60,0 80,60" fill={color} />
      <polygon points="80,60 100,0 120,60" fill={color} />
    </svg>
  )
}

// ─── Editorial Rule Divider (from Design 1) ───

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

// ─── Floating Shape Wrapper (from Design 4) ───

function FloatingShape({ children, duration = 6, delay = 0, style = {} }: {
  children: React.ReactNode; duration?: number; delay?: number; style?: React.CSSProperties
}) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        animation: `floatDeep ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ═══════════════════════════════════════════════
// 1. HERO SECTION
// ═══════════════════════════════════════════════

function Hero() {
  const [loaded, setLoaded] = useState(false)
  const scrollY = useScrollY()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: colors.cream }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 8s steps(10) infinite',
        }}
      />

      {/* Parallax botanical dot pattern */}
      <div
        className="absolute top-0 right-0 w-3/4 sm:w-1/2 h-full opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, ${colors.sage} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Floating decorative shapes */}
      <FloatingShape style={{ top: '12%', left: '3%' }} duration={8} delay={0}>
        <ArchShape color={colors.sage} size={55} />
      </FloatingShape>
      <FloatingShape style={{ top: '22%', right: '6%' }} duration={9} delay={1.2}>
        <ArchShape color={colors.terracotta} size={40} style={{ opacity: 0.6 }} />
      </FloatingShape>
      <FloatingShape style={{ bottom: '25%', left: '8%' }} duration={7} delay={0.5}>
        <DotGrid color={colors.warmStone} cols={4} rows={3} />
      </FloatingShape>
      <FloatingShape style={{ top: '55%', right: '10%' }} duration={10} delay={2}>
        <TrianglePattern color={colors.sand} />
      </FloatingShape>

      {/* Big parallax arch background */}
      <div
        className="absolute pointer-events-none hidden lg:block"
        style={{
          right: '-3%',
          top: '8%',
          transform: `translateY(${scrollY * 0.12}px)`,
          opacity: 0.05,
        }}
      >
        <svg width="400" height="560" viewBox="0 0 500 700" fill="none">
          <path d="M0 700V312.5C0 139.91 111.93 0 250 0C388.07 0 500 139.91 500 312.5V700H375V312.5C375 209.07 319.03 125 250 125C180.97 125 125 209.07 125 312.5V700H0Z" fill={colors.sage} />
        </svg>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:items-end">
          {/* Text column */}
          <div className="lg:col-span-7 pt-24 sm:pt-28 lg:pt-40">
            <div
              className="mb-5 sm:mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
              }}
            >
              <span
                className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                No Drilling. Self-Watering. Wall-Mounted.
              </span>
            </div>

            <h1
              className="leading-[0.9] mb-6 sm:mb-8"
              style={{
                fontFamily: fonts.serif,
                color: colors.charcoal,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
              }}
            >
              <span className="block text-[clamp(2.5rem,10vw,6rem)] lg:text-8xl">Walls</span>
              <span
                className="block text-[clamp(2.5rem,10vw,6rem)] lg:text-8xl italic"
                style={{ color: colors.sage }}
              >
                that grow
              </span>
              <span className="block text-[clamp(2.5rem,10vw,6rem)] lg:text-8xl">with you.</span>
            </h1>

            <div
              className="max-w-md"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s',
              }}
            >
              <p
                className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
              >
                Wall planters that stick with double-sided tape, water themselves,
                and take zero floor space. Start with 2, add more anytime.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 px-7 py-4 min-h-[48px] text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.25em] relative overflow-hidden"
                  style={{
                    fontFamily: fonts.sans,
                    backgroundColor: colors.espresso,
                    color: colors.linen,
                  }}
                >
                  <span className="relative z-10">Get the Starter Kit</span>
                  <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
                  {/* Pulse ring behind CTA */}
                  <div
                    className="absolute inset-0"
                    style={{ animation: 'pulseScale 2.5s ease-in-out infinite', backgroundColor: colors.sage }}
                  />
                </Link>
              </div>
            </div>

            {/* Mini stats bar */}
            <div
              className="flex flex-wrap gap-6 sm:gap-8 mt-10 pt-8"
              style={{
                borderTop: `1px solid ${colors.warmStone}33`,
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.1s',
              }}
            >
              {[
                { val: '500+', label: 'Happy Homes' },
                { val: '4.8', label: 'Avg Rating' },
                { val: 'Zero', label: 'Drilling' },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="text-xl sm:text-2xl font-semibold"
                    style={{ fontFamily: fonts.serif, color: colors.sage }}
                  >
                    {s.val}
                  </div>
                  <div
                    className="text-[10px] sm:text-xs tracking-[0.1em] uppercase mt-0.5"
                    style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div
            className="mt-10 lg:mt-0 lg:col-span-5 relative"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s',
            }}
          >
            <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4', backgroundColor: colors.sand }}>
              <img
                src="/home-page-final.jpeg"
                alt="The Planterra System — Two white 3D-printed self-watering planters with trailing pothos and Boston fern on a wall-mounted wooden dowel"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <p
              className="mt-3 text-[10px] tracking-[0.2em] uppercase text-right"
              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
            >
              The Planterra System &mdash; Starter Kit
            </p>

            {/* Spinning badge */}
            <div
              className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: colors.sage,
                animation: 'spinSlow 14s linear infinite',
                boxShadow: `0 6px 20px ${colors.sage}44`,
              }}
            >
              <span
                className="text-[8px] sm:text-[9px] font-medium tracking-widest uppercase text-center leading-tight"
                style={{ fontFamily: fonts.sans, color: colors.linen }}
              >
                Made in<br />India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1.5s ease 1.5s' }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: fonts.sans, color: colors.warmStone }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: `linear-gradient(to bottom, ${colors.warmStone}, transparent)`,
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// 2. SOCIAL PROOF MARQUEE
// ═══════════════════════════════════════════════

function SocialProofStrip() {
  return (
    <Marquee
      items={[
        'Self-Watering',
        'Wall-Mounted',
        'Precision-Crafted in India',
        'No Drilling Required',
        'Self-Watering Drip Tray',
        'COD Available',
        '500+ Happy Homes',
        'Free Shipping',
      ]}
      speed={35}
      bg={colors.espresso}
      color={colors.cream}
    />
  )
}

// ═══════════════════════════════════════════════
// 3. STORY SECTION
// ═══════════════════════════════════════════════

function StorySection() {
  const scrollY = useScrollY()

  return (
    <section className="py-16 sm:py-24 lg:py-40 overflow-hidden" style={{ backgroundColor: colors.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <EditorialRule className="mb-12 sm:mb-16 lg:mb-24 max-w-lg mx-auto" />
        </Reveal>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center gap-10">
          {/* Image with parallax */}
          <div className="lg:col-span-5 lg:col-start-1">
            <Reveal direction="left" delay={0.1}>
              <div
                className="lg:-ml-8 relative"
                style={{ transform: `translateY(${scrollY * 0.03}px)` }}
              >
                <div className="w-full overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: colors.sand }}>
                  <img
                    src="/story.jpeg"
                    alt="Hands placing a pothos into a white 3D-printed Planterra planter on a warm stone surface"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Decorative dot grid overlay */}
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4">
                  <DotGrid color={colors.sage} cols={4} rows={4} />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 lg:col-start-7">
            <Reveal direction="right" delay={0.2}>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Our Story
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-5xl leading-[1.1] mb-6 sm:mb-8"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                Born from a love of plants{' '}
                <span className="italic" style={{ color: colors.sage }}>
                  and impatience
                </span>{' '}
                with watering.
              </h2>
              <div
                className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
              >
                <p>
                  We kept killing our plants. Not from neglect, exactly, but from
                  the chaos of daily life in a small Indian apartment. No balcony.
                  No window sills left. And watering? Always forgotten.
                </p>
                <p>
                  So we designed something better. A wall-mounted planter that
                  sticks with double-sided tape, waters itself with a built-in
                  drip tray, and grows with you. Precision-crafted in India, one
                  layer at a time.
                </p>
              </div>
              <div className="mt-6 sm:mt-8 w-12 h-px" style={{ backgroundColor: colors.sage }} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// 4. FEATURES SECTION
// ═══════════════════════════════════════════════

const featureData = [
  {
    number: '01',
    title: 'Self-Watering',
    subtitle: 'Fill it and forget it',
    description:
      'Each planter has a built-in 100ml drip tray with three water absorbers. A cotton ball at the base wicks moisture up to the roots. Add water to the tray and your plants stay happy for days.',
    icon: '💧',
    image:
      'Cross-section view of the planter showing the drip tray, water absorbers, and cotton ball wicking system. Clean white background, technical illustration feel.',
    realImage: '/self-watering.jpeg',
  },
  {
    number: '02',
    title: 'Wall-Mounted',
    subtitle: 'Zero drilling required',
    description:
      'The wooden dowel mounts to your wall with double-sided tape. No drill, no landlord, no problem. Peels off cleanly when you move. This is what makes Planterra perfect for renters.',
    icon: '🏠',
    image:
      'Two white planters on a wooden dowel in a minimal home office. Clean desk below with laptop and coffee. Warm afternoon light.',
    realImage: '/wall-hanging.jpeg',
  },
  {
    number: '03',
    title: 'Expandable',
    subtitle: 'Start with 2, add more anytime',
    description:
      'Start with 2 planters. Add more whenever the mood strikes. Each planter clips onto the dowel with a thumbscrew knob. Rearrange freely. Your wall garden grows with you.',
    icon: '🧩',
    image:
      'Flat-lay: Multiple white planters arranged around a wooden dowel. Overhead shot on linen background.',
    realImage: '/extendable.jpeg',
  },
]

function FeatureCard({ feature, index }: { feature: typeof featureData[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center gap-6">
      {/* Image */}
      <div
        className={`lg:col-span-6 ${
          isEven ? 'lg:col-start-1' : 'lg:col-start-7 lg:order-2'
        }`}
      >
        <Reveal direction={isEven ? 'left' : 'right'} delay={0.1}>
          {feature.realImage ? (
            <div className="w-full overflow-hidden" style={{ aspectRatio: '4/5', backgroundColor: isEven ? colors.sand : `${colors.sage}22` }}>
              <img
                src={feature.realImage}
                alt={feature.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ) : (
            <ImagePlaceholder
              emoji={feature.icon}
              description={feature.image}
              aspect="4/5"
              bg={isEven ? colors.sand : `${colors.sage}22`}
              className="w-full"
            />
          )}
        </Reveal>
      </div>

      {/* Text with interactive hover */}
      <div
        className={`lg:col-span-5 ${
          isEven ? 'lg:col-start-8' : 'lg:col-start-1 lg:order-1'
        }`}
      >
        <Reveal direction={isEven ? 'right' : 'left'} delay={0.25}>
          <div
            className="p-6 sm:p-8 lg:p-0 transition-all duration-500 cursor-default"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              backgroundColor: hovered ? `${colors.sage}0d` : 'transparent',
              borderRadius: hovered ? '12px' : '0',
            }}
          >
            <span
              className="text-5xl sm:text-6xl lg:text-7xl font-light block mb-2 sm:mb-4 transition-all duration-500"
              style={{
                fontFamily: fonts.serif,
                color: colors.warmStone,
                opacity: hovered ? 0.5 : 0.3,
                transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              {feature.number}
            </span>
            <h3
              className="text-2xl sm:text-3xl lg:text-4xl mb-2 transition-colors duration-500"
              style={{ fontFamily: fonts.serif, color: hovered ? colors.sage : colors.charcoal }}
            >
              {feature.title}
            </h3>
            <p
              className="text-xs sm:text-sm tracking-[0.1em] uppercase mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              {feature.subtitle}
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
            >
              {feature.description}
            </p>
            <div
              className="mt-6 sm:mt-8 h-px transition-all duration-500"
              style={{
                backgroundColor: colors.sage,
                width: hovered ? '64px' : '48px',
              }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12 sm:mb-20 lg:mb-32">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              Why Planterra
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Four reasons to <br />
              <span className="italic" style={{ color: colors.sage }}>
                rethink your walls.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-16 sm:space-y-24 lg:space-y-48">
          {featureData.map((f, i) => (
            <FeatureCard key={f.number} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// 5. FEATURE MARQUEE
// ═══════════════════════════════════════════════

function FeatureMarquee() {
  return (
    <Marquee
      items={[
        'Self-Watering Drip Tray',
        'No Shelf Space Needed',
        'Start Small, Grow Big',
        'No Drilling',
        'Made in India',
        'COD Available',
        'Rental-Friendly',
      ]}
      speed={40}
      bg={colors.sage}
      color={colors.cream}
    />
  )
}

// ═══════════════════════════════════════════════
// 6. HOW IT WORKS
// ═══════════════════════════════════════════════

const stepsData = [
  {
    step: 'I',
    num: 1,
    title: 'Stick the Tape',
    description:
      'Peel. Press. Done. The double-sided tape holds your dowel to any smooth wall. No drill, no landlord, no problem.',
  },
  {
    step: 'II',
    num: 2,
    title: 'Clip On Planters',
    description:
      'Slide the thumbscrew clip over the dowel. Tighten the knob. Your planter is locked in place.',
  },
  {
    step: 'III',
    num: 3,
    title: 'Plant & Fill',
    description:
      'Add soil, place your plant, then fill the drip tray with water. The three absorbers and cotton ball wick moisture up to the roots.',
  },
  {
    step: 'IV',
    num: 4,
    title: 'Expand Over Time',
    description:
      'Start with 2, get a longer dowel when ready, and add more planters. Your wall garden grows with you.',
  },
]

function StepCircle({ step, num: _num }: { step: string; num: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-6 sm:mb-8 flex items-center justify-center text-lg sm:text-xl relative z-10 cursor-default transition-transform duration-300"
      style={{
        fontFamily: fonts.serif,
        background: hovered
          ? `linear-gradient(135deg, ${colors.sage}, ${colors.sageDark})`
          : `linear-gradient(135deg, ${colors.terracotta}, ${colors.sienna})`,
        color: colors.linen,
        boxShadow: hovered
          ? `0 8px 25px ${colors.sage}44`
          : `0 8px 25px ${colors.terracotta}44`,
        transform: hovered ? 'scale(1.12)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {step}
    </div>
  )
}

function HowItWorksSection() {
  const scrollY = useScrollY()

  return (
    <section
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: colors.espresso }}
    >
      {/* Decorative circles with parallax */}
      <div
        className="absolute top-12 sm:top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full opacity-[0.04]"
        style={{
          border: `1px solid ${colors.cream}`,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      <div
        className="absolute bottom-12 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 rounded-full opacity-[0.03]"
        style={{
          border: `1px solid ${colors.cream}`,
          animation: 'spinSlow 60s linear infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center mb-12 sm:mb-20 lg:mb-28">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              Simple by Design
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: fonts.serif, color: colors.cream }}
            >
              Set up in minutes.
              <br />
              <span className="italic" style={{ color: colors.sage }}>
                Enjoy for years.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
            style={{ background: `linear-gradient(to right, ${colors.warmStone}33, ${colors.terracotta}44, ${colors.warmStone}33)` }}
          />

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 lg:gap-8">
            {stepsData.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.12} direction="tilt">
                <div className="text-center relative flex flex-col items-center">
                  <StepCircle step={s.step} num={s.num} />
                  <h3
                    className="text-xl sm:text-2xl mb-3 sm:mb-4"
                    style={{ fontFamily: fonts.serif, color: colors.cream }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs mx-auto"
                    style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.8 }}
                  >
                    {s.description}
                  </p>

                  {/* Mobile connecting line */}
                  {i < stepsData.length - 1 && (
                    <div
                      className="lg:hidden w-px h-8 mt-8"
                      style={{ backgroundColor: `${colors.warmStone}33` }}
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// 7. FEATURED PRODUCTS
// ═══════════════════════════════════════════════

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const { addToCart } = useCart()
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Reveal delay={index * 0.1} direction="up">
      <div
        className="group relative transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        }}
      >
        {/* Badge */}
        {product.badge && (
          <div
            className="absolute top-3 left-3 z-10 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase"
            style={{
              fontFamily: fonts.sans,
              backgroundColor: product.badge === 'Most Popular' ? colors.sage : product.badge === 'New' ? colors.terracotta : colors.espresso,
              color: colors.linen,
            }}
          >
            {product.badge}
          </div>
        )}

        {/* Image */}
        <Link to={`/product/${product.slug}`}>
          <div
            className="relative overflow-hidden transition-shadow duration-500"
            style={{
              boxShadow: hovered ? `0 20px 40px ${colors.espresso}15` : `0 2px 8px ${colors.espresso}08`,
            }}
          >
            {product.image ? (
              <div className="w-full" style={{ aspectRatio: '4/5', backgroundColor: product.imageBg }}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ) : (
              <ImagePlaceholder
                emoji={product.imageEmoji}
                description={product.name}
                aspect="4/5"
                bg={product.imageBg}
                className="w-full"
              />
            )}
          </div>
        </Link>

        {/* Info */}
        <div className="mt-4">
          <Link
            to={`/product/${product.slug}`}
            className="block transition-colors duration-300"
          >
            <h3
              className="text-base sm:text-lg mb-1"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              {product.name}
            </h3>
          </Link>
          <p
            className="text-xs sm:text-sm mb-3 line-clamp-1"
            style={{ fontFamily: fonts.sans, color: colors.warmStone }}
          >
            {product.shortDescription}
          </p>

          <div className="flex items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span
                className="text-lg sm:text-xl font-medium"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  className="text-xs line-through"
                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="px-4 py-2 min-h-[40px] text-xs tracking-[0.1em] uppercase transition-all duration-500 cursor-pointer active:scale-[0.96]"
              style={{
                fontFamily: fonts.sans,
                backgroundColor: added ? colors.sage : colors.espresso,
                color: colors.linen,
                border: 'none',
              }}
            >
              {added ? 'Added!' : 'Add to Cart'}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, si) => (
                <svg key={si} width="12" height="12" viewBox="0 0 24 24" fill={si < Math.floor(product.rating) ? colors.sage : `${colors.warmStone}44`}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span
              className="text-[10px]"
              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
            >
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function FeaturedProductsSection() {
  const featuredProducts = products.filter(p =>
    ['starter-kit', 'add-on-planter', 'extended-dowel'].includes(p.slug)
  )

  return (
    <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 lg:mb-20 gap-4">
            <div>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Shop
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                Featured{' '}
                <span className="italic" style={{ color: colors.sage }}>
                  collection.
                </span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:gap-3 group"
              style={{ fontFamily: fonts.sans, color: colors.espresso }}
            >
              <span>View All</span>
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// 8. TESTIMONIALS
// ═══════════════════════════════════════════════

function TestimonialCard({ testimonial, index, rotate }: {
  testimonial: typeof testimonials[0]; index: number; rotate: number
}) {
  const [hovered, setHovered] = useState(false)
  const { ref, isVisible } = useInView(0.1)

  return (
    <div
      ref={ref}
      className="min-w-[85vw] sm:min-w-[60vw] lg:min-w-0 snap-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between transition-all duration-700 cursor-default"
        style={{
          backgroundColor: colors.linen,
          border: `1px solid ${hovered ? `${colors.sage}44` : `${colors.warmStone}22`}`,
          transform: isVisible
            ? hovered
              ? 'rotate(0deg) translateY(-6px) scale(1.02)'
              : `rotate(${rotate}deg)`
            : `rotate(${rotate + 8}deg) scale(0.85) translateY(40px)`,
          opacity: isVisible ? 1 : 0,
          transitionDelay: `${index * 120}ms`,
          boxShadow: hovered ? `0 16px 40px ${colors.espresso}12` : `0 2px 10px ${colors.espresso}06`,
        }}
      >
        {/* Stars */}
        <div className="mb-4 sm:mb-6 flex gap-1">
          {[...Array(testimonial.rating)].map((_, si) => (
            <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={colors.sage}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>

        <p
          className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-1"
          style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.8 }}
        >
          &ldquo;{testimonial.text}&rdquo;
        </p>

        <div>
          <div className="w-8 h-px mb-3 sm:mb-4" style={{ backgroundColor: colors.sage }} />
          <p
            className="text-sm font-medium"
            style={{ fontFamily: fonts.sans, color: colors.charcoal }}
          >
            {testimonial.name}
          </p>
          <p
            className="text-xs mt-1"
            style={{ fontFamily: fonts.sans, color: colors.warmStone }}
          >
            {testimonial.location}
            {testimonial.detail && <> &middot; {testimonial.detail}</>}
          </p>
        </div>
      </div>
    </div>
  )
}

function TestimonialsSection() {
  const displayTestimonials = testimonials.slice(0, 3)
  const rotations = [-1.5, 1, -0.8]

  return (
    <section className="py-16 sm:py-24 lg:py-40 overflow-hidden" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 lg:mb-24 gap-4">
            <div>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Voices
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                What our community
                <br />
                <span className="italic" style={{ color: colors.sage }}>
                  has to say.
                </span>
              </h2>
            </div>
            <p
              className="text-sm"
              style={{ fontFamily: fonts.sans, color: colors.warmStone }}
            >
              500+ happy plant parents across India
            </p>
          </div>
        </Reveal>

        {/* Mobile: horizontal scroll. Desktop: grid */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 lg:pb-0 lg:grid lg:grid-cols-3 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {displayTestimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              index={i}
              rotate={rotations[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// 9. FINAL CTA
// ═══════════════════════════════════════════════

function FinalCTA() {
  const scrollY = useScrollY()

  return (
    <section
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: colors.espresso }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          animation: 'grain 8s steps(10) infinite',
        }}
      />

      {/* Floating decorative shapes */}
      <FloatingShape style={{ top: '10%', left: '5%' }} duration={7}>
        <ArchShape color={colors.cream} size={50} style={{ opacity: 0.5 }} />
      </FloatingShape>
      <FloatingShape style={{ top: '20%', right: '8%' }} duration={9} delay={1}>
        <DotGrid color={colors.cream} cols={4} rows={4} style={{ opacity: 0.4 }} />
      </FloatingShape>
      <FloatingShape style={{ bottom: '15%', left: '12%' }} duration={6} delay={2}>
        <TrianglePattern color={colors.warmStone} style={{ opacity: 0.3 }} />
      </FloatingShape>
      <FloatingShape style={{ bottom: '20%', right: '6%' }} duration={8} delay={0.5}>
        <ArchShape color={colors.sage} size={40} style={{ opacity: 0.4 }} />
      </FloatingShape>

      {/* Parallax background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(100px, 18vw, 350px)',
          color: colors.cream,
          opacity: 0.02,
          lineHeight: 0.9,
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      >
        Grow
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <Reveal>
          <EditorialRule className="max-w-[80px] mx-auto mb-8 sm:mb-12" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl lg:text-7xl leading-[1.05] mb-6 sm:mb-8"
            style={{ fontFamily: fonts.serif, color: colors.cream }}
          >
            Your walls are waiting
            <br />
            <span className="italic" style={{ color: colors.sage }}>
              to come alive.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto"
            style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.8 }}
          >
            Join hundreds of plant lovers across India who have transformed their
            homes with Planterra. Start with a Starter Kit and grow from there.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center gap-3 px-8 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 active:scale-[0.97] relative overflow-hidden"
              style={{ fontFamily: fonts.sans, backgroundColor: colors.sage, color: colors.linen }}
            >
              <span className="relative z-10">Get the Starter Kit — Rs. 2,999</span>
              <span className="relative z-10 inline-block transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
              <div
                className="absolute inset-0"
                style={{ animation: 'pulseScale 2.5s ease-in-out infinite', backgroundColor: colors.sageDark }}
              />
            </Link>
            <span
              className="text-sm"
              style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.6 }}
            >
              Free Shipping &middot; COD Available
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10">
            {['Free Shipping', 'COD Available', 'Secure Checkout'].map((t) => (
              <span
                key={t}
                className="flex items-center gap-2 text-sm"
                style={{ fontFamily: fonts.sans, color: `${colors.warmStone}aa` }}
              >
                <span style={{ color: colors.sage }}>&#10003;</span>
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════
// HOME PAGE — DEFAULT EXPORT
// ═══════════════════════════════════════════════

export default function Home() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Hero />
      <SocialProofStrip />
      <StorySection />
      <FeaturesSection />
      <FeatureMarquee />
      <HowItWorksSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  )
}
