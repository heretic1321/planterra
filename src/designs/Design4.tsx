import { useState, useEffect, useRef, useCallback } from 'react'

// ──────────────────────────────────────────────
// DESIGN 4: SUNLIT TERRACOTTA MODERN
// Warm off-white + terracotta + deep forest green.
// Modern Indian craft meets Mediterranean warmth.
// Sun-drenched ceramics, geometric patterns, arch motifs.
// THE most animated design of all five.
// ──────────────────────────────────────────────

// ── Hooks ─────────────────────────────────────

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

// ── Constants ─────────────────────────────────

const C = {
  cream: '#faf7f2',
  terracotta: '#c45d3e',
  terracottaDark: '#b5472b',
  forest: '#1b3a2d',
  sand: '#e8d5b7',
  clay: '#a0826d',
  sienna: '#d4763a',
  forestLight: '#2d5a47',
  warmWhite: '#f5efe6',
} as const

const FONT = {
  display: "'Fraunces', serif",
  body: "'DM Sans', sans-serif",
} as const

// ── SVG Decorations ───────────────────────────

function ArchShape({ color = C.terracotta, size = 80, style = {} }: { color?: string; size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none" style={style}>
      <path d="M0 112V50C0 22.386 17.909 0 40 0C62.091 0 80 22.386 80 50V112H60V50C60 33.431 51.046 20 40 20C28.954 20 20 33.431 20 50V112H0Z" fill={color} fillOpacity="0.15" />
    </svg>
  )
}

function TrianglePattern({ color = C.sand, style = {} }: { color?: string; style?: React.CSSProperties }) {
  return (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" style={{ ...style, opacity: 0.3 }}>
      <polygon points="0,60 20,0 40,60" fill={color} />
      <polygon points="40,60 60,0 80,60" fill={color} />
      <polygon points="80,60 100,0 120,60" fill={color} />
    </svg>
  )
}

function DotGrid({ color = C.clay, cols = 5, rows = 4, style = {} }: { color?: string; cols?: number; rows?: number; style?: React.CSSProperties }) {
  const dots = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(<circle key={`${r}-${c}`} cx={c * 16 + 4} cy={r * 16 + 4} r="3" fill={color} fillOpacity="0.25" />)
    }
  }
  return (
    <svg width={cols * 16} height={rows * 16} style={style}>
      {dots}
    </svg>
  )
}

function WaveDivider({ color = C.cream, flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="w-full block"
      style={{ height: '60px', transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <path
        d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
        fill={color}
      />
    </svg>
  )
}

// ── Marquee Component ─────────────────────────

function Marquee({ children, speed = 25, reverse = false }: { children: React.ReactNode; speed?: number; reverse?: boolean }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{
          animation: `marquee4 ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

// ── Animated Feature Card ─────────────────────

function FeatureCard({ icon, title, desc, delay = 0 }: {
  icon: string; title: string; desc: string; delay?: number
}) {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 sm:p-8 transition-all duration-700 cursor-default"
      style={{
        background: hovered ? C.forest : C.warmWhite,
        color: hovered ? C.cream : C.forest,
        transform: inView
          ? hovered ? 'translateY(-8px) rotate(0deg)' : 'translateY(0) rotate(0deg)'
          : 'translateY(50px) rotate(3deg)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: hovered ? `0 20px 40px ${C.forest}33` : `0 4px 20px ${C.clay}22`,
        border: `1px solid ${hovered ? C.forest : C.sand}`,
      }}
    >
      <div
        className="text-4xl sm:text-5xl mb-4 transition-transform duration-500"
        style={{ transform: hovered ? 'scale(1.2) rotate(-5deg)' : 'scale(1) rotate(0)' }}
      >
        {icon}
      </div>
      <h3
        className="text-lg sm:text-xl font-bold mb-2"
        style={{ fontFamily: FONT.display }}
      >
        {title}
      </h3>
      <p
        className="text-sm sm:text-base leading-relaxed"
        style={{
          fontFamily: FONT.body,
          opacity: 0.85,
        }}
      >
        {desc}
      </p>
    </div>
  )
}

// ── Step Component ────────────────────────────

function StepItem({ num, title, desc, delay }: {
  num: number; title: string; desc: string; delay: number
}) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center transition-all duration-700"
      style={{
        transform: inView ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.85)',
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-black mb-5 transition-transform duration-300 hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${C.terracotta}, ${C.sienna})`,
          color: C.cream,
          fontFamily: FONT.display,
          boxShadow: `0 8px 25px ${C.terracotta}44`,
        }}
      >
        {num}
      </div>
      <h4
        className="text-lg sm:text-xl font-bold mb-2"
        style={{ fontFamily: FONT.display, color: C.forest }}
      >
        {title}
      </h4>
      <p
        className="text-sm sm:text-base leading-relaxed max-w-xs"
        style={{ fontFamily: FONT.body, color: C.clay }}
      >
        {desc}
      </p>
    </div>
  )
}

// ── Testimonial Card ──────────────────────────

function TestimonialCard({ name, location, text, rotate = 0, delay = 0 }: {
  name: string; location: string; text: string; rotate?: number; delay?: number
}) {
  const { ref, inView } = useInView(0.1)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-6 sm:p-8 transition-all duration-700 cursor-default"
      style={{
        background: C.warmWhite,
        border: `2px solid ${C.sand}`,
        transform: inView
          ? hovered ? 'rotate(0deg) translateY(-6px) scale(1.02)' : `rotate(${rotate}deg)`
          : `rotate(${rotate + 8}deg) scale(0.8) translateY(40px)`,
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
        boxShadow: hovered ? `0 16px 40px ${C.clay}33` : `0 4px 16px ${C.clay}15`,
      }}
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: C.sienna, fontSize: '18px' }}>&#9733;</span>
        ))}
      </div>
      <p
        className="text-base sm:text-lg mb-5 leading-relaxed italic"
        style={{ fontFamily: FONT.body, color: C.forest }}
      >
        "{text}"
      </p>
      <div>
        <p className="font-bold text-base" style={{ fontFamily: FONT.display, color: C.forest }}>
          {name}
        </p>
        <p className="text-sm" style={{ fontFamily: FONT.body, color: C.clay }}>
          {location}
        </p>
      </div>
    </div>
  )
}

// ── FAQ Accordion ─────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="cursor-pointer group"
      onClick={() => setOpen(!open)}
      style={{ borderBottom: `2px solid ${C.sand}` }}
    >
      <div className="flex items-center justify-between py-5 sm:py-6">
        <h3
          className="text-base sm:text-lg md:text-xl font-bold pr-6 transition-colors duration-300"
          style={{ fontFamily: FONT.display, color: open ? C.terracotta : C.forest }}
        >
          {q}
        </h3>
        <div
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xl font-bold shrink-0 transition-all duration-500"
          style={{
            background: open ? C.terracotta : C.sand,
            color: open ? C.cream : C.forest,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? '300px' : '0' }}
      >
        <p
          className="text-sm sm:text-base pb-6 leading-relaxed"
          style={{ fontFamily: FONT.body, color: C.clay }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

// ── Floating Decoration ───────────────────────

function FloatingShape({ children, duration = 6, delay = 0, style = {} }: {
  children: React.ReactNode; duration?: number; delay?: number; style?: React.CSSProperties
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        animation: `float4 ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── Spinning Badge ────────────────────────────

function SpinBadge({ text, size = 100, bg = C.terracotta, color = C.cream, style = {} }: {
  text: string; size?: number; bg?: string; color?: string; style?: React.CSSProperties
}) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-black"
      style={{
        width: size,
        height: size,
        background: bg,
        color,
        fontFamily: FONT.display,
        fontSize: size * 0.14,
        animation: 'spin4 12s linear infinite',
        textAlign: 'center',
        lineHeight: 1.2,
        padding: size * 0.15,
        boxShadow: `0 6px 20px ${bg}44`,
        ...style,
      }}
    >
      {text}
    </div>
  )
}

// ── Pulsing CTA Button ────────────────────────

function CTAButton({ children, large = false, style = {} }: {
  children: React.ReactNode; large?: boolean; style?: React.CSSProperties
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative font-bold rounded-full transition-all duration-300 cursor-pointer
        ${large ? 'px-10 py-5 text-lg sm:text-xl' : 'px-8 py-4 text-base sm:text-lg'}
      `}
      style={{
        fontFamily: FONT.display,
        background: hovered ? C.terracottaDark : C.sienna,
        color: C.cream,
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: hovered
          ? `0 12px 35px ${C.sienna}55, 0 0 0 4px ${C.sienna}22`
          : `0 6px 20px ${C.sienna}33`,
        ...style,
      }}
    >
      <span className="relative z-10">{children}</span>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          animation: 'pulse4 2s ease-in-out infinite',
          background: C.sienna,
          opacity: 0.3,
        }}
      />
    </button>
  )
}

// ── Section Reveal Wrapper ────────────────────

function Reveal({ children, className = '', delay = 0, direction = 'up' }: {
  children: React.ReactNode; className?: string; delay?: number; direction?: 'up' | 'left' | 'right'
}) {
  const { ref, inView } = useInView(0.1)
  const transforms = {
    up: 'translateY(50px)',
    left: 'translateX(-60px)',
    right: 'translateX(60px)',
  }
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transform: inView ? 'translate(0,0)' : transforms[direction],
        opacity: inView ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

// ── Nav ───────────────────────────────────────

function Nav() {
  const scrollY = useScrollY()
  const [menuOpen, setMenuOpen] = useState(false)
  const scrolled = scrollY > 60
  const links = ['Features', 'Story', 'How It Works', 'Pricing', 'FAQ']

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? `${C.cream}f0` : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? `0 2px 20px ${C.clay}15` : 'none',
        borderBottom: scrolled ? `1px solid ${C.sand}` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        <div
          className="text-xl sm:text-2xl font-black tracking-tight cursor-pointer"
          style={{ fontFamily: FONT.display, color: scrolled ? C.forest : C.forest }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Planterra
          <span style={{ color: C.terracotta }}>.</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, '-'))}
              className="text-sm font-medium transition-colors duration-300 cursor-pointer hover:opacity-100"
              style={{
                fontFamily: FONT.body,
                color: C.forest,
                opacity: 0.7,
                background: 'none',
                border: 'none',
              }}
            >
              {l}
            </button>
          ))}
          <CTAButton>Buy Now</CTAButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
          style={{ background: 'none', border: 'none' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: C.forest,
              transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none',
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: C.forest,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-0.5 transition-all duration-300"
            style={{
              background: C.forest,
              transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: C.cream,
          borderTop: menuOpen ? `1px solid ${C.sand}` : 'none',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l.toLowerCase().replace(/\s+/g, '-'))}
              className="text-left text-lg font-medium py-2 cursor-pointer"
              style={{ fontFamily: FONT.display, color: C.forest, background: 'none', border: 'none' }}
            >
              {l}
            </button>
          ))}
          <CTAButton>Buy Now — Rs. 2,999</CTAButton>
        </div>
      </div>
    </nav>
  )
}

// ══════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════

export default function Design4() {
  const scrollY = useScrollY()

  return (
    <div style={{ background: C.cream, color: C.forest, fontFamily: FONT.body }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600;9..144,700;9..144,800;9..144,900&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Keyframes */}
      <style>{`
        @keyframes marquee4 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes spin4 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse4 {
          0%, 100% { transform: scale(1); opacity: 0; }
          50% { transform: scale(1.15); opacity: 0.25; }
        }
        @keyframes slideInLeft4 {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight4 {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeUp4 {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes scaleIn4 {
          from { transform: scale(0.7) rotate(-5deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes grain4 {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        @keyframes archPulse4 {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.05); }
        }
        @keyframes wiggle4 {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
      `}</style>

      <Nav />

      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: C.cream }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            animation: 'grain4 8s steps(10) infinite',
          }}
        />

        {/* Parallax decorations */}
        <FloatingShape style={{ top: '15%', left: '5%' }} duration={7} delay={0}>
          <ArchShape color={C.terracotta} size={60} />
        </FloatingShape>
        <FloatingShape style={{ top: '25%', right: '8%' }} duration={8} delay={1}>
          <ArchShape color={C.sienna} size={45} />
        </FloatingShape>
        <FloatingShape style={{ bottom: '20%', left: '10%' }} duration={6} delay={0.5}>
          <DotGrid color={C.clay} cols={4} rows={3} />
        </FloatingShape>
        <FloatingShape style={{ top: '60%', right: '12%' }} duration={9} delay={2}>
          <TrianglePattern color={C.sand} />
        </FloatingShape>
        <FloatingShape style={{ bottom: '30%', right: '5%' }} duration={7} delay={1.5}>
          <ArchShape color={C.forestLight} size={35} />
        </FloatingShape>

        {/* Big parallax arch background */}
        <div
          className="absolute pointer-events-none hidden sm:block"
          style={{
            right: '-5%',
            top: '10%',
            transform: `translateY(${scrollY * 0.15}px)`,
            opacity: 0.08,
          }}
        >
          <svg width="500" height="700" viewBox="0 0 500 700" fill="none">
            <path d="M0 700V312.5C0 139.91 111.93 0 250 0C388.07 0 500 139.91 500 312.5V700H375V312.5C375 209.07 319.03 125 250 125C180.97 125 125 209.07 125 312.5V700H0Z" fill={C.terracotta} />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
                style={{
                  background: `${C.terracotta}15`,
                  color: C.terracotta,
                  fontFamily: FONT.body,
                  animation: 'fadeUp4 0.8s ease-out both',
                }}
              >
                <span style={{ animation: 'wiggle4 2s ease-in-out infinite' }}>&#9670;</span>
                3D-Printed in India
              </div>

              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6"
                style={{
                  fontFamily: FONT.display,
                  animation: 'fadeUp4 0.8s ease-out 0.15s both',
                }}
              >
                Walls That{' '}
                <span
                  style={{
                    color: C.terracotta,
                    display: 'inline-block',
                    animation: 'scaleIn4 0.8s ease-out 0.4s both',
                  }}
                >
                  Breathe
                </span>
                <br />
                <span style={{ animation: 'fadeUp4 0.8s ease-out 0.5s both', display: 'inline-block' }}>
                  Green
                </span>
              </h1>

              <p
                className="text-base sm:text-lg md:text-xl mb-8 max-w-lg leading-relaxed"
                style={{
                  fontFamily: FONT.body,
                  color: C.clay,
                  animation: 'fadeUp4 0.8s ease-out 0.3s both',
                }}
              >
                Modular self-watering planters, 3D-printed with care. Transform any wall into a living garden.
                Built for Indian homes, crafted by technology.
              </p>

              <div
                className="flex flex-wrap items-center gap-4"
                style={{ animation: 'fadeUp4 0.8s ease-out 0.45s both' }}
              >
                <CTAButton large>
                  Shop Now — Rs. 2,999
                </CTAButton>
                <span
                  className="text-sm font-medium"
                  style={{ color: C.clay, fontFamily: FONT.body }}
                >
                  Free shipping across India
                </span>
              </div>

              {/* Mini stats */}
              <div
                className="flex flex-wrap gap-8 mt-10 pt-8"
                style={{
                  borderTop: `1px solid ${C.sand}`,
                  animation: 'fadeUp4 0.8s ease-out 0.6s both',
                }}
              >
                {[
                  { val: '5,000+', label: 'Happy Homes' },
                  { val: '4.8', label: 'Avg Rating' },
                  { val: '30-Day', label: 'Guarantee' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl sm:text-3xl font-black" style={{ fontFamily: FONT.display, color: C.terracotta }}>
                      {s.val}
                    </div>
                    <div className="text-xs sm:text-sm" style={{ color: C.clay }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Product visual placeholder */}
            <div
              className="relative"
              style={{ animation: 'scaleIn4 1s ease-out 0.3s both' }}
            >
              <div
                className="relative rounded-3xl overflow-hidden aspect-[4/5]"
                style={{
                  background: `linear-gradient(135deg, ${C.sand}, ${C.warmWhite})`,
                  border: `3px solid ${C.sand}`,
                }}
              >
                {/* Arch frame overlay */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 500"
                  fill="none"
                  preserveAspectRatio="none"
                  style={{ animation: 'archPulse4 4s ease-in-out infinite' }}
                >
                  <path
                    d="M50 500V220C50 123.35 123.35 50 220 50H180C276.65 50 350 123.35 350 220V500"
                    stroke={C.terracotta}
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    fill="none"
                  />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-6">
                    <div
                      className="text-6xl sm:text-7xl mb-4"
                      style={{ animation: 'float4 5s ease-in-out infinite' }}
                    >
                      🌿
                    </div>
                    <p
                      className="text-base font-medium"
                      style={{ color: C.clay, fontFamily: FONT.body }}
                    >
                      Product Image
                    </p>
                  </div>
                </div>

                {/* Decorative corner dots */}
                <DotGrid
                  color={C.terracotta}
                  cols={3}
                  rows={3}
                  style={{ position: 'absolute', top: '16px', right: '16px' }}
                />
                <DotGrid
                  color={C.forestLight}
                  cols={3}
                  rows={3}
                  style={{ position: 'absolute', bottom: '16px', left: '16px' }}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-10">
                <SpinBadge text="MADE IN INDIA" size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE STRIP ═══ */}
      <section style={{ background: C.forest }}>
        <div className="py-4 sm:py-5">
          <Marquee speed={20}>
            {['Self-Watering', '3D Printed', 'Modular Design', 'UV Resistant', 'Made in India', 'Easy Install', 'Eco-Friendly', 'Rs. 2,999'].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center mx-6 sm:mx-8 text-sm sm:text-base font-bold uppercase tracking-widest"
                style={{ color: C.cream, fontFamily: FONT.display }}
              >
                <span className="mr-3" style={{ color: C.sienna }}>&#9670;</span>
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-16 sm:py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p
              className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: C.terracotta, fontFamily: FONT.body }}
            >
              Why Planterra
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
              style={{ fontFamily: FONT.display }}
            >
              Engineered for{' '}
              <span style={{ color: C.terracotta }}>Life</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              { icon: '💧', title: 'Self-Watering Reservoir', desc: 'Built-in water reservoir keeps plants hydrated for up to 2 weeks. No daily watering needed.' },
              { icon: '🧩', title: 'Snap-Fit Modular', desc: 'Click modules together to create any configuration. Expand your garden whenever you like.' },
              { icon: '🖨️', title: '3D-Printed Precision', desc: 'Every planter is 3D-printed for perfect fit, zero waste, and consistent quality every time.' },
              { icon: '☀️', title: 'UV-Resistant Material', desc: 'Made from recycled PETG that handles full sun, rain, and Indian summers without fading.' },
              { icon: '🏠', title: 'No-Drill Mounting', desc: 'Adhesive mounting strips or hook-based systems. Zero damage to walls, perfect for renters.' },
              { icon: '🌱', title: 'Plant Care Guide', desc: 'Each kit includes a curated guide for Indian-climate plants that thrive in wall planters.' },
            ].map((f, i) => (
              <FeatureCard key={i} {...f} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY SECTION ═══ */}
      <section id="story">
        <WaveDivider color={C.forest} />
        <div style={{ background: C.forest }} className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
              {/* Left: Image placeholder */}
              <Reveal direction="left">
                <div
                  className="relative rounded-3xl overflow-hidden aspect-square"
                  style={{
                    background: `linear-gradient(135deg, ${C.forestLight}, ${C.forest})`,
                    border: `2px solid ${C.forestLight}`,
                  }}
                >
                  {/* Arch decorative frame */}
                  <svg className="absolute inset-4 w-[calc(100%-32px)] h-[calc(100%-32px)]" viewBox="0 0 300 300" fill="none">
                    <path d="M30 300V150C30 83.73 83.73 30 150 30C216.27 30 270 83.73 270 150V300" stroke={C.terracotta} strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl mb-3" style={{ animation: 'float4 6s ease-in-out infinite' }}>🏭</div>
                      <p className="text-sm" style={{ color: C.clay, fontFamily: FONT.body }}>Our Workshop</p>
                    </div>
                  </div>
                  <TrianglePattern color={C.terracotta} style={{ position: 'absolute', bottom: '16px', right: '16px', opacity: 0.2 }} />
                </div>
              </Reveal>

              {/* Right: Text */}
              <div>
                <Reveal delay={100}>
                  <p
                    className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-4"
                    style={{ color: C.sienna, fontFamily: FONT.body }}
                  >
                    Our Story
                  </p>
                </Reveal>
                <Reveal delay={200}>
                  <h2
                    className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight"
                    style={{ fontFamily: FONT.display, color: C.cream }}
                  >
                    Where Craft Meets{' '}
                    <span style={{ color: C.sienna }}>Code</span>
                  </h2>
                </Reveal>
                <Reveal delay={300}>
                  <p
                    className="text-base sm:text-lg mb-8 leading-relaxed"
                    style={{ fontFamily: FONT.body, color: C.sand, opacity: 0.9 }}
                  >
                    Born in a Bengaluru maker-space, Planterra combines the precision of 3D printing with the warmth
                    of Indian craft tradition. Every planter is printed layer by layer from recycled plastic, designed
                    to bring nature into urban Indian homes without the daily upkeep.
                  </p>
                </Reveal>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6">
                  {[
                    { val: '100%', label: 'Recycled Plastic' },
                    { val: '48hr', label: 'Print Time' },
                    { val: '0', label: 'Waste Target' },
                  ].map((s, i) => (
                    <Reveal key={i} delay={400 + i * 100}>
                      <div
                        className="text-center py-5 sm:py-6 rounded-2xl"
                        style={{ background: `${C.forestLight}` }}
                      >
                        <div
                          className="text-2xl sm:text-3xl font-black mb-1"
                          style={{ fontFamily: FONT.display, color: C.sienna }}
                        >
                          {s.val}
                        </div>
                        <div
                          className="text-xs sm:text-sm"
                          style={{ color: C.sand, fontFamily: FONT.body }}
                        >
                          {s.label}
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <WaveDivider color={C.forest} flip />
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-16 sm:py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14 sm:mb-20">
            <p
              className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: C.terracotta, fontFamily: FONT.body }}
            >
              Simple Setup
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
              style={{ fontFamily: FONT.display }}
            >
              Four Steps to{' '}
              <span style={{ color: C.terracotta }}>Green</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-12 left-[15%] right-[15%] h-0.5"
              style={{ background: `linear-gradient(to right, ${C.sand}, ${C.terracotta}44, ${C.sand})` }}
            />

            {[
              { num: 1, title: 'Unbox', desc: 'Open your Planterra kit with all modules and mounting gear.' },
              { num: 2, title: 'Mount', desc: 'Use adhesive strips or hooks — takes under 10 minutes.' },
              { num: 3, title: 'Plant', desc: 'Add soil and your favorite plants. We include a plant guide.' },
              { num: 4, title: 'Enjoy', desc: 'Fill the reservoir and watch your wall garden thrive.' },
            ].map((s, i) => (
              <StepItem key={i} {...s} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECOND MARQUEE ═══ */}
      <section style={{ background: C.sand }}>
        <div className="py-3 sm:py-4">
          <Marquee speed={30} reverse>
            {['Bengaluru Made', 'Zero Waste', 'Indoor & Outdoor', 'Pet Safe', 'Rust-Proof', 'Lightweight', 'Customizable', 'Gift-Ready'].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center mx-6 sm:mx-8 text-xs sm:text-sm font-bold uppercase tracking-widest"
                style={{ color: C.forest, fontFamily: FONT.display }}
              >
                <span className="mr-3" style={{ color: C.terracotta }}>&#9830;</span>
                {t}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ═══ PRODUCT SHOWCASE ═══ */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: C.warmWhite }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal direction="left">
              <div className="relative">
                {/* Decorative arch frame */}
                <div
                  className="relative rounded-3xl overflow-hidden aspect-[3/4]"
                  style={{
                    background: `linear-gradient(180deg, ${C.sand}88, ${C.cream})`,
                    border: `3px solid ${C.sand}`,
                  }}
                >
                  {/* Inner arch cutout */}
                  <svg className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)]" viewBox="0 0 300 400" fill="none">
                    <path
                      d="M0 400V180C0 80.59 67.16 0 150 0C232.84 0 300 80.59 300 180V400"
                      stroke={C.terracotta}
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      strokeOpacity="0.35"
                      fill="none"
                    />
                  </svg>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl sm:text-7xl mb-3" style={{ animation: 'float4 5s ease-in-out infinite 0.5s' }}>🪴</div>
                      <p className="text-sm font-medium" style={{ color: C.clay, fontFamily: FONT.body }}>Showcase Photo</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 z-10">
                  <SpinBadge text="ECO FRIENDLY" size={72} bg={C.forest} />
                </div>

                <FloatingShape style={{ bottom: '-10px', left: '10%' }} duration={8}>
                  <DotGrid color={C.terracotta} cols={5} rows={2} />
                </FloatingShape>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div>
                <p
                  className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-3"
                  style={{ color: C.terracotta, fontFamily: FONT.body }}
                >
                  The Product
                </p>
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-tight"
                  style={{ fontFamily: FONT.display }}
                >
                  Designed to{' '}
                  <span style={{ color: C.terracotta }}>Last</span>
                </h2>
                <div className="space-y-4 sm:space-y-5">
                  {[
                    { label: 'Material', value: 'Recycled PETG — UV & weather resistant' },
                    { label: 'Capacity', value: '2-week water reservoir per module' },
                    { label: 'Size', value: '15cm x 15cm per module, expandable' },
                    { label: 'Weight', value: '280g per module — ultra lightweight' },
                    { label: 'Colors', value: 'Terracotta, Sage Green, Sand, Charcoal' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-baseline py-3"
                      style={{ borderBottom: `1px solid ${C.sand}` }}
                    >
                      <span className="text-sm font-bold uppercase tracking-wider" style={{ color: C.clay, fontFamily: FONT.body }}>
                        {item.label}
                      </span>
                      <span className="text-sm sm:text-base text-right ml-4" style={{ color: C.forest, fontFamily: FONT.body }}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <CTAButton large>Order Yours Today</CTAButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p
              className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: C.terracotta, fontFamily: FONT.body }}
            >
              Happy Customers
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
              style={{ fontFamily: FONT.display }}
            >
              Wall Gardens,{' '}
              <span style={{ color: C.terracotta }}>Real Stories</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {[
              { name: 'Priya Sharma', location: 'Mumbai', text: 'Transformed my tiny balcony wall into a herb garden. The self-watering feature is a game changer for busy weekdays.', rotate: -2 },
              { name: 'Arjun Reddy', location: 'Hyderabad', text: 'As an architect, I appreciate the modular design. I have 12 modules now and keep expanding. Clean lines, great engineering.', rotate: 1 },
              { name: 'Meera Iyer', location: 'Bengaluru', text: 'Gifted this to my parents. They love not having to water daily. The terracotta color matches their home perfectly.', rotate: -1 },
              { name: 'Rahul Kapoor', location: 'Delhi', text: 'Survived Delhi summer at 45 degrees without any warping. Super durable and the plants are thriving!', rotate: 2 },
            ].map((t, i) => (
              <TestimonialCard key={i} {...t} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing">
        <WaveDivider color={C.forest} />
        <div style={{ background: C.forest }} className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12 sm:mb-16">
              <p
                className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: C.sienna, fontFamily: FONT.body }}
              >
                Simple Pricing
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
                style={{ fontFamily: FONT.display, color: C.cream }}
              >
                One Kit,{' '}
                <span style={{ color: C.sienna }}>Everything Included</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <div
                className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${C.forestLight}, ${C.forest})`,
                  border: `2px solid ${C.forestLight}`,
                }}
              >
                {/* Decorative arch */}
                <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                  <ArchShape color={C.cream} size={200} />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10">
                    <div>
                      <h3
                        className="text-2xl sm:text-3xl font-black mb-2"
                        style={{ fontFamily: FONT.display, color: C.cream }}
                      >
                        Planterra Starter Kit
                      </h3>
                      <p className="text-sm sm:text-base" style={{ color: C.sand, fontFamily: FONT.body }}>
                        4 modules + mounting kit + plant guide
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-4xl sm:text-5xl font-black"
                          style={{ fontFamily: FONT.display, color: C.sienna }}
                        >
                          Rs. 2,999
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm" style={{ color: C.sand }}>Inclusive of all taxes</p>
                    </div>
                  </div>

                  {/* What's included */}
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                    {[
                      '4 Modular Planter Units',
                      'Self-Watering Reservoirs',
                      'No-Drill Mounting Kit',
                      'Curated Plant Guide',
                      'Connector Clips Set',
                      'Drainage Mesh Inserts',
                      'Coco Peat Starter Pack',
                      'Free Shipping Pan-India',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 py-2"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                          style={{ background: C.sienna, color: C.cream }}
                        >
                          &#10003;
                        </div>
                        <span className="text-sm sm:text-base" style={{ color: C.cream, fontFamily: FONT.body }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <CTAButton large>
                      Order Now — Rs. 2,999
                    </CTAButton>
                    <span className="text-sm" style={{ color: C.sand, fontFamily: FONT.body }}>
                      30-day money-back guarantee
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Value comparison */}
            <Reveal delay={400}>
              <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  { label: 'Ceramic Planters', price: 'Rs. 800/each', note: 'No self-watering' },
                  { label: 'Planterra Kit', price: 'Rs. 750/module', note: 'Self-watering + modular', highlight: true },
                  { label: 'Garden Service', price: 'Rs. 5,000+/mo', note: 'Recurring cost' },
                ].map((c, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 sm:p-6 text-center transition-all duration-300"
                    style={{
                      background: c.highlight ? `${C.sienna}22` : `${C.forestLight}`,
                      border: c.highlight ? `2px solid ${C.sienna}` : `1px solid ${C.forestLight}`,
                    }}
                  >
                    <p className="text-xs sm:text-sm font-bold mb-2" style={{ color: C.sand, fontFamily: FONT.body }}>
                      {c.label}
                    </p>
                    <p
                      className="text-lg sm:text-xl font-black"
                      style={{ fontFamily: FONT.display, color: c.highlight ? C.sienna : C.cream }}
                    >
                      {c.price}
                    </p>
                    <p className="text-xs mt-1" style={{ color: C.clay }}>{c.note}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <WaveDivider color={C.forest} flip />
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="py-16 sm:py-24 lg:py-32" style={{ background: C.cream }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16">
            <p
              className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: C.terracotta, fontFamily: FONT.body }}
            >
              Got Questions?
            </p>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black"
              style={{ fontFamily: FONT.display }}
            >
              We Have{' '}
              <span style={{ color: C.terracotta }}>Answers</span>
            </h2>
          </Reveal>

          <div>
            {[
              { q: 'How does the self-watering system work?', a: 'Each module has a built-in reservoir at the base. Water wicks up through a capillary channel to the soil, keeping it consistently moist. A single fill lasts up to 2 weeks depending on plant type and weather.' },
              { q: 'Will this damage my walls?', a: 'No. We include adhesive mounting strips rated for 5kg each, plus hook-based alternatives. Both options are completely damage-free and suitable for rented apartments.' },
              { q: 'What plants work best?', a: 'Our included guide covers 30+ plants ideal for Indian conditions. Money plant, spider plant, jade, and most herbs work wonderfully. We also recommend specific plants based on your wall\'s sunlight exposure.' },
              { q: 'Is it really 3D-printed?', a: 'Yes, every single module is 3D-printed from recycled PETG filament in our Bengaluru facility. This allows precision engineering, zero mold waste, and the ability to improve designs continuously.' },
              { q: 'Can I use it outdoors?', a: 'Absolutely. The PETG material is UV-resistant and weatherproof. It handles full Indian sun, monsoon rain, and temperatures up to 55 degrees Celsius without warping or fading.' },
              { q: 'What if I want more modules later?', a: 'Expansion packs of 2 modules are available for Rs. 1,299. They snap right into your existing setup with the same connector system. Many customers start with 4 and grow to 8-12 modules.' },
              { q: 'What is your return policy?', a: 'We offer a 30-day no-questions-asked money-back guarantee. If you are not happy with your Planterra kit, return it in original condition for a full refund. We cover return shipping costs.' },
            ].map((faq, i) => (
              <FAQItem key={i} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BOLD CTA ═══ */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden" style={{ background: C.terracotta }}>
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            animation: 'grain4 8s steps(10) infinite',
          }}
        />

        {/* Floating decorations */}
        <FloatingShape style={{ top: '10%', left: '5%' }} duration={7}>
          <ArchShape color={C.cream} size={50} style={{ opacity: 0.15 }} />
        </FloatingShape>
        <FloatingShape style={{ top: '20%', right: '8%' }} duration={9} delay={1}>
          <DotGrid color={C.cream} cols={4} rows={4} style={{ opacity: 0.1 }} />
        </FloatingShape>
        <FloatingShape style={{ bottom: '15%', left: '12%' }} duration={6} delay={2}>
          <TrianglePattern color={C.cream} style={{ opacity: 0.1 }} />
        </FloatingShape>
        <FloatingShape style={{ bottom: '20%', right: '6%' }} duration={8} delay={0.5}>
          <ArchShape color={C.cream} size={40} style={{ opacity: 0.12 }} />
        </FloatingShape>

        {/* Big parallax arch */}
        <div
          className="absolute pointer-events-none left-1/2 -translate-x-1/2"
          style={{
            top: '-5%',
            transform: `translateX(-50%) translateY(${scrollY * 0.05}px)`,
            opacity: 0.06,
          }}
        >
          <svg width="600" height="800" viewBox="0 0 600 800" fill="none">
            <path d="M0 800V375C0 167.89 134.31 0 300 0C465.69 0 600 167.89 600 375V800H450V375C450 251.07 383.28 150 300 150C216.72 150 150 251.07 150 375V800H0Z" fill={C.cream} />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight"
              style={{ fontFamily: FONT.display, color: C.cream }}
            >
              Your Walls Are Waiting for Something{' '}
              <span
                className="inline-block"
                style={{
                  color: C.forest,
                  background: C.cream,
                  padding: '0 12px',
                  borderRadius: '8px',
                  transform: 'rotate(-1deg)',
                  display: 'inline-block',
                }}
              >
                Alive
              </span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p
              className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto"
              style={{ color: `${C.cream}cc`, fontFamily: FONT.body }}
            >
              Join thousands of Indian homes growing greener with Planterra. Order today and get free shipping, a
              plant care guide, and our 30-day guarantee.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <CTAButton
              large
              style={{
                background: C.cream,
                color: C.terracotta,
              }}
            >
              Get Planterra — Rs. 2,999
            </CTAButton>
          </Reveal>

          <Reveal delay={450}>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10">
              {['Free Shipping', '30-Day Returns', 'Secure Checkout'].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: `${C.cream}aa`, fontFamily: FONT.body }}
                >
                  <span style={{ color: C.cream }}>&#10003;</span>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: C.forest }} className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3
                className="text-2xl font-black mb-3"
                style={{ fontFamily: FONT.display, color: C.cream }}
              >
                Planterra
                <span style={{ color: C.sienna }}>.</span>
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: C.sand, fontFamily: FONT.body }}>
                3D-printed modular self-watering planters, designed and made in India.
              </p>
              <DotGrid color={C.sienna} cols={6} rows={2} />
            </div>

            {/* Links */}
            {[
              {
                title: 'Product',
                links: ['Features', 'How It Works', 'Pricing', 'Reviews'],
              },
              {
                title: 'Company',
                links: ['Our Story', 'Sustainability', 'Blog', 'Careers'],
              },
              {
                title: 'Support',
                links: ['FAQ', 'Contact Us', 'Shipping Info', 'Returns'],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4
                  className="text-sm font-bold uppercase tracking-widest mb-4"
                  style={{ color: C.sienna, fontFamily: FONT.body }}
                >
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-300 hover:opacity-100"
                        style={{ color: C.sand, opacity: 0.7, fontFamily: FONT.body, textDecoration: 'none' }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: `1px solid ${C.forestLight}` }}
          >
            <p className="text-xs" style={{ color: C.clay, fontFamily: FONT.body }}>
              &copy; 2026 Planterra. Made with care in Bengaluru, India.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Refund Policy'].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="text-xs transition-colors duration-300 hover:opacity-100"
                  style={{ color: C.clay, opacity: 0.7, fontFamily: FONT.body, textDecoration: 'none' }}
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
