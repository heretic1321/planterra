import { useState, useEffect, useRef, type ReactNode } from 'react'

// ════════════════════════════════════════════════════════════
// DESIGN 2 — LUSH MIDNIGHT GARDEN
// Premium botanical magazine meets luxury brand at night.
// Deep midnight blues, rich gold, lush greens, botanical SVGs.
// Fonts: Cormorant Garamond (serif) + Outfit (sans-serif)
// ════════════════════════════════════════════════════════════

// ── Palette ─────────────────────────────────────────────────
const C = {
  midnight: '#0a1628',
  navy: '#131f38',
  navyLight: '#1a2847',
  gold: '#c8a45e',
  goldLight: '#d4b87a',
  amber: '#d4943a',
  green: '#3d7a5f',
  greenLight: '#5fa67a',
  greenPale: '#7ec49a',
  cream: '#f5f0e6',
  creamDim: '#d9d3c6',
  creamFaint: 'rgba(245,240,230,0.07)',
  white: '#ffffff',
}

const SERIF = "'Cormorant Garamond', serif"
const SANS = "'Outfit', sans-serif"

// ── Hooks ───────────────────────────────────────────────────
function useInView(threshold = 0.15) {
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

// ── Global Keyframe Styles ──────────────────────────────────
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

@keyframes d2-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-14px); }
}
@keyframes d2-float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(3deg); }
}
@keyframes d2-twinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
@keyframes d2-glow-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}
@keyframes d2-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes d2-marquee-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes d2-vine-grow {
  0% { stroke-dashoffset: 800; }
  100% { stroke-dashoffset: 0; }
}
@keyframes d2-leaf-unfurl {
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  60% { transform: scale(1.1) rotate(5deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes d2-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes d2-rotate-slow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes d2-pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}
@keyframes d2-slide-up {
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
`

// ── SVG Botanical Art ───────────────────────────────────────
function BotanicalLeaf({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 160" fill="none" className={className} style={style}>
      <path
        d="M60 10 C30 40, 10 80, 20 130 C25 145, 40 155, 60 150 C80 155, 95 145, 100 130 C110 80, 90 40, 60 10Z"
        stroke={C.greenLight}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M60 10 C60 50, 60 90, 60 150"
        stroke={C.greenLight}
        strokeWidth="1"
        opacity="0.4"
      />
      <path d="M60 40 C45 55, 35 65, 28 80" stroke={C.greenLight} strokeWidth="0.8" opacity="0.3" />
      <path d="M60 40 C75 55, 85 65, 92 80" stroke={C.greenLight} strokeWidth="0.8" opacity="0.3" />
      <path d="M60 70 C48 82, 38 92, 30 108" stroke={C.greenLight} strokeWidth="0.8" opacity="0.3" />
      <path d="M60 70 C72 82, 82 92, 90 108" stroke={C.greenLight} strokeWidth="0.8" opacity="0.3" />
    </svg>
  )
}

function BotanicalBranch({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 300" fill="none" className={className} style={style}>
      <path
        d="M100 280 C100 240, 95 200, 90 170 C85 140, 75 110, 80 80 C85 50, 95 30, 100 10"
        stroke={C.gold}
        strokeWidth="1.2"
        opacity="0.3"
        strokeDasharray="800"
        style={{ animation: 'd2-vine-grow 4s ease-out forwards' }}
      />
      <g style={{ animation: 'd2-leaf-unfurl 1s ease-out 1.5s both' }}>
        <ellipse cx="70" cy="100" rx="18" ry="10" transform="rotate(-30 70 100)" stroke={C.greenLight} strokeWidth="1" fill="none" opacity="0.35" />
      </g>
      <g style={{ animation: 'd2-leaf-unfurl 1s ease-out 2s both' }}>
        <ellipse cx="115" cy="140" rx="16" ry="9" transform="rotate(25 115 140)" stroke={C.greenLight} strokeWidth="1" fill="none" opacity="0.35" />
      </g>
      <g style={{ animation: 'd2-leaf-unfurl 1s ease-out 2.5s both' }}>
        <ellipse cx="75" cy="190" rx="20" ry="11" transform="rotate(-20 75 190)" stroke={C.greenLight} strokeWidth="1" fill="none" opacity="0.35" />
      </g>
      <g style={{ animation: 'd2-leaf-unfurl 1s ease-out 3s both' }}>
        <ellipse cx="120" cy="60" rx="14" ry="8" transform="rotate(35 120 60)" stroke={C.gold} strokeWidth="1" fill="none" opacity="0.25" />
      </g>
    </svg>
  )
}

function StarField({ count = 40 }: { count?: number }) {
  const stars = useRef(
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 2,
    }))
  ).current

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: i % 3 === 0 ? C.gold : C.cream,
            animation: `d2-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

// ── Reveal Wrapper ──────────────────────────────────────────
function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right' | 'scale'
}) {
  const { ref, inView } = useInView(0.1)
  const transforms: Record<string, string> = {
    up: 'translateY(50px)',
    left: 'translateX(-50px)',
    right: 'translateX(50px)',
    scale: 'scale(0.85)',
  }
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) translateX(0) scale(1)' : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.9s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

// ── Marquee ─────────────────────────────────────────────────
function Marquee({ children, speed = 35, reverse = false }: {
  children: ReactNode; speed?: number; reverse?: boolean
}) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{
          animation: `${reverse ? 'd2-marquee-reverse' : 'd2-marquee'} ${speed}s linear infinite`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

// ── FAQ Accordion ───────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  const { ref, inView } = useInView(0.1)

  return (
    <div
      ref={ref}
      className="border-b cursor-pointer group"
      style={{
        borderColor: 'rgba(200,164,94,0.2)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(30px)',
        transition: `all 0.6s cubic-bezier(.16,1,.3,1) ${index * 0.08}s`,
      }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 md:py-7">
        <h3
          className="text-lg md:text-xl lg:text-2xl pr-6 transition-colors duration-300"
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            color: open ? C.gold : C.cream,
          }}
        >
          {q}
        </h3>
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-xl shrink-0 transition-all duration-500"
          style={{
            border: `1.5px solid ${open ? C.gold : 'rgba(200,164,94,0.4)'}`,
            color: open ? C.midnight : C.gold,
            background: open ? C.gold : 'transparent',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? '300px' : '0' }}
      >
        <p
          className="text-base md:text-lg pb-6 leading-relaxed"
          style={{ fontFamily: SANS, color: C.creamDim }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

// ── Feature Card ────────────────────────────────────────────
function FeatureCard({ icon, title, desc, delay, index }: {
  icon: ReactNode; title: string; desc: string; delay: number; index: number
}) {
  const { ref, inView } = useInView(0.1)
  const rotations = [-2, 1.5, -1, 2, -1.5, 1]
  const rot = rotations[index % rotations.length]

  return (
    <div
      ref={ref}
      className="p-6 md:p-8 rounded-2xl transition-all duration-700 hover:scale-[1.03] group"
      style={{
        background: `linear-gradient(135deg, ${C.navyLight}, ${C.navy})`,
        border: `1px solid rgba(200,164,94,0.15)`,
        opacity: inView ? 1 : 0,
        transform: inView
          ? `rotate(${rot}deg) translateY(0)`
          : `rotate(${rot + 5}deg) translateY(60px) scale(0.85)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-2xl md:text-3xl mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
        style={{
          background: `linear-gradient(135deg, ${C.green}, ${C.greenLight})`,
        }}
      >
        {icon}
      </div>
      <h3
        className="text-xl md:text-2xl mb-3"
        style={{ fontFamily: SERIF, fontWeight: 600, color: C.cream }}
      >
        {title}
      </h3>
      <p
        className="text-sm md:text-base leading-relaxed"
        style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}
      >
        {desc}
      </p>
    </div>
  )
}

// ── Testimonial Card ────────────────────────────────────────
function TestimonialCard({ name, city, text, delay }: {
  name: string; city: string; text: string; delay: number
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className="p-6 md:p-8 rounded-2xl transition-all duration-700"
      style={{
        background: `linear-gradient(160deg, rgba(200,164,94,0.08), rgba(61,122,95,0.08))`,
        border: '1px solid rgba(200,164,94,0.12)',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={C.gold}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p
        className="text-base md:text-lg mb-6 leading-relaxed italic"
        style={{ fontFamily: SERIF, color: C.cream }}
      >
        "{text}"
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
          style={{ background: C.green, color: C.cream, fontFamily: SANS }}
        >
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ fontFamily: SANS, color: C.cream }}>
            {name}
          </p>
          <p className="text-xs" style={{ fontFamily: SANS, color: C.creamDim }}>
            {city}
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Step Component ──────────────────────────────────────────
function StepCard({ num, title, desc, delay }: {
  num: number; title: string; desc: string; delay: number
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center transition-all duration-700"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.85)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="relative mb-6">
        <div
          className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
            boxShadow: `0 8px 32px rgba(200,164,94,0.3)`,
          }}
        >
          <span
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: SERIF, color: C.midnight }}
          >
            {num}
          </span>
        </div>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: `2px solid ${C.gold}`,
            animation: 'd2-pulse-ring 2s ease-out infinite',
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
      <h4
        className="text-lg md:text-xl mb-2"
        style={{ fontFamily: SERIF, fontWeight: 600, color: C.gold }}
      >
        {title}
      </h4>
      <p
        className="text-sm md:text-base max-w-[260px] leading-relaxed"
        style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}
      >
        {desc}
      </p>
    </div>
  )
}

// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function Design2() {
  const scrollY = useScrollY()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navScrolled = scrollY > 60

  const features = [
    { icon: <DropletIcon />, title: 'Self-Watering', desc: 'Built-in reservoir with cotton wick system. Fill once, forget for 2 weeks. Your plants drink exactly what they need.' },
    { icon: <WallIcon />, title: 'Wall-Mounted', desc: 'Reclaim your surfaces. Planterra hangs on a solid sheesham wood dowel, turning any wall into a living garden.' },
    { icon: <ModularIcon />, title: 'Modular System', desc: 'Start with 2 planters. Add up to 4 per rail. Mix, rearrange, expand. Your green wall grows with you.' },
    { icon: <PrinterIcon />, title: '3D Printed', desc: 'Precision-manufactured in PLA+ bioplastic. Each planter is crafted with geometric perfection that moulds cannot achieve.' },
    { icon: <LeafIcon />, title: 'Eco-Friendly', desc: 'PLA+ is plant-based and biodegradable. The wooden dowel is sustainably sourced. Green inside and out.' },
    { icon: <SparkleIcon />, title: 'Low Maintenance', desc: 'No drainage mess, no daily watering, no complicated setup. Just beautiful plants thriving with minimal effort.' },
  ]

  const faqs = [
    { q: 'What plants work best in Planterra?', a: 'Pothos, money plant, philodendron, spider plant, snake plant, and most small indoor tropicals thrive beautifully. We include a curated plant guide with every order to help you choose.' },
    { q: 'How does the self-watering system work?', a: 'A cotton wick draws water from the built-in reservoir to the soil through natural capillary action. Simply fill the reservoir through the top opening, and your plant drinks exactly what it needs for up to 2 weeks.' },
    { q: 'Will mounting damage my wall?', a: 'The kit uses two standard wall screws with drywall anchors per rail. The holes are small and easily filled if you ever move. No adhesive, no mess, no large patches needed.' },
    { q: 'Can I expand my setup later?', a: 'Absolutely. Each wooden dowel rail holds up to 4 planters. Order additional planters individually for Rs. 899 each, or add another complete rail to create a stunning grid arrangement.' },
    { q: 'What material are the planters made from?', a: 'High-quality PLA+ bioplastic, 3D printed layer by layer for precision and strength. PLA+ is plant-derived, UV-stable for indoor use, and retains its matte finish for years. The dowel is solid sheesham wood.' },
    { q: 'Do you deliver across India?', a: 'Yes, we ship to every pin code in India. Free shipping is included on all orders Rs. 2,999 and above. Standard delivery takes 5-7 business days, with tracking provided via SMS and email.' },
    { q: 'Is it suitable for renters?', a: 'Perfectly suited. The two small screw holes are easily patched with wall filler when you move out. Many of our customers are renters who love the non-destructive nature of the installation.' },
  ]

  const testimonials = [
    { name: 'Priya Sharma', city: 'Mumbai', text: 'I have killed every plant I have ever owned. Three months with Planterra and my pothos is actually thriving. The self-watering system is genuinely magical.' },
    { name: 'Arjun Mehta', city: 'Bangalore', text: 'The design quality is outstanding. Everyone who visits my apartment asks about it. It looks like it belongs in an architecture magazine, not a gardening store.' },
    { name: 'Sneha Reddy', city: 'Hyderabad', text: 'Started with the starter kit, now I have three rails with 10 planters. My living room wall is a living work of art. The modular system is brilliantly designed.' },
    { name: 'Karthik Iyer', city: 'Chennai', text: 'As someone who travels frequently for work, the 2-week watering cycle is a lifesaver. My plants are alive and healthy even after long trips.' },
  ]

  const marqueeItems = [
    'Featured in Architectural Digest India',
    '2,400+ Happy Plant Parents',
    'Rated 4.8/5 on Google Reviews',
    'Made with Love in Bangalore',
    'Sustainable PLA+ Bioplastic',
    '30-Day Satisfaction Guarantee',
    'Free Shipping Pan-India',
    'Designed for Indian Homes',
  ]

  return (
    <div style={{ fontFamily: SANS, background: C.midnight, color: C.cream, overflowX: 'hidden' }}>
      <style>{globalCSS}</style>

      {/* ── NAVBAR ──────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: navScrolled
            ? 'rgba(10,22,40,0.95)'
            : 'transparent',
          backdropFilter: navScrolled ? 'blur(20px)' : 'none',
          borderBottom: navScrolled ? `1px solid rgba(200,164,94,0.15)` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <svg viewBox="0 0 32 32" className="w-8 h-8 md:w-9 md:h-9 transition-transform duration-500 group-hover:rotate-12">
                <circle cx="16" cy="16" r="14" fill="none" stroke={C.gold} strokeWidth="1.5" />
                <path d="M16 6 C12 12, 8 18, 12 26 C13 28, 15 28, 16 26 C17 28, 19 28, 20 26 C24 18, 20 12, 16 6Z" fill={C.greenLight} opacity="0.8" />
                <path d="M16 6 L16 26" stroke={C.green} strokeWidth="0.8" />
              </svg>
              <span
                className="text-xl md:text-2xl tracking-wide"
                style={{ fontFamily: SERIF, fontWeight: 600, color: C.cream }}
              >
                Planterra
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['Features', 'How It Works', 'Pricing', 'FAQ'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-sm tracking-wider uppercase transition-colors duration-300 hover:text-[#c8a45e]"
                  style={{ fontFamily: SANS, fontWeight: 400, color: C.creamDim }}
                >
                  {item}
                </a>
              ))}
              <a
                href="#pricing"
                className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                  color: C.midnight,
                  fontFamily: SANS,
                }}
              >
                Order Now
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{ minWidth: 44, minHeight: 44 }}
            >
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: C.gold,
                  transform: mobileMenuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: C.gold,
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-6 h-0.5 transition-all duration-300"
                style={{
                  background: C.gold,
                  transform: mobileMenuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className="md:hidden transition-all duration-500 overflow-hidden"
          style={{
            maxHeight: mobileMenuOpen ? '400px' : '0',
            background: 'rgba(10,22,40,0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div className="px-6 py-6 space-y-1">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
                className="block py-3 text-lg tracking-wide transition-colors duration-300"
                style={{ fontFamily: SERIF, fontWeight: 500, color: C.cream }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="#pricing"
              className="block mt-4 py-3 rounded-full text-center text-base font-semibold tracking-wider uppercase"
              style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                color: C.midnight,
                fontFamily: SANS,
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Order Now
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, rgba(61,122,95,0.15) 0%, transparent 70%),
                       radial-gradient(ellipse 60% 50% at 80% 20%, rgba(200,164,94,0.08) 0%, transparent 60%),
                       linear-gradient(180deg, ${C.midnight} 0%, ${C.navy} 100%)`,
        }} />

        <StarField count={50} />

        {/* Botanical decorations */}
        <BotanicalLeaf
          className="absolute hidden lg:block"
          style={{
            width: 120,
            right: '5%',
            top: '15%',
            animation: 'd2-float-slow 8s ease-in-out infinite',
            opacity: 0.4,
          }}
        />
        <BotanicalLeaf
          className="absolute hidden lg:block"
          style={{
            width: 80,
            left: '3%',
            bottom: '20%',
            animation: 'd2-float-slow 10s ease-in-out 2s infinite',
            opacity: 0.3,
            transform: 'scaleX(-1)',
          }}
        />
        <BotanicalBranch
          className="absolute hidden lg:block"
          style={{
            width: 160,
            right: '10%',
            bottom: '10%',
            opacity: 0.25,
          }}
        />

        {/* Glow orbs */}
        <div
          className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(200,164,94,0.12) 0%, transparent 70%)`,
            top: '10%',
            left: '50%',
            transform: `translate(-50%, ${scrollY * -0.1}px)`,
            animation: 'd2-glow-pulse 6s ease-in-out infinite',
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-0 md:pb-0">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{
                background: 'rgba(200,164,94,0.1)',
                border: '1px solid rgba(200,164,94,0.2)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.8s cubic-bezier(.16,1,.3,1) 0.2s',
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: C.greenLight, animation: 'd2-glow-pulse 2s ease-in-out infinite' }} />
              <span className="text-xs sm:text-sm tracking-widest uppercase" style={{ fontFamily: SANS, color: C.gold }}>
                Handcrafted in Bangalore
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-6"
              style={{
                fontFamily: SERIF,
                fontWeight: 300,
                color: C.cream,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.4s',
              }}
            >
              Your Walls
              <br />
              Deserve to{' '}
              <span style={{
                fontWeight: 600,
                fontStyle: 'italic',
                background: `linear-gradient(135deg, ${C.gold}, ${C.greenLight})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Breathe
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-10"
              style={{
                fontFamily: SANS,
                fontWeight: 300,
                color: C.creamDim,
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.6s',
              }}
            >
              Planterra is a 3D-printed, self-watering modular wall planter that transforms bare walls into living gardens. Designed for modern Indian homes.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.8s',
              }}
            >
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                  color: C.midnight,
                  fontFamily: SANS,
                  boxShadow: '0 4px 24px rgba(200,164,94,0.3)',
                  minHeight: 48,
                }}
              >
                Shop the Starter Kit
                <svg className="w-4 h-4 ml-2" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  border: `1.5px solid rgba(200,164,94,0.4)`,
                  color: C.cream,
                  fontFamily: SANS,
                  fontWeight: 400,
                  minHeight: 48,
                }}
              >
                See How It Works
              </a>
            </div>

            {/* Price tag */}
            <div
              className="mt-10 inline-flex items-baseline gap-2"
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 1s cubic-bezier(.16,1,.3,1) 1.2s',
              }}
            >
              <span className="text-sm tracking-wider uppercase" style={{ fontFamily: SANS, color: C.creamDim }}>
                Starting at
              </span>
              <span className="text-2xl md:text-3xl" style={{ fontFamily: SERIF, fontWeight: 700, color: C.gold }}>
                Rs. 2,999
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{
            opacity: mounted && scrollY < 100 ? 0.6 : 0,
            transition: 'opacity 0.5s',
          }}
        >
          <span className="text-xs tracking-[0.3em] uppercase" style={{ fontFamily: SANS, color: C.creamDim }}>
            Scroll
          </span>
          <div className="w-5 h-8 rounded-full border border-current flex justify-center pt-1.5" style={{ borderColor: 'rgba(200,164,94,0.4)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: C.gold, animation: 'd2-float 2s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF MARQUEE ────────────────── */}
      <section
        className="py-6 md:py-8 relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, rgba(200,164,94,0.05), rgba(61,122,95,0.05), rgba(200,164,94,0.05))`,
          borderTop: '1px solid rgba(200,164,94,0.1)',
          borderBottom: '1px solid rgba(200,164,94,0.1)',
        }}
      >
        <Marquee speed={40}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="inline-flex items-center mx-6 md:mx-10">
              <svg className="w-3 h-3 mr-3" viewBox="0 0 12 12" fill={C.gold} opacity="0.6">
                <path d="M6 0l1.8 3.6L12 4.2 9 7.1l.7 4.1L6 9.3 2.3 11.2 3 7.1 0 4.2l4.2-.6z" />
              </svg>
              <span
                className="text-xs sm:text-sm tracking-[0.15em] uppercase whitespace-nowrap"
                style={{ fontFamily: SANS, fontWeight: 400, color: C.creamDim }}
              >
                {item}
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ── FEATURES ───────────────────────────── */}
      <section id="features" className="py-20 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(61,122,95,0.06) 0%, transparent 70%)`,
              top: '20%',
              right: '-10%',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <span
                className="inline-block text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily: SANS,
                  color: C.gold,
                  background: 'rgba(200,164,94,0.08)',
                  border: '1px solid rgba(200,164,94,0.15)',
                }}
              >
                Why Planterra
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: SERIF, fontWeight: 400, color: C.cream }}
              >
                Engineered for{' '}
                <span style={{ fontStyle: 'italic', color: C.greenLight }}>Living</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {features.map((f, i) => (
              <FeatureCard key={i} index={i} {...f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ───────────────────── */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, ${C.midnight} 0%, ${C.navy} 50%, ${C.midnight} 100%)`,
        }} />

        {/* Decorative botanical */}
        <BotanicalLeaf
          className="absolute hidden md:block"
          style={{
            width: 100,
            left: '2%',
            top: '10%',
            opacity: 0.2,
            animation: 'd2-float-slow 12s ease-in-out infinite',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image placeholder */}
            <Reveal direction="left">
              <div
                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                style={{
                  background: `linear-gradient(135deg, ${C.navyLight}, rgba(61,122,95,0.15))`,
                  border: '1px solid rgba(200,164,94,0.12)',
                }}
              >
                {/* Decorative grid pattern */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `linear-gradient(rgba(200,164,94,0.3) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(200,164,94,0.3) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                  }}
                />
                {/* Central illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg viewBox="0 0 200 180" className="w-40 h-36 md:w-56 md:h-48 mx-auto" fill="none">
                      {/* Dowel rail */}
                      <rect x="30" y="50" width="140" height="8" rx="4" fill={C.amber} opacity="0.7" />
                      {/* Planter 1 */}
                      <path d="M55 58 L50 120 C50 128, 58 134, 70 134 L70 134 C82 134, 90 128, 90 120 L85 58Z" fill={C.cream} opacity="0.2" stroke={C.cream} strokeWidth="1" />
                      <path d="M60 72 C60 68, 64 58, 70 50 C72 58, 78 65, 80 72" stroke={C.greenLight} strokeWidth="1.5" fill="none" />
                      <ellipse cx="70" cy="52" rx="8" ry="5" fill={C.greenLight} opacity="0.5" />
                      <ellipse cx="64" cy="58" rx="6" ry="4" transform="rotate(-20 64 58)" fill={C.green} opacity="0.5" />
                      {/* Planter 2 */}
                      <path d="M115 58 L110 120 C110 128, 118 134, 130 134 L130 134 C142 134, 150 128, 150 120 L145 58Z" fill={C.cream} opacity="0.2" stroke={C.cream} strokeWidth="1" />
                      <path d="M122 70 C120 62, 126 48, 130 40 C134 48, 140 62, 138 70" stroke={C.greenLight} strokeWidth="1.5" fill="none" />
                      <ellipse cx="130" cy="42" rx="10" ry="6" fill={C.greenLight} opacity="0.5" />
                      <ellipse cx="137" cy="50" rx="7" ry="4" transform="rotate(15 137 50)" fill={C.green} opacity="0.5" />
                      {/* Water level indicator */}
                      <path d="M56 105 L84 105" stroke={C.gold} strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5" />
                      <text x="70" y="115" textAnchor="middle" fill={C.gold} fontSize="6" fontFamily={SANS} opacity="0.5">water</text>
                    </svg>
                    <p className="text-sm mt-6 tracking-wider uppercase" style={{ fontFamily: SANS, color: C.creamDim }}>
                      Product photography coming soon
                    </p>
                  </div>
                </div>

                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  style={{
                    background: 'linear-gradient(110deg, transparent 30%, rgba(200,164,94,0.05) 50%, transparent 70%)',
                    backgroundSize: '200% 100%',
                    animation: 'd2-shimmer 3s linear infinite',
                  }}
                />
              </div>
            </Reveal>

            {/* Text content */}
            <div>
              <Reveal delay={0.15}>
                <span
                  className="inline-block text-xs tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
                  style={{
                    fontFamily: SANS,
                    color: C.gold,
                    background: 'rgba(200,164,94,0.08)',
                    border: '1px solid rgba(200,164,94,0.15)',
                  }}
                >
                  The Product
                </span>
              </Reveal>
              <Reveal delay={0.25}>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl mb-6"
                  style={{ fontFamily: SERIF, fontWeight: 400, color: C.cream }}
                >
                  Where Nature Meets{' '}
                  <span style={{ fontStyle: 'italic', color: C.gold }}>Precision</span>
                </h2>
              </Reveal>
              <Reveal delay={0.35}>
                <p
                  className="text-base md:text-lg leading-relaxed mb-8"
                  style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}
                >
                  Each Planterra planter is 3D-printed to exacting standards, creating geometries that traditional manufacturing simply cannot achieve. The result is a planter that is not just functional, but a genuine object of beauty.
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="space-y-4">
                  {[
                    { label: 'Material', value: 'PLA+ Bioplastic + Sheesham Wood' },
                    { label: 'Capacity', value: '300ml reservoir, 2-week watering' },
                    { label: 'Dimensions', value: '12cm W x 14cm H per planter' },
                    { label: 'Weight', value: '180g per planter (empty)' },
                  ].map((spec, i) => (
                    <div key={i} className="flex items-baseline gap-4 pb-3" style={{ borderBottom: '1px solid rgba(200,164,94,0.08)' }}>
                      <span className="text-xs tracking-[0.2em] uppercase w-28 shrink-0" style={{ fontFamily: SANS, color: C.gold }}>
                        {spec.label}
                      </span>
                      <span className="text-sm md:text-base" style={{ fontFamily: SANS, fontWeight: 300, color: C.cream }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(200,164,94,0.06) 0%, transparent 70%)`,
              bottom: '10%',
              left: '10%',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <span
                className="inline-block text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily: SANS,
                  color: C.gold,
                  background: 'rgba(200,164,94,0.08)',
                  border: '1px solid rgba(200,164,94,0.15)',
                }}
              >
                Simple Setup
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: SERIF, fontWeight: 400, color: C.cream }}
              >
                Four Steps to a{' '}
                <span style={{ fontStyle: 'italic', color: C.gold }}>Living Wall</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            <StepCard num={1} title="Mount the Rail" desc="Use the included screws and anchors to fix the sheesham wood dowel to your wall. Takes under 5 minutes." delay={0} />
            <StepCard num={2} title="Slide On Planters" desc="Hook the 3D-printed planters onto the dowel. They click securely into place with a satisfying fit." delay={150} />
            <StepCard num={3} title="Add Soil & Plants" desc="Fill with the included coco peat mix and transplant your favourite indoor plants. We recommend pothos to start." delay={300} />
            <StepCard num={4} title="Fill & Forget" desc="Pour water into the built-in reservoir. The cotton wick does the rest, keeping your plants hydrated for up to 2 weeks." delay={450} />
          </div>

          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[58%] left-[18%] right-[18%] h-px" style={{
            background: `linear-gradient(90deg, transparent, ${C.gold}33, ${C.gold}33, transparent)`,
          }} />
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────── */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, ${C.navy} 0%, ${C.midnight} 100%)`,
        }} />

        <StarField count={25} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <span
                className="inline-block text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily: SANS,
                  color: C.gold,
                  background: 'rgba(200,164,94,0.08)',
                  border: '1px solid rgba(200,164,94,0.15)',
                }}
              >
                Happy Plant Parents
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: SERIF, fontWeight: 400, color: C.cream }}
              >
                Loved by{' '}
                <span style={{ fontStyle: 'italic', color: C.greenLight }}>2,400+</span>{' '}
                Homes
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(200,164,94,0.08) 0%, transparent 70%)`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <span
                className="inline-block text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily: SANS,
                  color: C.gold,
                  background: 'rgba(200,164,94,0.08)',
                  border: '1px solid rgba(200,164,94,0.15)',
                }}
              >
                Pricing
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: SERIF, fontWeight: 400, color: C.cream }}
              >
                Begin Your{' '}
                <span style={{ fontStyle: 'italic', color: C.gold }}>Garden</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${C.navyLight}, rgba(200,164,94,0.05))`,
                border: '1px solid rgba(200,164,94,0.2)',
              }}
            >
              {/* Corner botanical */}
              <BotanicalLeaf
                className="absolute"
                style={{
                  width: 80,
                  top: -10,
                  right: -10,
                  opacity: 0.15,
                  transform: 'rotate(45deg)',
                }}
              />
              <BotanicalLeaf
                className="absolute"
                style={{
                  width: 60,
                  bottom: -5,
                  left: -5,
                  opacity: 0.1,
                  transform: 'rotate(-135deg)',
                }}
              />

              <div className="relative z-10">
                <span
                  className="inline-block text-xs tracking-[0.3em] uppercase mb-6 px-5 py-2 rounded-full"
                  style={{
                    fontFamily: SANS,
                    fontWeight: 600,
                    color: C.midnight,
                    background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                  }}
                >
                  Starter Kit
                </span>

                <div className="mb-8">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-lg" style={{ fontFamily: SANS, color: C.creamDim, textDecoration: 'line-through' }}>
                      Rs. 3,999
                    </span>
                  </div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-sm" style={{ fontFamily: SANS, color: C.gold }}>Rs.</span>
                    <span
                      className="text-6xl md:text-7xl lg:text-8xl"
                      style={{ fontFamily: SERIF, fontWeight: 700, color: C.gold }}
                    >
                      2,999
                    </span>
                  </div>
                  <p className="text-sm mt-2" style={{ fontFamily: SANS, color: C.creamDim }}>
                    Free shipping across India
                  </p>
                </div>

                <div className="max-w-md mx-auto mb-10">
                  <div className="space-y-3">
                    {[
                      '2 x Self-watering wall planters',
                      '1 x Sheesham wood dowel rail',
                      'Mounting hardware (screws + anchors)',
                      'Coco peat soil mix',
                      'Cotton wicks (pre-installed)',
                      'Plant care guide',
                      '30-day happiness guarantee',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <svg className="w-5 h-5 shrink-0" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="9" stroke={C.greenLight} strokeWidth="1.5" />
                          <path d="M6 10l3 3 5-5" stroke={C.greenLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm md:text-base text-left" style={{ fontFamily: SANS, fontWeight: 300, color: C.cream }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                    color: C.midnight,
                    fontFamily: SANS,
                    boxShadow: '0 6px 32px rgba(200,164,94,0.35)',
                    minHeight: 48,
                  }}
                >
                  Order Your Starter Kit
                </a>

                <p className="text-xs mt-6" style={{ fontFamily: SANS, color: C.creamDim }}>
                  Need more? Add extra planters for Rs. 899 each.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section id="faq" className="py-20 md:py-32 relative">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, ${C.midnight} 0%, ${C.navy} 100%)`,
        }} />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16 md:mb-20">
              <span
                className="inline-block text-xs sm:text-sm tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  fontFamily: SANS,
                  color: C.gold,
                  background: 'rgba(200,164,94,0.08)',
                  border: '1px solid rgba(200,164,94,0.15)',
                }}
              >
                Questions
              </span>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: SERIF, fontWeight: 400, color: C.cream }}
              >
                Everything You{' '}
                <span style={{ fontStyle: 'italic', color: C.gold }}>Need to Know</span>
              </h2>
            </div>
          </Reveal>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} {...faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────── */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(61,122,95,0.12) 0%, transparent 70%),
                       radial-gradient(ellipse 60% 40% at 30% 60%, rgba(200,164,94,0.08) 0%, transparent 60%),
                       ${C.midnight}`,
        }} />

        <StarField count={30} />

        {/* Decorative botanicals */}
        <BotanicalBranch
          className="absolute hidden md:block"
          style={{
            width: 140,
            left: '3%',
            top: '5%',
            opacity: 0.2,
            transform: 'scaleX(-1)',
          }}
        />
        <BotanicalBranch
          className="absolute hidden md:block"
          style={{
            width: 120,
            right: '5%',
            bottom: '5%',
            opacity: 0.15,
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 leading-[1.1]"
              style={{ fontFamily: SERIF, fontWeight: 300, color: C.cream }}
            >
              Transform Your Walls.
              <br />
              <span style={{
                fontWeight: 600,
                fontStyle: 'italic',
                background: `linear-gradient(135deg, ${C.gold}, ${C.greenLight})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Transform Your Home.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p
              className="text-base md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}
            >
              Join 2,400+ Indian homes that have discovered the joy of effortless indoor gardening with Planterra.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                  color: C.midnight,
                  fontFamily: SANS,
                  boxShadow: '0 6px 32px rgba(200,164,94,0.35)',
                  minHeight: 48,
                }}
              >
                Get Your Starter Kit — Rs. 2,999
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <p className="text-xs mt-8 tracking-wider" style={{ fontFamily: SANS, color: 'rgba(245,240,230,0.4)' }}>
              30-day guarantee &middot; Free shipping &middot; Designed in India
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer
        className="py-16 md:py-20 relative"
        style={{
          background: C.midnight,
          borderTop: '1px solid rgba(200,164,94,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <svg viewBox="0 0 32 32" className="w-8 h-8">
                  <circle cx="16" cy="16" r="14" fill="none" stroke={C.gold} strokeWidth="1.5" />
                  <path d="M16 6 C12 12, 8 18, 12 26 C13 28, 15 28, 16 26 C17 28, 19 28, 20 26 C24 18, 20 12, 16 6Z" fill={C.greenLight} opacity="0.8" />
                  <path d="M16 6 L16 26" stroke={C.green} strokeWidth="0.8" />
                </svg>
                <span className="text-xl" style={{ fontFamily: SERIF, fontWeight: 600, color: C.cream }}>
                  Planterra
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}>
                3D-printed self-watering wall planters designed for modern Indian homes. Handcrafted with care in Bangalore.
              </p>
              {/* Social links */}
              <div className="flex gap-3">
                {['Instagram', 'Twitter', 'YouTube'].map(platform => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      border: '1px solid rgba(200,164,94,0.2)',
                      color: C.creamDim,
                    }}
                    aria-label={platform}
                  >
                    <span className="text-xs font-medium" style={{ fontFamily: SANS }}>
                      {platform[0]}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links columns */}
            {[
              {
                title: 'Product',
                links: ['Starter Kit', 'Add-on Planters', 'Plant Guide', 'Gallery'],
              },
              {
                title: 'Company',
                links: ['Our Story', 'Sustainability', 'Blog', 'Contact'],
              },
              {
                title: 'Support',
                links: ['Shipping Info', 'Returns', 'Installation Help', 'FAQ'],
              },
            ].map((col, i) => (
              <div key={i}>
                <h4
                  className="text-sm tracking-[0.2em] uppercase mb-5"
                  style={{ fontFamily: SANS, fontWeight: 600, color: C.gold }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-300 hover:text-white"
                        style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div
            className="py-8 px-6 md:px-10 rounded-2xl mb-12 flex flex-col md:flex-row items-center gap-6"
            style={{
              background: 'rgba(200,164,94,0.05)',
              border: '1px solid rgba(200,164,94,0.1)',
            }}
          >
            <div className="flex-1 text-center md:text-left">
              <h4
                className="text-lg md:text-xl mb-1"
                style={{ fontFamily: SERIF, fontWeight: 600, color: C.cream }}
              >
                Join the Garden Club
              </h4>
              <p className="text-sm" style={{ fontFamily: SANS, fontWeight: 300, color: C.creamDim }}>
                Plant care tips, early access to new products, and exclusive offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-5 py-3 rounded-full text-sm outline-none transition-all duration-300 focus:ring-2"
                style={{
                  background: 'rgba(245,240,230,0.08)',
                  border: '1px solid rgba(200,164,94,0.2)',
                  color: C.cream,
                  fontFamily: SANS,
                }}
              />
              <button
                className="px-6 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.amber})`,
                  color: C.midnight,
                  fontFamily: SANS,
                  minHeight: 44,
                }}
              >
                Join
              </button>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid rgba(200,164,94,0.08)' }}>
            <p className="text-xs" style={{ fontFamily: SANS, color: 'rgba(245,240,230,0.35)' }}>
              &copy; 2026 Planterra. All rights reserved. Made with care in Bangalore, India.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Shipping Policy'].map(link => (
                <a
                  key={link}
                  href="#"
                  className="text-xs transition-colors duration-300 hover:text-white"
                  style={{ fontFamily: SANS, color: 'rgba(245,240,230,0.35)' }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ── Icon Components ─────────────────────────────────────────
function DropletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

function WallIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M3 15h18M9 3v6M15 9v6M9 15v6" />
    </svg>
  )
}

function ModularIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function PrinterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9V2h12v7" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
      <rect x="2" y="9" width="20" height="8" rx="2" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34" />
      <path d="M5.9 19.09c-1.84-6.09-.52-10.54 3.29-14.4C13.18.66 20 2 20 2s1.34 6.82-2.65 10.81c-3.86 3.81-8.31 5.13-14.4 3.29" />
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke={C.cream} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12h18M5.64 5.64l12.73 12.73M18.36 5.64L5.64 18.36" />
      <circle cx="12" cy="12" r="2" fill={C.cream} />
    </svg>
  )
}
