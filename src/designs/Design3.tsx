import { useState, useEffect, useRef, useCallback } from 'react'

// ──────────────────────────────────────────────────────
// DESIGN 3: WARM EARTHY ORGANIC — MOBILE-FIRST REWRITE
// Aesop / wabi-sabi artisan craft aesthetic
// Fonts: DM Serif Display + Cormorant Garamond
// Palette: terracotta, sand, olive green, warm cream
// ──────────────────────────────────────────────────────

// ── useInView: scroll-triggered reveal ────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

// ── useScrollY: parallax helper ───────────────────────
function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const handler = () => setY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return y
}

// ── Organic blob SVG ──────────────────────────────────
function OrganicBlob({ className = '', color = '#C4A882' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        fill={color}
        d="M44.7,-76.4C58.8,-69.2,71.8,-58.4,79.6,-44.8C87.4,-31.2,90,-14.8,88.2,0.8C86.4,16.4,80.2,31.2,71.2,43.8C62.2,56.4,50.4,66.8,36.8,73.6C23.2,80.4,7.8,83.6,-6.8,82.2C-21.4,80.8,-35.2,74.8,-47.8,66.2C-60.4,57.6,-71.8,46.4,-78.4,32.8C-85,19.2,-86.8,3.2,-84.2,-11.8C-81.6,-26.8,-74.6,-40.8,-64,-51.6C-53.4,-62.4,-39.2,-70,-25.2,-76.2C-11.2,-82.4,2.6,-87.2,17.2,-85.6C31.8,-84,30.6,-83.6,44.7,-76.4Z"
        transform="translate(100 100)"
      />
    </svg>
  )
}

// ── Linen texture overlay ─────────────────────────────
function LinenTexture() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '256px 256px',
      }}
    />
  )
}

// ── Wavy section divider ──────────────────────────────
function WaveDivider({ flip = false, color = '#F5EDE3' }: { flip?: boolean; color?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-10 sm:h-16 md:h-24">
        <path
          d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}

// ── Marquee strip (organic style) ─────────────────────
function Marquee({ children, speed = 35, reverse = false }: { children: React.ReactNode; speed?: number; reverse?: boolean }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  )
}

// ── Feature card ──────────────────────────────────────
function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
  rotate = 0,
}: {
  icon: React.ReactNode
  title: string
  description: string
  delay?: number
  rotate?: number
}) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `translateY(0) rotate(${rotate}deg) scale(1)`
          : `translateY(40px) rotate(${rotate + 3}deg) scale(0.92)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="bg-[#FAF6F0] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8DDD0] hover:shadow-lg hover:shadow-[#C4A882]/10 transition-all duration-500 group active:scale-[0.98] sm:hover:-translate-y-1">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#C4A882]/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[#C4A882]/30 transition-colors duration-500">
          {icon}
        </div>
        <h3
          className="text-lg sm:text-xl font-semibold text-[#3D2E1F] mb-2 sm:mb-3"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {title}
        </h3>
        <p
          className="text-[#7A6B5D] leading-relaxed text-[15px] sm:text-base"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

// ── Testimonial card ──────────────────────────────────
function TestimonialCard({
  quote,
  name,
  location,
  delay = 0,
  rotate = 0,
}: {
  quote: string
  name: string
  location: string
  delay?: number
  rotate?: number
}) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? `translateY(0) rotate(${rotate}deg)`
          : `translateY(30px) rotate(${rotate + 4}deg) scale(0.9)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="bg-[#FFFCF7] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E8DDD0] relative hover:shadow-md transition-shadow duration-500">
        <div
          className="text-5xl sm:text-6xl text-[#C4A882]/40 absolute -top-2 left-4 sm:left-6 leading-none"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          &ldquo;
        </div>
        <p
          className="text-[#5A4A3A] leading-relaxed text-base sm:text-lg mb-5 sm:mb-6 mt-3 sm:mt-4 italic"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {quote}
        </p>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#C4A882]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[#7A6B5D] text-sm font-medium">{name[0]}</span>
          </div>
          <div>
            <p className="text-[#3D2E1F] font-medium text-sm">{name}</p>
            <p className="text-[#9A8B7D] text-xs">{location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── FAQ accordion item ────────────────────────────────
function FaqItem({ question, answer, delay = 0 }: { question: string; answer: string; delay?: number }) {
  const [open, setOpen] = useState(false)
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className="transition-all duration-500 ease-out border-b border-[#E8DDD0] last:border-b-0"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group cursor-pointer min-h-[56px]"
      >
        <span
          className="text-[#3D2E1F] text-base sm:text-lg md:text-xl pr-6 sm:pr-8 group-hover:text-[#8B5E3C] transition-colors duration-300"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {question}
        </span>
        <span
          className="text-[#C4A882] text-2xl flex-shrink-0 w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-[#C4A882]/10 flex items-center justify-center transition-all duration-500"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ maxHeight: open ? '400px' : '0', opacity: open ? 1 : 0 }}
      >
        <p
          className="text-[#7A6B5D] pb-5 sm:pb-6 leading-relaxed text-[15px] sm:text-base max-w-2xl"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}

// ── How It Works step ─────────────────────────────────
function WateringStep({
  step,
  title,
  description,
  delay = 0,
}: {
  step: number
  title: string
  description: string
  delay?: number
}) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className="flex gap-4 sm:gap-6 items-start transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8B5E3C] flex items-center justify-center flex-shrink-0 text-[#FAF6F0] font-semibold text-base sm:text-lg">
        {step}
      </div>
      <div className="pt-1">
        <h4
          className="text-[#3D2E1F] text-base sm:text-lg font-semibold mb-1.5 sm:mb-2"
          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
        >
          {title}
        </h4>
        <p
          className="text-[#7A6B5D] leading-relaxed text-[15px] sm:text-base"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════

export default function Design3() {
  const scrollY = useScrollY()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)

  useEffect(() => {
    // Load fonts
    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Serif+Display:ital@0;1&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    const onScroll = () => {
      setNavSolid(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.head.removeChild(link)
    }
  }, [])

  const smoothScroll = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: '#F5EDE3',
        color: '#3D2E1F',
      }}
    >
      <LinenTexture />

      {/* ── Keyframes ───────────────────────────── */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(-1.5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gentlePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes leafDrift {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-8px) rotate(4deg) scale(1.02); }
          50% { transform: translateY(-14px) rotate(-2deg) scale(1); }
          75% { transform: translateY(-6px) rotate(3deg) scale(0.98); }
        }
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.06; }
          50% { transform: scale(1.08); opacity: 0.1; }
        }
        @keyframes slideInFromLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
        .animate-float-medium { animation: floatMedium 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-gentle-pulse { animation: gentlePulse 3s ease-in-out infinite; }
        .animate-leaf-drift { animation: leafDrift 10s ease-in-out infinite; }
        .animate-breathe { animation: breathe 6s ease-in-out infinite; }

        /* Selection style */
        ::selection {
          background: #C4A882;
          color: #3D2E1F;
        }
      `}</style>

      {/* ═══════════════════════════════════════════ */}
      {/* NAVIGATION — mobile hamburger first        */}
      {/* ═══════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{
          background: navSolid ? 'rgba(245, 237, 227, 0.93)' : 'transparent',
          backdropFilter: navSolid ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: navSolid ? 'blur(20px)' : 'none',
          borderBottom: navSolid ? '1px solid rgba(196, 168, 130, 0.2)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 cursor-pointer z-50 relative"
          >
            <div className="w-8 h-8 rounded-full bg-[#8B5E3C] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FAF6F0" strokeWidth="2" strokeLinecap="round">
                <path d="M12 3v18M8 7c0 0 4-4 4-4s4 4 4 4M7 13c-1 1-2 3-2 5M17 13c1 1 2 3 2 5M9 15c0 0 3-2 3-2s3 2 3 2" />
              </svg>
            </div>
            <span
              className="text-lg sm:text-xl tracking-wide text-[#3D2E1F]"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
            >
              Planterra
            </span>
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              ['Story', 'story'],
              ['Features', 'features'],
              ['How It Works', 'how-it-works'],
              ['Pricing', 'pricing'],
              ['FAQ', 'faq'],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => smoothScroll(id)}
                className="text-[#7A6B5D] hover:text-[#8B5E3C] transition-colors duration-300 text-sm tracking-wide cursor-pointer relative group"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#8B5E3C] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button
              onClick={() => smoothScroll('pricing')}
              className="bg-[#8B5E3C] text-[#FAF6F0] px-5 lg:px-6 py-2.5 rounded-full text-sm tracking-wide hover:bg-[#7A4F30] transition-all duration-300 hover:shadow-lg hover:shadow-[#8B5E3C]/20 cursor-pointer"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
            >
              Shop Now
            </button>
          </div>

          {/* Mobile hamburger button — 44px touch target */}
          <button
            className="md:hidden w-11 h-11 flex items-center justify-center cursor-pointer z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className="block h-[2px] bg-[#3D2E1F] transition-all duration-300 origin-center"
                style={{
                  transform: mobileMenuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block h-[2px] bg-[#3D2E1F] transition-all duration-300"
                style={{
                  opacity: mobileMenuOpen ? 0 : 1,
                  transform: mobileMenuOpen ? 'translateX(-10px)' : 'none',
                }}
              />
              <span
                className="block h-[2px] bg-[#3D2E1F] transition-all duration-300 origin-center"
                style={{
                  transform: mobileMenuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
                }}
              />
            </div>
          </button>
        </div>

        {/* Mobile fullscreen menu overlay */}
        <div
          className="md:hidden fixed inset-0 z-40 transition-all duration-500"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            background: 'rgba(245, 237, 227, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-2">
            {[
              ['Our Story', 'story'],
              ['Features', 'features'],
              ['How It Works', 'how-it-works'],
              ['Pricing', 'pricing'],
              ['FAQ', 'faq'],
            ].map(([label, id], i) => (
              <button
                key={id}
                onClick={() => smoothScroll(id)}
                className="text-[#3D2E1F] text-2xl py-3 cursor-pointer transition-all duration-500"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: mobileMenuOpen ? 1 : 0,
                  transitionDelay: mobileMenuOpen ? `${i * 80}ms` : '0ms',
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => smoothScroll('pricing')}
              className="mt-6 bg-[#8B5E3C] text-[#FAF6F0] px-10 py-4 rounded-full text-lg tracking-wide cursor-pointer transition-all duration-500 min-h-[48px]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 600,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transitionDelay: mobileMenuOpen ? '400ms' : '0ms',
              }}
            >
              Shop Now
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════ */}
      {/* HERO SECTION                               */}
      {/* ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-24">
        {/* Background organic shapes with parallax */}
        <OrganicBlob
          className="absolute -top-20 -right-20 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] opacity-[0.06] animate-float-slow"
          color="#C4A882"
        />
        <OrganicBlob
          className="absolute -bottom-16 -left-16 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] opacity-[0.04] animate-float-medium"
          color="#8B5E3C"
        />

        {/* Breathing radial accent */}
        <div
          className="absolute inset-0 animate-breathe"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(196, 168, 130, 0.15) 0%, transparent 55%)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 w-full relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center">
            {/* Copy — stacked on mobile, left on desktop */}
            <div>
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
              >
                <span
                  className="inline-block text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Handcrafted in India
                </span>
              </div>

              <h1
                className="animate-fade-in-up text-[2.5rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-7xl mb-5 sm:mb-8"
                style={{
                  fontFamily: "'DM Serif Display', Georgia, serif",
                  animationDelay: '0.4s',
                  animationFillMode: 'both',
                }}
              >
                Where{' '}
                <span className="italic text-[#8B5E3C]">craft</span>
                <br />
                meets{' '}
                <span className="italic text-[#6B7F4A]">nature</span>
              </h1>

              <p
                className="animate-fade-in-up text-base sm:text-lg md:text-xl text-[#7A6B5D] leading-relaxed max-w-md mb-7 sm:mb-10"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 400,
                  animationDelay: '0.6s',
                  animationFillMode: 'both',
                }}
              >
                3D printed self-watering planters, thoughtfully designed to bring
                living walls into your home. Modular, minimal, and made with care.
              </p>

              <div
                className="animate-fade-in-up flex flex-col sm:flex-row gap-3 sm:gap-4"
                style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
              >
                <button
                  onClick={() => smoothScroll('pricing')}
                  className="bg-[#8B5E3C] text-[#FAF6F0] px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg tracking-wide hover:bg-[#7A4F30] transition-all duration-500 hover:shadow-xl hover:shadow-[#8B5E3C]/25 active:scale-[0.97] cursor-pointer min-h-[48px]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Explore the Collection
                </button>
                <button
                  onClick={() => smoothScroll('story')}
                  className="text-[#8B5E3C] px-8 sm:px-10 py-4 rounded-full text-base sm:text-lg tracking-wide border border-[#C4A882] hover:bg-[#8B5E3C]/5 transition-all duration-500 active:scale-[0.97] cursor-pointer min-h-[48px]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
                >
                  Our Story
                </button>
              </div>

              {/* Trust badges */}
              <div
                className="animate-fade-in-up flex items-center gap-4 sm:gap-6 mt-8 sm:mt-12 text-[#9A8B7D] text-xs sm:text-sm"
                style={{ animationDelay: '1s', animationFillMode: 'both' }}
              >
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Eco-friendly PLA
                </span>
                <span className="flex items-center gap-1.5 sm:gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  2-week watering
                </span>
              </div>
            </div>

            {/* Hero image — full-width stacked on mobile */}
            <div
              className="animate-fade-in-up w-full"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <div
                className="rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[3/4] sm:aspect-[4/5] relative"
                style={{
                  background: 'linear-gradient(145deg, #D4C4A8 0%, #C4A882 40%, #A89070 100%)',
                  transform: `translateY(${scrollY * -0.025}px)`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl sm:rounded-[2rem]"
                  style={{ boxShadow: 'inset 0 0 50px rgba(61, 46, 31, 0.12)' }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 sm:p-8 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#FAF6F0]/40 flex items-center justify-center mb-4 sm:mb-6 animate-leaf-drift">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FAF6F0" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 3v18M8 7c0 0 4-4 4-4s4 4 4 4M7 13c-1 1-2 3-2 5M17 13c1 1 2 3 2 5M9 15c0 0 3-2 3-2s3 2 3 2" />
                    </svg>
                  </div>
                  <p
                    className="text-[#FAF6F0]/75 text-sm sm:text-base max-w-[280px] leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    [Hero photograph: A warm, sun-dappled shot of the wooden dowel rail with white 3D-printed planters on a terracotta-toned wall. Trailing pothos and ferns. Soft morning light.]
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-16 sm:h-16 border border-[#FAF6F0]/20 rounded-full" />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 border border-[#FAF6F0]/15 rounded-full" />
              </div>

              {/* Floating accent card */}
              <div
                className="absolute -bottom-3 -left-2 sm:-bottom-6 sm:-left-6 bg-[#FFFCF7] rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl shadow-[#3D2E1F]/5 border border-[#E8DDD0] animate-float-medium"
              >
                <p
                  className="text-[#8B5E3C] text-xs sm:text-sm font-semibold"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Self-watering
                </p>
                <p className="text-[#9A8B7D] text-[10px] sm:text-xs mt-0.5 sm:mt-1">Lasts up to 2 weeks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 animate-gentle-pulse"
          style={{ opacity: Math.max(0, 1 - scrollY / 250) }}
        >
          <span className="text-[#9A8B7D] text-[10px] sm:text-xs tracking-[0.2em] uppercase">Scroll</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A8B7D" strokeWidth="1.5">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* MARQUEE STRIP — social proof ticker         */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="py-3 sm:py-4 border-y overflow-hidden"
        style={{ background: '#EDE4D8', borderColor: '#D8CFC2' }}
      >
        <Marquee speed={30}>
          {['SELF-WATERING', 'WALL-MOUNTED', 'MODULAR', '3D PRINTED', 'MADE IN INDIA', 'ECO-FRIENDLY PLA', 'MINIMAL DESIGN', 'HANDCRAFTED'].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 sm:gap-5 mx-5 sm:mx-8 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600, color: '#8B5E3C' }}
            >
              {t}
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#C4A882]" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* THE STORY SECTION                          */}
      {/* ═══════════════════════════════════════════ */}
      <WaveDivider color="#EDE4D8" />
      <section id="story" className="py-16 sm:py-20 md:py-32 relative" style={{ background: '#EDE4D8' }}>
        <OrganicBlob
          className="absolute top-10 right-0 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] opacity-[0.04]"
          color="#8B5E3C"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
            {/* Image — stacked first on mobile for visual flow */}
            <div className="order-1 md:order-1 w-full">
              {(() => {
                const { ref, isVisible } = useInView()
                return (
                  <div
                    ref={ref}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0) rotate(0deg)' : 'translateX(-30px) rotate(-2deg)',
                    }}
                  >
                    <div
                      className="rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-square relative"
                      style={{
                        background: 'linear-gradient(135deg, #BFA88A 0%, #A89070 50%, #8B7A62 100%)',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl sm:rounded-[2rem]"
                        style={{ boxShadow: 'inset 0 0 50px rgba(61, 46, 31, 0.12)' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 text-center">
                        <p
                          className="text-[#FAF6F0]/70 text-sm sm:text-[15px] leading-relaxed"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          [Founder portrait: Close-up of hands working at a 3D printer, warm workshop lighting. Wood shavings on the table, plants nearby. Artisan at work. Warm, golden tones.]
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>

            {/* Story copy */}
            <div className="order-2 md:order-2">
              {(() => {
                const { ref, isVisible } = useInView()
                return (
                  <div
                    ref={ref}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    }}
                  >
                    <span
                      className="text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 block"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                    >
                      Our Story
                    </span>
                    <h2
                      className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl mb-5 sm:mb-8 leading-tight"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      Born from a love
                      <br />
                      of <span className="italic text-[#6B7F4A]">making things</span>
                    </h2>

                    <div
                      className="space-y-4 sm:space-y-6 text-[#5A4A3A] text-base sm:text-lg leading-relaxed"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      <p>
                        It started in a small Bangalore apartment, with a 3D printer, a collection of
                        dying houseplants, and a stubborn refusal to accept that indoor gardening had to be
                        either ugly or complicated.
                      </p>
                      <p>
                        Every Planterra planter is 3D printed right here in India, layer by careful layer,
                        using plant-based PLA. The wooden dowels are hand-finished. The self-watering
                        wicks are hand-threaded. Each set is assembled, inspected, and packed by the same
                        hands that designed it.
                      </p>
                      <p className="text-[#8B5E3C] font-medium">
                        This is not mass production. This is making.
                      </p>
                    </div>

                    {/* Hand-drawn accent line */}
                    <svg className="mt-6 sm:mt-8 w-32 sm:w-40 h-4" viewBox="0 0 160 16">
                      <path
                        d="M2 8 C 30 2, 50 14, 80 8 S 130 2, 158 8"
                        fill="none"
                        stroke="#C4A882"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ strokeDasharray: 200, animation: 'drawLine 2s ease-out forwards' }}
                      />
                    </svg>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>
      <WaveDivider color="#F5EDE3" flip />

      {/* ═══════════════════════════════════════════ */}
      {/* FEATURES SECTION                           */}
      {/* ═══════════════════════════════════════════ */}
      <section id="features" className="py-16 sm:py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section header */}
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20 transition-all duration-700"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
              >
                <span
                  className="text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 block"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Thoughtfully Designed
                </span>
                <h2
                  className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Crafted for <span className="italic text-[#6B7F4A]">life</span>,
                  <br />
                  designed to <span className="italic text-[#8B5E3C]">grow</span>
                </h2>
                <p className="text-[#7A6B5D] text-base sm:text-lg leading-relaxed px-2">
                  Every detail has been considered, from the curve of each planter
                  to the science behind the self-watering system.
                </p>
              </div>
            )
          })()}

          {/* Feature cards grid — 1 col mobile, 2 col sm, 3 col lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              }
              title="Self-Watering"
              description="A simple cotton-wick system draws water from a hidden reservoir, keeping your plants perfectly hydrated for up to two weeks."
              delay={0}
              rotate={-0.5}
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                </svg>
              }
              title="Modular System"
              description="Start with two planters and grow your living wall over time. Each new planter clips seamlessly onto the wooden dowel rail."
              delay={100}
              rotate={0.5}
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <path d="M12 7v6M9 10h6" />
                </svg>
              }
              title="Wall-Mounted"
              description="Reclaim your desk space and window sills. Planterra turns any wall into a vertical garden with a single mounting point."
              delay={200}
              rotate={-0.3}
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 3c-1.5 0-3 1.5-3 3 0 2 3 4 3 4s3-2 3-4c0-1.5-1.5-3-3-3z" />
                  <path d="M12 10v12" />
                  <path d="M8 14c-2 0-4 1-4 3s2 3 4 3" />
                  <path d="M16 14c2 0 4 1 4 3s-2 3-4 3" />
                </svg>
              }
              title="Eco-Friendly PLA"
              description="3D printed using plant-based PLA filament that is biodegradable and sustainable. Beautiful things should not cost the earth."
              delay={0}
              rotate={0.4}
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 12l3 3 5-5" />
                </svg>
              }
              title="Minimal Aesthetic"
              description="Clean white planters against natural wood. Designed to complement your space, not compete with it. The plants are the star."
              delay={100}
              rotate={-0.6}
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              }
              title="Made with Love"
              description="Each planter is printed, assembled, and packed by hand in our Bangalore studio. Not a factory line in sight. Honest, careful making."
              delay={200}
              rotate={0.3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* PRODUCT SHOWCASE (full-width image section)*/}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-10 sm:py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="rounded-2xl sm:rounded-[2rem] overflow-hidden relative transition-all duration-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'scale(1)' : 'scale(0.97)',
                  background: 'linear-gradient(135deg, #D4C4A8 0%, #B8A48C 30%, #9A8B70 60%, #7A6B55 100%)',
                }}
              >
                <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 80px rgba(61, 46, 31, 0.15)' }} />
                <div className="relative z-10 flex flex-col md:flex-row items-center min-h-[380px] sm:min-h-[420px] md:min-h-[500px]">
                  <div className="p-6 sm:p-10 md:p-16 md:w-1/2">
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl text-[#FAF6F0] mb-4 sm:mb-6"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      A living wall,
                      <br />
                      <span className="italic">layer by layer</span>
                    </h3>
                    <p
                      className="text-[#FAF6F0]/70 text-base sm:text-lg leading-relaxed max-w-md"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      Each planter takes 8 hours to print. Layer upon layer of plant-based PLA,
                      building up into something that will nurture life for years to come.
                      That is the beauty of slow making.
                    </p>
                  </div>
                  <div className="md:w-1/2 p-6 sm:p-10 md:p-16 flex items-center justify-center w-full">
                    <div className="w-full max-w-xs sm:max-w-sm aspect-square rounded-2xl sm:rounded-3xl border-2 border-[#FAF6F0]/15 flex items-center justify-center p-6 sm:p-8">
                      <p
                        className="text-[#FAF6F0]/55 text-center text-sm sm:text-[15px] leading-relaxed"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        [Close-up product photo: The 3D printing layers visible on a planter surface. Macro detail shot showing the craft and texture. Warm studio lighting, shallow depth of field.]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* HOW SELF-WATERING WORKS                    */}
      {/* ═══════════════════════════════════════════ */}
      <WaveDivider color="#EDE4D8" />
      <section id="how-it-works" className="py-16 sm:py-20 md:py-32 relative" style={{ background: '#EDE4D8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
            {/* Steps */}
            <div>
              {(() => {
                const { ref, isVisible } = useInView()
                return (
                  <div
                    ref={ref}
                    className="transition-all duration-700"
                    style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
                  >
                    <span
                      className="text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 block"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                    >
                      Self-Watering System
                    </span>
                    <h2
                      className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-12"
                      style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                    >
                      Water once,
                      <br />
                      <span className="italic text-[#6B7F4A]">relax for weeks</span>
                    </h2>
                  </div>
                )
              })()}

              <div className="space-y-6 sm:space-y-8">
                <WateringStep
                  step={1}
                  title="Fill the reservoir"
                  description="Each planter has a discreet built-in water reservoir. Simply pour water through the top opening until it is full. Takes about 10 seconds."
                  delay={0}
                />
                <WateringStep
                  step={2}
                  title="The wick does the work"
                  description="A natural cotton wick sits between the reservoir and the soil, drawing water upward through capillary action. Steady, gentle, constant hydration."
                  delay={150}
                />
                <WateringStep
                  step={3}
                  title="Plants stay happy"
                  description="Your plants receive exactly the moisture they need, when they need it. No overwatering, no underwatering. Just thriving, happy greenery for up to two weeks."
                  delay={300}
                />
              </div>
            </div>

            {/* Diagram placeholder */}
            <div className="w-full">
              {(() => {
                const { ref, isVisible } = useInView()
                return (
                  <div
                    ref={ref}
                    className="transition-all duration-1000 ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0) rotate(0deg)' : 'translateX(30px) rotate(2deg)',
                    }}
                  >
                    <div
                      className="rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[4/5] relative"
                      style={{
                        background: 'linear-gradient(160deg, #C8B898 0%, #A89878 50%, #8B7B60 100%)',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl sm:rounded-[2rem]"
                        style={{ boxShadow: 'inset 0 0 50px rgba(61, 46, 31, 0.1)' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10 text-center">
                        <p
                          className="text-[#FAF6F0]/65 text-sm sm:text-[15px] leading-relaxed max-w-[280px]"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          [Diagram: Cross-section of the planter showing the water reservoir at the bottom, the cotton wick drawing water up into the soil, and a healthy plant growing above. Hand-drawn style, warm earth tones.]
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>
      <WaveDivider color="#F5EDE3" flip />

      {/* ═══════════════════════════════════════════ */}
      {/* TESTIMONIALS                               */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
        <OrganicBlob
          className="absolute -bottom-16 right-0 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] opacity-[0.04]"
          color="#6B7F4A"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section header */}
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20 transition-all duration-700"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
              >
                <span
                  className="text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 block"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Kind Words
                </span>
                <h2
                  className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Loved by <span className="italic text-[#6B7F4A]">plant people</span>
                </h2>
              </div>
            )
          })()}

          {/* Testimonial cards — 1 col mobile, 3 col desktop with tilts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <TestimonialCard
              quote="I have killed every plant I have ever owned. It has been three months with Planterra and my pothos is actually thriving. The self-watering system is genuinely magic."
              name="Priya Sharma"
              location="Mumbai"
              delay={0}
              rotate={-0.8}
            />
            <TestimonialCard
              quote="The quality is incredible. You can feel the care that went into making this. It is the most beautiful thing on my wall, and I say that as someone with actual art up there."
              name="Arjun Mehta"
              location="Bangalore"
              delay={150}
              rotate={0.5}
            />
            <TestimonialCard
              quote="Started with the starter kit six months ago. Now I have eight planters running down my hallway wall. It has become my favourite corner of the house. Visitors always stop and stare."
              name="Kavya Reddy"
              location="Hyderabad"
              delay={300}
              rotate={-0.6}
            />
          </div>

          {/* Star rating */}
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="text-center mt-8 sm:mt-12 transition-all duration-700"
                style={{ opacity: isVisible ? 1 : 0 }}
              >
                <div className="flex items-center justify-center gap-1 mb-2 sm:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#C4A882" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#9A8B7D] text-xs sm:text-sm">
                  4.9 out of 5 from 200+ happy plant parents
                </p>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* REVERSE MARQUEE — feature highlights        */}
      {/* ═══════════════════════════════════════════ */}
      <div
        className="py-3 sm:py-4 border-y overflow-hidden"
        style={{ background: '#8B5E3C', borderColor: '#A37046' }}
      >
        <Marquee speed={25} reverse>
          {['WATER ONCE', 'FORGET 2 WEEKS', 'ADD MORE ANYTIME', 'ECO-FRIENDLY', 'HANDCRAFTED', 'MADE IN BANGALORE', 'PLANT PARENT APPROVED', 'ZERO EFFORT'].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 sm:gap-5 mx-5 sm:mx-8 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500, color: '#FAF6F0' }}
            >
              {t}
              <span className="w-1.5 h-1.5 rounded-full inline-block bg-[#C4A882]" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* PRICING SECTION                            */}
      {/* ═══════════════════════════════════════════ */}
      <WaveDivider color="#EDE4D8" />
      <section id="pricing" className="py-16 sm:py-20 md:py-32 relative" style={{ background: '#EDE4D8' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section header */}
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20 transition-all duration-700"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
              >
                <span
                  className="text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 block"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Bring It Home
                </span>
                <h2
                  className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Begin your <span className="italic text-[#6B7F4A]">living wall</span>
                </h2>
                <p className="text-[#7A6B5D] text-base sm:text-lg px-2">
                  Everything you need to start. Add more planters anytime.
                </p>
              </div>
            )
          })()}

          {/* Pricing card */}
          <div className="max-w-lg mx-auto">
            {(() => {
              const { ref, isVisible } = useInView()
              return (
                <div
                  ref={ref}
                  className="transition-all duration-700"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
                  }}
                >
                  <div className="bg-[#FFFCF7] rounded-2xl sm:rounded-[2rem] p-6 sm:p-10 md:p-12 border border-[#E8DDD0] relative overflow-hidden hover:shadow-2xl hover:shadow-[#C4A882]/10 transition-all duration-500">
                    {/* Decorative corner blob */}
                    <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-[0.06]">
                      <OrganicBlob color="#8B5E3C" className="w-full h-full" />
                    </div>

                    <div className="text-center relative z-10">
                      <span
                        className="inline-block bg-[#6B7F4A]/10 text-[#6B7F4A] text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 sm:mb-6 tracking-wide"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                      >
                        Starter Kit
                      </span>

                      <h3
                        className="text-xl sm:text-2xl md:text-3xl mb-2"
                        style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                      >
                        The Planterra Set
                      </h3>

                      <div className="flex items-baseline justify-center gap-2 mb-6 sm:mb-8">
                        <span
                          className="text-4xl sm:text-5xl md:text-6xl text-[#8B5E3C]"
                          style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                        >
                          &#8377;2,999
                        </span>
                      </div>

                      <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-left max-w-xs mx-auto">
                        {[
                          '2 self-watering planters (white)',
                          '1 wooden dowel rail (hand-finished)',
                          'Wall mounting hardware included',
                          'Cotton wicks pre-installed',
                          'Care guide & plant suggestions',
                          'Free shipping across India',
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2.5 sm:gap-3">
                            <div className="w-5 h-5 rounded-full bg-[#6B7F4A]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6B7F4A" strokeWidth="3">
                                <path d="M5 12l5 5L20 7" />
                              </svg>
                            </div>
                            <span className="text-[#5A4A3A] text-sm sm:text-[15px]">{item}</span>
                          </div>
                        ))}
                      </div>

                      <button className="w-full bg-[#8B5E3C] text-[#FAF6F0] py-4 rounded-full text-base sm:text-lg tracking-wide hover:bg-[#7A4F30] transition-all duration-500 hover:shadow-xl hover:shadow-[#8B5E3C]/25 active:scale-[0.97] cursor-pointer min-h-[52px]"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                      >
                        Order Your Set
                      </button>

                      <p className="text-[#9A8B7D] text-xs sm:text-sm mt-3 sm:mt-4">
                        Ships in 5-7 business days. Made to order.
                      </p>
                    </div>
                  </div>

                  {/* Add-on note */}
                  <div className="text-center mt-6 sm:mt-8">
                    <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-[#FFFCF7] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 border border-[#E8DDD0]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" className="flex-shrink-0">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v8M8 12h8" />
                      </svg>
                      <span className="text-[#5A4A3A] text-xs sm:text-sm">
                        Add extra planters anytime for <strong className="text-[#8B5E3C]">&#8377;899 each</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      </section>
      <WaveDivider color="#F5EDE3" flip />

      {/* ═══════════════════════════════════════════ */}
      {/* FAQ SECTION                                */}
      {/* ═══════════════════════════════════════════ */}
      <section id="faq" className="py-16 sm:py-20 md:py-32 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Section header */}
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="text-center mb-10 sm:mb-16 transition-all duration-700"
                style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(30px)' }}
              >
                <span
                  className="text-[#8B5E3C] text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-3 sm:mb-4 block"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Questions & Answers
                </span>
                <h2
                  className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Curious? <span className="italic text-[#8B5E3C]">We love that.</span>
                </h2>
              </div>
            )
          })()}

          <div className="bg-[#FFFCF7] rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-[#E8DDD0]">
            <FaqItem
              question="What plants work best with Planterra?"
              answer="Most small to medium indoor plants thrive in our planters. We especially recommend pothos, philodendrons, spider plants, small ferns, and herbs like mint and basil. Basically anything that likes consistent moisture and indirect light. We include a detailed plant guide with every order."
              delay={0}
            />
            <FaqItem
              question="How does the self-watering system actually work?"
              answer="It uses a centuries-old principle called capillary action. A natural cotton wick sits between a water reservoir at the bottom of the planter and the soil above. The wick draws water upward steadily, delivering moisture to the roots exactly when they need it. Fill the reservoir, and your plant stays hydrated for up to two weeks."
              delay={80}
            />
            <FaqItem
              question="Is it hard to mount on the wall?"
              answer="Not at all. Each set comes with a simple mounting bracket and screws. You drill two holes, fix the bracket, and hang the wooden dowel. The planters clip on magnetically. The whole setup takes about 10 minutes. We include a step-by-step guide with photos."
              delay={160}
            />
            <FaqItem
              question="What is PLA and is it safe for plants?"
              answer="PLA (polylactic acid) is a bioplastic made from fermented plant starch, typically corn. It is non-toxic, biodegradable, and completely safe for plants and food. It is one of the most environmentally friendly materials available for 3D printing."
              delay={240}
            />
            <FaqItem
              question="Can I add more planters later?"
              answer="Absolutely, that is the whole idea. The modular design means you can add individual planters to your existing dowel rail at any time. Each additional planter is available for Rs. 899. Start small, grow tall."
              delay={320}
            />
            <FaqItem
              question="Do you ship across India?"
              answer="Yes, we ship anywhere in India. Shipping is free on the starter kit. Individual add-on planters ship for a flat Rs. 99. Most orders arrive within 5-7 business days, as each set is made to order just for you."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FINAL CTA SECTION                          */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 md:py-32 relative overflow-hidden">
        <OrganicBlob
          className="absolute -top-16 -left-16 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] opacity-[0.04] animate-float-slow"
          color="#8B5E3C"
        />
        <OrganicBlob
          className="absolute -bottom-16 -right-16 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] opacity-[0.04] animate-float-medium"
          color="#6B7F4A"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 text-center relative z-10">
          {(() => {
            const { ref, isVisible } = useInView()
            return (
              <div
                ref={ref}
                className="transition-all duration-1000"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                }}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8B5E3C]/10 flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-leaf-drift">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5E3C" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 3c-1.5 0-3 1.5-3 3 0 2 3 4 3 4s3-2 3-4c0-1.5-1.5-3-3-3z" />
                    <path d="M12 10v12" />
                    <path d="M8 14c-2 0-4 1-4 3s2 3 4 3" />
                    <path d="M16 14c2 0 4 1 4 3s-2 3-4 3" />
                  </svg>
                </div>

                <h2
                  className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl mb-5 sm:mb-8 leading-tight"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Your walls are waiting
                  <br />
                  to come <span className="italic text-[#6B7F4A]">alive</span>
                </h2>

                <p className="text-[#7A6B5D] text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 px-2">
                  Every Planterra is made to order, with the same care you would give your own home.
                  Start your living wall today.
                </p>

                <button
                  onClick={() => smoothScroll('pricing')}
                  className="bg-[#8B5E3C] text-[#FAF6F0] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg md:text-xl tracking-wide hover:bg-[#7A4F30] transition-all duration-500 hover:shadow-2xl hover:shadow-[#8B5E3C]/30 active:scale-[0.97] cursor-pointer min-h-[52px]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  Explore the Collection
                </button>

                <p className="text-[#9A8B7D] text-xs sm:text-sm mt-5 sm:mt-6">
                  Free shipping across India &middot; Made with care in Bangalore
                </p>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/* FOOTER                                     */}
      {/* ═══════════════════════════════════════════ */}
      <footer className="border-t border-[#E8DDD0] py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-8 mb-12 sm:mb-16">
            {/* Brand column */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="w-8 h-8 rounded-full bg-[#8B5E3C] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FAF6F0" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 3v18M8 7c0 0 4-4 4-4s4 4 4 4M7 13c-1 1-2 3-2 5M17 13c1 1 2 3 2 5M9 15c0 0 3-2 3-2s3 2 3 2" />
                  </svg>
                </div>
                <span
                  className="text-lg sm:text-xl tracking-wide"
                  style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}
                >
                  Planterra
                </span>
              </div>
              <p
                className="text-[#7A6B5D] leading-relaxed max-w-sm mb-5 sm:mb-6 text-sm sm:text-base"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Handcrafted 3D printed self-watering planters, designed and made with care
                in Bangalore, India. Where craft meets nature.
              </p>
              <div className="flex gap-3 sm:gap-4">
                {['Instagram', 'Twitter', 'Pinterest'].map((social) => (
                  <span
                    key={social}
                    className="w-10 h-10 sm:w-10 sm:h-10 rounded-full bg-[#EDE4D8] flex items-center justify-center text-[#7A6B5D] hover:bg-[#C4A882] hover:text-[#FAF6F0] transition-all duration-300 cursor-pointer text-xs min-w-[44px] min-h-[44px]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                  >
                    {social[0]}
                  </span>
                ))}
              </div>
            </div>

            {/* Explore links */}
            <div>
              <h4
                className="text-[#3D2E1F] font-semibold mb-3 sm:mb-4 text-xs sm:text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Explore
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  ['Our Story', 'story'],
                  ['The Product', 'features'],
                  ['How It Works', 'how-it-works'],
                  ['Pricing', 'pricing'],
                  ['FAQ', 'faq'],
                ].map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => smoothScroll(id)}
                    className="block text-[#7A6B5D] hover:text-[#8B5E3C] transition-colors duration-300 text-sm cursor-pointer min-h-[44px] sm:min-h-0 flex items-center"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Support links */}
            <div>
              <h4
                className="text-[#3D2E1F] font-semibold mb-3 sm:mb-4 text-xs sm:text-sm tracking-wider uppercase"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Support
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {['Contact Us', 'Shipping Info', 'Returns', 'Care Guide', 'Plant Tips'].map((item) => (
                  <button
                    key={item}
                    className="block text-[#7A6B5D] hover:text-[#8B5E3C] transition-colors duration-300 text-sm cursor-pointer min-h-[44px] sm:min-h-0 flex items-center"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#E8DDD0] pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[#9A8B7D] text-xs sm:text-sm text-center sm:text-left">
              &copy; 2026 Planterra. Handcrafted with care.
            </p>
            <p className="text-[#9A8B7D] text-[10px] sm:text-xs">
              Made to order in Bangalore, India
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
