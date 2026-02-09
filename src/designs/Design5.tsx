import { useState, useEffect, useRef, type ReactNode } from 'react'

// ──────────────────────────────────────────────
// DESIGN 5: SOFT CLOUD GARDEN
// Dreamy wellness-botanical aesthetic. Rounded,
// airy, Instagram-worthy. Pink-coral + sage.
// Mobile-first, animated, production-grade.
// ──────────────────────────────────────────────

// ── Google Fonts ──────────────────────────────
const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap'
if (!document.querySelector(`link[href="${fontLink.href}"]`)) {
  document.head.appendChild(fontLink)
}

// ── Palette ───────────────────────────────────
const C = {
  bg: '#fefefe',
  bgSage: '#eef3eb',
  bgBlush: '#fdf5f3',
  coral: '#d4897a',
  coralLight: '#e8a090',
  coralPale: '#f5ddd7',
  olive: '#7a8c6e',
  sage: '#98ab8b',
  sagePale: '#dce6d6',
  charcoal: '#3a3632',
  charcoalLight: '#5a5550',
  cream: '#faf8f5',
  white: '#ffffff',
  frost: 'rgba(255,255,255,0.72)',
}

const ff = {
  sans: "'Plus Jakarta Sans', sans-serif",
  serif: "'Instrument Serif', serif",
}

// ── Hooks ─────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return y
}

// ── Keyframes (injected once) ─────────────────
const styleId = 'design5-keyframes'
if (!document.getElementById(styleId)) {
  const s = document.createElement('style')
  s.id = styleId
  s.textContent = `
    @keyframes d5float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-12px) rotate(1deg); }
      66% { transform: translateY(6px) rotate(-1deg); }
    }
    @keyframes d5floatSlow {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(15px, -20px) scale(1.05); }
    }
    @keyframes d5marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes d5fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes d5wave {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes d5bounceGentle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    .d5-blob-morph {
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      animation: d5floatSlow 8s ease-in-out infinite;
    }
    .d5-blob-morph-2 {
      border-radius: 40% 60% 70% 30% / 40% 70% 30% 60%;
      animation: d5floatSlow 10s ease-in-out infinite reverse;
    }
    .d5-cta-bounce {
      animation: d5bounceGentle 3s ease-in-out infinite;
    }
  `
  document.head.appendChild(s)
}

// ── Reveal wrapper ────────────────────────────
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Blob Shape ────────────────────────────────
function Blob({ color, size, top, left, right, bottom, className = '' }: {
  color: string; size: number; top?: string; left?: string; right?: string; bottom?: string; className?: string
}) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size, height: size,
        background: color,
        top, left, right, bottom,
        filter: 'blur(60px)',
        opacity: 0.4,
      }}
    />
  )
}

// ── Marquee ───────────────────────────────────
function Marquee({ children, speed = 40 }: { children: ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{ animation: `d5marquee ${speed}s linear infinite` }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

// ── Wave Divider ──────────────────────────────
function WaveDivider({ fill = C.bgSage, flip = false }: { fill?: string; flip?: boolean }) {
  return (
    <div style={{ transform: flip ? 'rotate(180deg)' : undefined, marginTop: flip ? -1 : 0, marginBottom: flip ? 0 : -1 }}>
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block" preserveAspectRatio="none" style={{ height: 60 }}>
        <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill={fill} />
      </svg>
    </div>
  )
}

// ── Feature Icon ──────────────────────────────
function FeatureIcon({ emoji }: { emoji: string }) {
  return (
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
      style={{ background: C.coralPale }}
    >
      {emoji}
    </div>
  )
}

// ── FAQ Item ──────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="cursor-pointer"
      style={{ borderBottom: `1px solid ${C.sagePale}` }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5">
        <h3
          className="text-base sm:text-lg font-semibold pr-4"
          style={{ fontFamily: ff.sans, color: open ? C.coral : C.charcoal, transition: 'color 0.3s' }}
        >
          {q}
        </h3>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-lg font-medium"
          style={{
            background: open ? C.coral : C.sagePale,
            color: open ? C.white : C.olive,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          +
        </div>
      </div>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: open ? '300px' : '0',
          opacity: open ? 1 : 0,
          transition: 'max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease',
        }}
      >
        <p
          className="pb-5 text-sm sm:text-base leading-relaxed"
          style={{ fontFamily: ff.sans, color: C.charcoalLight }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

// ── Testimonial Card ──────────────────────────
function TestimonialCard({ quote, name, location, delay }: {
  quote: string; name: string; location: string; delay: number
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 sm:p-8"
      style={{
        background: C.white,
        boxShadow: '0 4px 32px rgba(58,54,50,0.06)',
        border: `1px solid ${C.sagePale}`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-base" style={{ color: C.coral }}>&#9733;</span>
        ))}
      </div>
      <p
        className="text-sm sm:text-base leading-relaxed mb-6"
        style={{ fontFamily: ff.sans, color: C.charcoalLight, fontStyle: 'italic' }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: C.coralPale, color: C.coral, fontFamily: ff.sans }}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ fontFamily: ff.sans, color: C.charcoal }}>{name}</p>
          <p className="text-xs" style={{ fontFamily: ff.sans, color: C.sage }}>{location}</p>
        </div>
      </div>
    </div>
  )
}

// ── Feature Card (extracted to avoid hook in loop) ──
function FeatureCard({ emoji, title, desc, index }: {
  emoji: string; title: string; desc: string; index: number
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="rounded-3xl p-6 sm:p-8 cursor-default"
      style={{
        background: C.white,
        border: `1px solid ${C.sagePale}`,
        boxShadow: '0 2px 16px rgba(58,54,50,0.04)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.97)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      onMouseEnter={e => {
        const t = e.currentTarget
        t.style.boxShadow = '0 12px 40px rgba(58,54,50,0.08)'
        t.style.borderColor = C.coralPale
      }}
      onMouseLeave={e => {
        const t = e.currentTarget
        t.style.boxShadow = '0 2px 16px rgba(58,54,50,0.04)'
        t.style.borderColor = C.sagePale
      }}
    >
      <FeatureIcon emoji={emoji} />
      <h3
        className="text-lg font-semibold mb-2"
        style={{ fontFamily: ff.sans, color: C.charcoal }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ fontFamily: ff.sans, color: C.charcoalLight }}
      >
        {desc}
      </p>
    </div>
  )
}

// ── Step Card ─────────────────────────────────
function StepCard({ num, title, desc, delay }: {
  num: number; title: string; desc: string; delay: number
}) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold mb-4"
        style={{
          background: `linear-gradient(135deg, ${C.coral}, ${C.coralLight})`,
          color: C.white,
          fontFamily: ff.serif,
          boxShadow: `0 8px 24px ${C.coral}33`,
        }}
      >
        {num}
      </div>
      <h4
        className="text-lg sm:text-xl font-semibold mb-2"
        style={{ fontFamily: ff.sans, color: C.charcoal }}
      >
        {title}
      </h4>
      <p
        className="text-sm sm:text-base max-w-[260px] leading-relaxed"
        style={{ fontFamily: ff.sans, color: C.charcoalLight }}
      >
        {desc}
      </p>
    </div>
  )
}

// ══════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════
export default function Design5() {
  const scrollY = useScrollY()
  const [mobileNav, setMobileNav] = useState(false)
  const navScrolled = scrollY > 60

  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setMobileNav(false) }
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileNav ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileNav])

  const features = [
    { emoji: '\u{1F4A7}', title: 'Self-Watering', desc: 'Built-in reservoir keeps plants hydrated for up to 2 weeks. No daily watering needed.' },
    { emoji: '\u{1F9E9}', title: 'Modular Design', desc: 'Snap-fit system lets you expand your wall garden one planter at a time.' },
    { emoji: '\u{1F3ED}', title: '3D Printed', desc: 'Precision-crafted with plant-safe PLA. Lightweight, durable, and sustainable.' },
    { emoji: '\u{1FAB4}', title: 'Any Plant', desc: 'Designed for herbs, succulents, trailing vines, and small flowering plants.' },
    { emoji: '\u{1F3A8}', title: 'Minimal Look', desc: 'Clean, modern aesthetic that blends with any interior style.' },
    { emoji: '\u{1F527}', title: 'Easy Install', desc: 'Just two screws per module. No drilling expertise required.' },
  ]

  const steps = [
    { title: 'Mount It', desc: 'Fix the base bracket to your wall with the included hardware.' },
    { title: 'Snap & Plant', desc: 'Click in a planter module and add your favourite plant and soil.' },
    { title: 'Fill Water', desc: 'Pour water into the reservoir. The wick does the rest.' },
    { title: 'Grow & Expand', desc: 'Add more modules anytime to create your dream wall garden.' },
  ]

  const testimonials = [
    { name: 'Priya S.', location: 'Mumbai', quote: 'My balcony wall is now a living work of art. The self-watering feature is genuinely life-changing for someone who forgets to water.' },
    { name: 'Arjun M.', location: 'Bangalore', quote: 'I started with two modules and now have twelve. The snap-fit system is addictive. My living room feels like a greenhouse.' },
    { name: 'Sneha R.', location: 'Delhi', quote: 'Beautiful design that actually works. My herbs stay healthy and I love that it is 3D printed and eco-friendly.' },
    { name: 'Kiran D.', location: 'Pune', quote: 'Bought this for my mother and she absolutely loves it. The modular concept means it grows with your confidence in gardening.' },
  ]

  const faqs = [
    { q: 'What plants work best with Planterra?', a: 'Herbs like basil and mint, succulents, pothos, money plants, and small flowering plants all thrive. We include a plant guide with every order.' },
    { q: 'How long does the self-watering reservoir last?', a: 'Depending on the plant and climate, the reservoir can keep your plants watered for 7 to 14 days. A small indicator shows the water level.' },
    { q: 'Is the 3D-printed plastic safe for plants?', a: 'Absolutely. We use food-safe PLA filament that is non-toxic, biodegradable, and completely safe for edible herbs and ornamental plants.' },
    { q: 'How do I mount it on my wall?', a: 'Each module comes with a wall bracket, two screws, and wall plugs. Installation takes under 5 minutes with a basic screwdriver. No power tools needed.' },
    { q: 'Can I use this outdoors?', a: 'Planterra is designed for indoor and covered outdoor use like balconies and verandahs. Direct rain and harsh sun exposure are not recommended.' },
    { q: 'Do you ship all over India?', a: 'Yes! We ship to all pin codes across India. Delivery typically takes 4-7 business days. Free shipping on orders of 2 or more modules.' },
    { q: 'What if a module gets damaged?', a: 'We offer a 6-month warranty on manufacturing defects. Being 3D printed, individual parts can also be replaced affordably.' },
  ]

  const trustBadges = [
    '500+ Happy Homes', 'Made in India', 'Eco-Friendly PLA', 'Easy Returns', '4.8 \u2605 Rating', 'Free Shipping 2+',
    '500+ Happy Homes', 'Made in India', 'Eco-Friendly PLA', 'Easy Returns', '4.8 \u2605 Rating', 'Free Shipping 2+',
  ]

  const navLinks = ['Features', 'How It Works', 'Reviews', 'Pricing', 'FAQ']

  return (
    <div style={{ fontFamily: ff.sans, color: C.charcoal, background: C.bg, overflowX: 'hidden' }}>

      {/* ── NAV ──────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: navScrolled ? '8px 16px' : '12px 16px',
          transition: 'padding 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div
          className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6"
          style={{
            background: navScrolled ? C.frost : 'transparent',
            backdropFilter: navScrolled ? 'blur(20px) saturate(1.5)' : 'none',
            WebkitBackdropFilter: navScrolled ? 'blur(20px) saturate(1.5)' : 'none',
            borderRadius: navScrolled ? 9999 : 0,
            boxShadow: navScrolled ? '0 2px 24px rgba(58,54,50,0.08)' : 'none',
            padding: navScrolled ? '10px 24px' : '8px 0',
            border: navScrolled ? '1px solid rgba(152,171,139,0.2)' : '1px solid transparent',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <a
            href="#"
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ fontFamily: ff.serif, color: C.charcoal, textDecoration: 'none' }}
          >
            Planterra
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium"
                style={{
                  color: C.charcoalLight,
                  fontFamily: ff.sans,
                  textDecoration: 'none',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.6')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {l}
              </a>
            ))}
            <a
              href="#pricing"
              className="text-sm font-semibold px-6 py-2.5 rounded-full"
              style={{
                background: C.coral,
                color: C.white,
                boxShadow: `0 4px 16px ${C.coral}33`,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 6px 24px ${C.coral}55`
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 4px 16px ${C.coral}33`
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Order Now
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-full border-0"
            style={{
              background: mobileNav ? C.coralPale : 'transparent',
              cursor: 'pointer',
              transition: 'background 0.3s',
            }}
            onClick={() => setMobileNav(!mobileNav)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 rounded-full"
              style={{
                background: C.charcoal,
                transform: mobileNav ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full"
              style={{
                background: C.charcoal,
                opacity: mobileNav ? 0 : 1,
                transition: 'all 0.3s ease',
              }}
            />
            <span
              className="block w-5 h-0.5 rounded-full"
              style={{
                background: C.charcoal,
                transform: mobileNav ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none',
                transition: 'all 0.3s ease',
              }}
            />
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className="md:hidden fixed inset-0 top-0 flex flex-col items-center justify-center"
          style={{
            opacity: mobileNav ? 1 : 0,
            pointerEvents: mobileNav ? 'auto' : 'none',
            background: `${C.bg}f5`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            transition: 'opacity 0.4s ease',
            zIndex: -1,
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMobileNav(false)}
                className="text-2xl font-semibold"
                style={{
                  fontFamily: ff.serif,
                  color: C.charcoal,
                  textDecoration: 'none',
                  opacity: mobileNav ? 1 : 0,
                  transform: mobileNav ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                }}
              >
                {l}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setMobileNav(false)}
              className="mt-4 px-8 py-3.5 rounded-full text-lg font-semibold"
              style={{
                background: C.coral,
                color: C.white,
                textDecoration: 'none',
                opacity: mobileNav ? 1 : 0,
                transform: mobileNav ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.5s ease 400ms, transform 0.5s ease 400ms',
              }}
            >
              Order Now &mdash; &#8377;2,999
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgSage} 100%)` }}
      >
        {/* Floating blobs */}
        <Blob color={C.coralPale} size={320} top="-5%" right="-8%" className="d5-blob-morph" />
        <Blob color={C.sagePale} size={400} bottom="5%" left="-10%" className="d5-blob-morph-2" />
        <Blob color={C.coralPale} size={180} top="40%" left="60%" className="d5-blob-morph" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 pt-28 pb-20 sm:pt-32 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-6"
                style={{
                  background: C.coralPale,
                  color: C.coral,
                  fontFamily: ff.sans,
                  animation: 'd5fadeUp 0.8s ease-out',
                }}
              >
                <span style={{ animation: 'd5wave 2s ease-in-out infinite', display: 'inline-block' }}>{'\u{1F331}'}</span>
                Now shipping across India
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] font-normal mb-6"
                style={{
                  fontFamily: ff.serif,
                  color: C.charcoal,
                  animation: 'd5fadeUp 0.8s ease-out 0.1s both',
                }}
              >
                Your walls
                <br />
                deserve to
                <br />
                <span style={{ color: C.coral, fontStyle: 'italic' }}>breathe</span>
              </h1>

              <p
                className="text-base sm:text-lg leading-relaxed mb-8 max-w-md"
                style={{
                  fontFamily: ff.sans,
                  color: C.charcoalLight,
                  fontWeight: 300,
                  animation: 'd5fadeUp 0.8s ease-out 0.2s both',
                }}
              >
                Modular, self-watering wall planters &mdash; 3D printed with love in India.
                Turn any wall into a living garden in minutes.
              </p>

              <div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                style={{ animation: 'd5fadeUp 0.8s ease-out 0.35s both' }}
              >
                <a
                  href="#pricing"
                  className="d5-cta-bounce inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold"
                  style={{
                    background: C.coral,
                    color: C.white,
                    boxShadow: `0 8px 32px ${C.coral}40`,
                    fontFamily: ff.sans,
                    textDecoration: 'none',
                    transition: 'box-shadow 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    const t = e.currentTarget
                    t.style.boxShadow = `0 12px 40px ${C.coral}55`
                    t.style.transform = 'translateY(-2px)'
                    t.style.animation = 'none'
                  }}
                  onMouseLeave={e => {
                    const t = e.currentTarget
                    t.style.boxShadow = `0 8px 32px ${C.coral}40`
                    t.style.transform = 'translateY(0)'
                    t.style.animation = 'd5bounceGentle 3s ease-in-out infinite'
                  }}
                >
                  Start Growing
                  <span className="text-lg">{'\u2192'}</span>
                </a>
                <span
                  className="text-sm font-medium"
                  style={{ color: C.sage, fontFamily: ff.sans }}
                >
                  From &#8377;2,999 &bull; Free shipping on 2+
                </span>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div
              className="relative"
              style={{
                animation: 'd5fadeUp 1s ease-out 0.3s both',
              }}
            >
              <div
                style={{ transform: `translateY(${scrollY * -0.04}px)` }}
              >
                <div
                  className="rounded-[2rem] sm:rounded-[2.5rem] aspect-[4/5] sm:aspect-square flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(160deg, ${C.sagePale}, ${C.coralPale})`,
                    boxShadow: '0 24px 64px rgba(58,54,50,0.08)',
                  }}
                >
                  <div className="text-center p-8">
                    <div className="text-6xl sm:text-7xl mb-4" style={{ animation: 'd5float 6s ease-in-out infinite' }}>{'\u{1F33F}'}</div>
                    <p className="text-sm font-medium" style={{ color: C.olive, fontFamily: ff.sans }}>Product Photo</p>
                    <p className="text-xs mt-1" style={{ color: C.sage, fontFamily: ff.sans }}>800 &times; 800px</p>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 px-5 py-3 rounded-2xl"
                style={{
                  background: C.white,
                  boxShadow: '0 8px 32px rgba(58,54,50,0.1)',
                  animation: 'd5float 5s ease-in-out infinite 1s',
                }}
              >
                <p className="text-xs font-medium" style={{ color: C.sage, fontFamily: ff.sans }}>Self-watering</p>
                <p className="text-lg font-bold" style={{ color: C.charcoal, fontFamily: ff.serif }}>Up to 14 days</p>
              </div>

              {/* Floating badge right */}
              <div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 px-4 py-2.5 rounded-2xl"
                style={{
                  background: C.white,
                  boxShadow: '0 8px 32px rgba(58,54,50,0.1)',
                  animation: 'd5float 4s ease-in-out infinite 0.5s',
                }}
              >
                <p className="text-2xl font-bold" style={{ fontFamily: ff.serif, color: C.coral }}>
                  4.8<span className="text-sm ml-1">{'\u2605'}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider fill={C.bg} />
        </div>
      </section>

      {/* ── TRUST STRIP (Marquee) ────────────── */}
      <section className="py-6 sm:py-8" style={{ background: C.bg }}>
        <Marquee speed={35}>
          {trustBadges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-6 sm:mx-8 text-xs sm:text-sm font-medium whitespace-nowrap"
              style={{ color: C.olive, fontFamily: ff.sans }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: C.coralLight }}
              />
              {badge}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ── FEATURES ─────────────────────────── */}
      <section id="features" className="py-16 sm:py-24 relative" style={{ background: C.bg }}>
        <Blob color={C.sagePale} size={300} top="10%" right="-5%" className="d5-blob-morph" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                style={{ background: C.sagePale, color: C.olive, fontFamily: ff.sans }}
              >
                Why Planterra
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal"
                style={{ fontFamily: ff.serif, color: C.charcoal }}
              >
                Designed for <span style={{ color: C.coral, fontStyle: 'italic' }}>real life</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} emoji={f.emoji} title={f.title} desc={f.desc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ─────────────────── */}
      <WaveDivider fill={C.bgBlush} />
      <section className="py-16 sm:py-24 relative" style={{ background: C.bgBlush }}>
        <Blob color={C.coralPale} size={260} bottom="10%" left="-8%" className="d5-blob-morph-2" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <Reveal>
              <div
                className="rounded-[2rem] aspect-[4/3] flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${C.coralPale}, ${C.sagePale})`,
                  boxShadow: '0 20px 56px rgba(58,54,50,0.07)',
                }}
              >
                <div className="text-center p-8">
                  <div className="text-5xl sm:text-6xl mb-3" style={{ animation: 'd5float 7s ease-in-out infinite' }}>{'\u{1FAB4}'}</div>
                  <p className="text-sm font-medium" style={{ color: C.olive, fontFamily: ff.sans }}>Lifestyle Image</p>
                  <p className="text-xs mt-1" style={{ color: C.sage, fontFamily: ff.sans }}>Wall-mounted planters in a living room setting</p>
                </div>
              </div>
            </Reveal>

            {/* Copy */}
            <div>
              <Reveal>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                  style={{ background: C.coralPale, color: C.coral, fontFamily: ff.sans }}
                >
                  The Product
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-6"
                  style={{ fontFamily: ff.serif, color: C.charcoal }}
                >
                  Built to nurture,
                  <br />
                  designed to <span style={{ color: C.coral, fontStyle: 'italic' }}>delight</span>
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ fontFamily: ff.sans, color: C.charcoalLight, fontWeight: 300 }}
                >
                  Every Planterra module is 3D-printed in-house using plant-safe, biodegradable PLA.
                  The integrated reservoir uses a simple cotton wick to deliver water directly to the roots,
                  keeping your greens happy while you get on with life.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3">
                  {['Plant-safe PLA', 'Wick watering', 'Tool-free assembly', 'Modular'].map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium"
                      style={{
                        background: C.white,
                        color: C.olive,
                        border: `1px solid ${C.sagePale}`,
                        fontFamily: ff.sans,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <WaveDivider fill={C.bgBlush} flip />

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section id="how-it-works" className="py-16 sm:py-24" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-center mb-14 sm:mb-20">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                style={{ background: C.sagePale, color: C.olive, fontFamily: ff.sans }}
              >
                4 Simple Steps
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal"
                style={{ fontFamily: ff.serif, color: C.charcoal }}
              >
                From box to <span style={{ color: C.coral, fontStyle: 'italic' }}>bloom</span>
              </h2>
            </div>
          </Reveal>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${C.sagePale}, ${C.coralPale}, ${C.sagePale}, transparent)` }}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 relative z-10">
              {steps.map((s, i) => (
                <StepCard key={i} num={i + 1} title={s.title} desc={s.desc} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIFESTYLE / BENEFITS ─────────────── */}
      <WaveDivider fill={C.bgSage} />
      <section className="py-16 sm:py-24 relative" style={{ background: C.bgSage }}>
        <Blob color={C.white} size={300} top="-5%" right="10%" className="d5-blob-morph" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Copy */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                  style={{ background: `${C.white}cc`, color: C.olive, fontFamily: ff.sans }}
                >
                  Why Wall Planters
                </span>
              </Reveal>
              <Reveal delay={80}>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-6"
                  style={{ fontFamily: ff.serif, color: C.charcoal }}
                >
                  Small spaces,
                  <br />
                  <span style={{ color: C.coral, fontStyle: 'italic' }}>big</span> gardens
                </h2>
              </Reveal>

              {[
                { title: 'No floor space needed', desc: 'Perfect for apartments, balconies, and compact kitchens where every square foot counts.' },
                { title: 'Better air quality', desc: 'Wall-mounted plants at eye level actively purify the air right where you breathe.' },
                { title: 'Biophilic design', desc: 'Studies show greenery on walls reduces stress, boosts mood, and increases productivity.' },
              ].map((b, i) => (
                <Reveal key={i} delay={150 + i * 100}>
                  <div className="flex gap-4 mb-5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${C.white}cc` }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ background: C.coral }} />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold mb-1" style={{ fontFamily: ff.sans, color: C.charcoal }}>
                        {b.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: ff.sans, color: C.charcoalLight }}>
                        {b.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Image */}
            <Reveal className="order-1 lg:order-2">
              <div
                className="rounded-[2rem] aspect-[3/4] sm:aspect-square flex items-center justify-center"
                style={{
                  background: `linear-gradient(145deg, ${C.white}ee, ${C.coralPale}88)`,
                  boxShadow: '0 20px 56px rgba(58,54,50,0.06)',
                }}
              >
                <div className="text-center p-8">
                  <div className="text-6xl mb-3" style={{ animation: 'd5float 6s ease-in-out infinite 0.5s' }}>{'\u{1F3E1}'}</div>
                  <p className="text-sm font-medium" style={{ color: C.olive, fontFamily: ff.sans }}>Lifestyle Image</p>
                  <p className="text-xs mt-1" style={{ color: C.sage, fontFamily: ff.sans }}>
                    Modern apartment with wall garden
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <WaveDivider fill={C.bgSage} flip />

      {/* ── TESTIMONIALS ─────────────────────── */}
      <section id="reviews" className="py-16 sm:py-24" style={{ background: C.bg }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-center mb-12 sm:mb-16">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                style={{ background: C.coralPale, color: C.coral, fontFamily: ff.sans }}
              >
                Real Reviews
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal"
                style={{ fontFamily: ff.serif, color: C.charcoal }}
              >
                Loved by <span style={{ color: C.coral, fontStyle: 'italic' }}>plant parents</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────── */}
      <WaveDivider fill={C.bgBlush} />
      <section id="pricing" className="py-16 sm:py-24 relative" style={{ background: C.bgBlush }}>
        <Blob color={C.coralPale} size={240} top="20%" right="-5%" className="d5-blob-morph" />
        <Blob color={C.sagePale} size={200} bottom="15%" left="-5%" className="d5-blob-morph-2" />

        <div className="max-w-xl mx-auto px-5 sm:px-8 relative z-10">
          <Reveal>
            <div
              className="rounded-[2rem] p-8 sm:p-12 text-center"
              style={{
                background: C.white,
                boxShadow: '0 12px 48px rgba(58,54,50,0.08)',
                border: `1px solid ${C.sagePale}`,
              }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-6"
                style={{ background: C.coralPale, color: C.coral, fontFamily: ff.sans }}
              >
                Single Module
              </span>

              <div className="mb-2">
                <span
                  className="text-5xl sm:text-6xl font-normal"
                  style={{ fontFamily: ff.serif, color: C.charcoal }}
                >
                  &#8377;2,999
                </span>
              </div>
              <p
                className="text-sm mb-8"
                style={{ color: C.sage, fontFamily: ff.sans }}
              >
                per module &bull; free shipping on 2+
              </p>

              <div className="space-y-3 mb-10 text-left max-w-xs mx-auto">
                {[
                  '1 self-watering planter module',
                  'Wall bracket + mounting hardware',
                  'Cotton wick (2 included)',
                  'Plant care guide',
                  'Soil not included',
                  '6-month warranty',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs"
                      style={{ background: C.sagePale, color: C.olive }}
                    >
                      {'\u2713'}
                    </div>
                    <span className="text-sm" style={{ fontFamily: ff.sans, color: C.charcoalLight }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a
                href="#"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-10 py-4 rounded-full text-base font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${C.coral}, ${C.coralLight})`,
                  color: C.white,
                  boxShadow: `0 8px 32px ${C.coral}33`,
                  fontFamily: ff.sans,
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 12px 40px ${C.coral}55`
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 8px 32px ${C.coral}33`
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Order Now
                <span className="text-lg">{'\u2192'}</span>
              </a>

              <p className="text-xs mt-4" style={{ color: C.sage, fontFamily: ff.sans }}>
                Ships in 4-7 business days &bull; Easy returns
              </p>
            </div>
          </Reveal>

          {/* Multi-pack note */}
          <Reveal delay={200}>
            <div
              className="mt-6 rounded-2xl p-5 sm:p-6 text-center"
              style={{
                background: `${C.white}cc`,
                border: `1px solid ${C.sagePale}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <p className="text-sm font-medium" style={{ fontFamily: ff.sans, color: C.charcoal }}>
                Want a bigger garden?
              </p>
              <p className="text-sm mt-1" style={{ fontFamily: ff.sans, color: C.charcoalLight }}>
                3-pack at <strong style={{ color: C.coral }}>&#8377;7,999</strong> (save &#8377;998) &nbsp;&bull;&nbsp;
                5-pack at <strong style={{ color: C.coral }}>&#8377;12,499</strong> (save &#8377;2,496)
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <WaveDivider fill={C.bgBlush} flip />

      {/* ── FAQ ──────────────────────────────── */}
      <section id="faq" className="py-16 sm:py-24" style={{ background: C.bg }}>
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4"
                style={{ background: C.sagePale, color: C.olive, fontFamily: ff.sans }}
              >
                FAQ
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-normal"
                style={{ fontFamily: ff.serif, color: C.charcoal }}
              >
                Any <span style={{ color: C.coral, fontStyle: 'italic' }}>questions?</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="rounded-3xl p-5 sm:p-8"
              style={{
                background: C.white,
                boxShadow: '0 4px 24px rgba(58,54,50,0.05)',
                border: `1px solid ${C.sagePale}`,
              }}
            >
              {faqs.map((f, i) => (
                <FAQItem key={i} q={f.q} a={f.a} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────── */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${C.bgSage} 0%, ${C.coralPale} 50%, ${C.bgBlush} 100%)`,
          }}
        />
        <Blob color={C.white} size={350} top="-10%" left="20%" className="d5-blob-morph" />
        <Blob color={C.white} size={250} bottom="-5%" right="15%" className="d5-blob-morph-2" />

        <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <Reveal>
            <div
              className="text-4xl sm:text-5xl mb-4"
              style={{ animation: 'd5float 5s ease-in-out infinite' }}
            >
              {'\u{1F33F}'}
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal mb-4"
              style={{ fontFamily: ff.serif, color: C.charcoal }}
            >
              Ready to grow <span style={{ color: C.coral, fontStyle: 'italic' }}>up?</span>
            </h2>
            <p
              className="text-base sm:text-lg mb-8 max-w-md mx-auto"
              style={{ fontFamily: ff.sans, color: C.charcoalLight, fontWeight: 300 }}
            >
              Join 500+ Indian homes that have turned their walls into living gardens with Planterra.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-semibold"
              style={{
                background: C.coral,
                color: C.white,
                boxShadow: `0 8px 32px ${C.coral}44`,
                fontFamily: ff.sans,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 12px 40px ${C.coral}66`
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = `0 8px 32px ${C.coral}44`
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Get Your Planterra
              <span className="text-lg">{'\u2192'}</span>
            </a>
            <p className="text-xs mt-5" style={{ color: C.olive, fontFamily: ff.sans }}>
              &#8377;2,999 per module &bull; Free shipping on 2+ &bull; Easy returns
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer
        className="py-12 sm:py-16"
        style={{ background: C.charcoal }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: ff.serif, color: C.white }}
              >
                Planterra
              </h3>
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ fontFamily: ff.sans, color: `${C.white}88` }}
              >
                3D-printed, self-watering modular wall planters. Made with love in India.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: C.sage, fontFamily: ff.sans }}>
                Product
              </h4>
              <div className="flex flex-col gap-2.5">
                {['Features', 'How It Works', 'Pricing', 'FAQ'].map(l => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm"
                    style={{
                      color: `${C.white}77`,
                      fontFamily: ff.sans,
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.coralLight)}
                    onMouseLeave={e => (e.currentTarget.style.color = `${C.white}77`)}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: C.sage, fontFamily: ff.sans }}>
                Company
              </h4>
              <div className="flex flex-col gap-2.5">
                {['About', 'Blog', 'Contact', 'Shipping'].map(l => (
                  <a
                    key={l}
                    href="#"
                    className="text-sm"
                    style={{
                      color: `${C.white}77`,
                      fontFamily: ff.sans,
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.coralLight)}
                    onMouseLeave={e => (e.currentTarget.style.color = `${C.white}77`)}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: C.sage, fontFamily: ff.sans }}>
                Connect
              </h4>
              <div className="flex flex-col gap-2.5">
                {['Instagram', 'Twitter', 'YouTube', 'Email'].map(l => (
                  <a
                    key={l}
                    href="#"
                    className="text-sm"
                    style={{
                      color: `${C.white}77`,
                      fontFamily: ff.sans,
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.coralLight)}
                    onMouseLeave={e => (e.currentTarget.style.color = `${C.white}77`)}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${C.white}15` }}
          >
            <p className="text-xs" style={{ color: `${C.white}55`, fontFamily: ff.sans }}>
              &copy; 2026 Planterra. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Refunds'].map(l => (
                <a
                  key={l}
                  href="#"
                  className="text-xs"
                  style={{
                    color: `${C.white}55`,
                    fontFamily: ff.sans,
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.coralLight)}
                  onMouseLeave={e => (e.currentTarget.style.color = `${C.white}55`)}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
