import { useState, useEffect, useRef, useCallback } from "react";

// ─── Editorial Botanical — Mobile-First Rebuild ───
// Kinfolk & Cereal magazine aesthetic, rebuilt from 375px up.
// Playfair Display + DM Sans, muted earth tones, generous whitespace.
// Scroll-triggered reveals, staggered animations, marquee strips,
// parallax effects, and tilting card entrances.

const fontLink = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
`;

// ─── Palette ───
const p = {
  cream: "#F5F0EB",
  sage: "#8B9A7E",
  sageDark: "#6B7D5E",
  warmStone: "#C4B5A4",
  sand: "#E8DDD1",
  charcoal: "#2C2C2C",
  espresso: "#3D3228",
  linen: "#FAF7F4",
  moss: "#5A6B4F",
  terracotta: "#B87355",
};

// ─── CSS Keyframe Animations ───
const keyframes = `
@keyframes scrollPulse {
  0%, 100% { opacity: 0.4; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.3); }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(2deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
html { scroll-behavior: smooth; }
::selection { background-color: ${p.sage}44; color: ${p.charcoal}; }
* { -webkit-tap-highlight-color: transparent; }
`;

// ─── Hooks ───

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrollY;
}

// ─── Reveal Component ───
function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade" | "scale" | "tilt";
  style?: React.CSSProperties;
}) {
  const { ref, isVisible } = useInView(0.1);
  const transforms: Record<string, string> = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    fade: "translateY(0)",
    scale: "scale(0.92)",
    tilt: "perspective(800px) rotateY(8deg) rotateX(4deg)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0,0) scale(1) perspective(800px) rotateY(0deg) rotateX(0deg)" : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Image Placeholder ───
function ImagePlaceholder({
  description,
  aspect = "4/5",
  bg = p.sand,
  className = "",
}: {
  description: string;
  aspect?: string;
  bg?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: aspect, backgroundColor: bg }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <p
          className="text-center text-xs sm:text-sm leading-relaxed max-w-xs"
          style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.5 }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Decorative Rule ───
function EditorialRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} style={{ color: p.warmStone }}>
      <div className="flex-1 h-px" style={{ backgroundColor: p.warmStone, opacity: 0.3 }} />
      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
        <circle cx="4" cy="4" r="3" />
      </svg>
      <div className="flex-1 h-px" style={{ backgroundColor: p.warmStone, opacity: 0.3 }} />
    </div>
  );
}

// ─── Marquee Strip ───
function MarqueeStrip({
  items,
  speed = 30,
  bg = p.sage,
  color = p.linen,
  className = "",
}: {
  items: string[];
  speed?: number;
  bg?: string;
  color?: string;
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ backgroundColor: bg }}
    >
      <div
        className="inline-flex py-3 sm:py-4"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-4 sm:mx-8 text-xs sm:text-sm tracking-[0.2em] uppercase inline-flex items-center gap-4 sm:gap-8"
            style={{ fontFamily: "'DM Sans', sans-serif", color }}
          >
            {item}
            <span style={{ opacity: 0.4 }}>&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Navigation ───
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = ["Story", "Features", "How It Works", "Reviews", "Pricing"];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        backgroundColor: scrolled || menuOpen ? `${p.linen}ee` : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${p.warmStone}33` : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16 lg:h-20">
        {/* Logo */}
        <a
          href="#top"
          className="tracking-[0.25em] uppercase text-xs font-medium transition-colors duration-300 z-50"
          style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso }}
          onClick={() => setMenuOpen(false)}
        >
          Planterra
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#pricing"
          className="hidden md:inline-block text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-500 hover:tracking-[0.25em]"
          style={{ fontFamily: "'DM Sans', sans-serif", color: p.linen, backgroundColor: p.espresso }}
        >
          Shop Now
        </a>

        {/* Hamburger Button - Mobile */}
        <button
          className="md:hidden z-50 flex flex-col justify-center items-center gap-1.5 w-11 h-11"
          style={{ background: "none", border: "none" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: p.espresso,
              transform: menuOpen ? "rotate(45deg) translateY(4px)" : "none",
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: p.espresso,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              backgroundColor: p.espresso,
              transform: menuOpen ? "rotate(-45deg) translateY(-4px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className="md:hidden fixed inset-0 top-14 flex flex-col items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: p.linen,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-2xl tracking-[0.1em] transition-all duration-300"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: p.charcoal,
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + i * 0.06}s`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#pricing"
            className="mt-4 text-sm tracking-[0.2em] uppercase px-8 py-4 min-h-[48px] flex items-center"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: p.linen,
              backgroundColor: p.espresso,
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.4s ease ${0.5}s`,
            }}
            onClick={() => setMenuOpen(false)}
          >
            Shop Now
          </a>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───
function Hero() {
  const [loaded, setLoaded] = useState(false);
  const scrollY = useScrollY();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: p.cream }}
    >
      {/* Parallax botanical dot pattern */}
      <div
        className="absolute top-0 right-0 w-3/4 sm:w-1/2 h-full opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 70% 30%, ${p.sage} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Floating decorative circle */}
      <div
        className="absolute top-24 right-8 sm:top-32 sm:right-16 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-[0.06]"
        style={{
          border: `1px solid ${p.sage}`,
          animation: "floatSlow 6s ease-in-out infinite",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-24">
        {/* Mobile: stacked layout. Desktop: side-by-side */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 lg:items-end">
          {/* Text column */}
          <div className="lg:col-span-7 pt-24 sm:pt-28 lg:pt-40">
            <div
              className="mb-5 sm:mb-8"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s",
              }}
            >
              <span
                className="text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
              >
                Self-Watering Wall Planters
              </span>
            </div>

            <h1
              className="leading-[0.9] mb-6 sm:mb-8"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: p.charcoal,
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(40px)",
                transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s",
              }}
            >
              <span className="block text-[clamp(2.5rem,10vw,6rem)] lg:text-8xl">Walls</span>
              <span
                className="block text-[clamp(2.5rem,10vw,6rem)] lg:text-8xl italic"
                style={{ color: p.sage }}
              >
                that grow
              </span>
              <span className="block text-[clamp(2.5rem,10vw,6rem)] lg:text-8xl">with you.</span>
            </h1>

            <div
              className="max-w-md"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(30px)",
                transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s",
              }}
            >
              <p
                className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.7 }}
              >
                3D printed modular planters that mount to your wall, self-water
                for two weeks, and let you grow your collection one planter at a
                time.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-3 px-7 py-4 min-h-[48px] text-sm tracking-[0.15em] uppercase transition-all duration-500 hover:tracking-[0.25em]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: p.espresso,
                    color: p.linen,
                  }}
                >
                  <span>Explore</span>
                  <span className="inline-block transition-transform duration-500 hover:translate-x-1">&rarr;</span>
                </a>
                <span
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
                >
                  From Rs. 2,999
                </span>
              </div>
            </div>
          </div>

          {/* Image column - full width on mobile, 5-col on desktop */}
          <div
            className="mt-10 lg:mt-0 lg:col-span-5"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(60px)",
              transition: "all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s",
            }}
          >
            <ImagePlaceholder
              description="Hero shot: Single wooden dowel rail with two white 3D-printed planters on a warm cream wall. Trailing pothos cascading from top planter, small succulent in bottom. Soft morning light from left window casting gentle shadow. Lifestyle setting with linen curtain edge visible."
              aspect="3/4"
              bg={p.sand}
              className="w-full"
            />
            <p
              className="mt-3 text-[10px] tracking-[0.2em] uppercase text-right"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
            >
              The Planterra System &mdash; Starter Kit
            </p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1.5s ease 1.5s" }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
        >
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: `linear-gradient(to bottom, ${p.warmStone}, transparent)`,
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}

// ─── Marquee Social Proof Strip ───
function SocialProofStrip() {
  return (
    <MarqueeStrip
      items={[
        "Self-Watering",
        "Wall-Mounted",
        "3D Printed in India",
        "Modular Design",
        "14-Day Reservoir",
        "Plant-Based PLA",
        "500+ Happy Homes",
        "Free Shipping",
      ]}
      speed={35}
      bg={p.espresso}
      color={p.cream}
    />
  );
}

// ─── Story Section ───
function StorySection() {
  const scrollY = useScrollY();

  return (
    <section id="story" className="py-16 sm:py-24 lg:py-40 overflow-hidden" style={{ backgroundColor: p.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <EditorialRule className="mb-12 sm:mb-16 lg:mb-24 max-w-lg mx-auto" />
        </Reveal>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center gap-10">
          {/* Image with parallax */}
          <div className="lg:col-span-5 lg:col-start-1">
            <Reveal direction="left" delay={0.1}>
              <div
                className="lg:-ml-8"
                style={{ transform: `translateY(${scrollY * 0.03}px)` }}
              >
                <ImagePlaceholder
                  description="Close-up detail shot: Hands gently placing a small fern into a white 3D-printed planter. The planter's internal water reservoir is visible, showing the self-watering wick system. Soft, diffused natural light. Shot on warm stone countertop."
                  aspect="4/5"
                  bg={p.sand}
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 lg:col-start-7">
            <Reveal direction="right" delay={0.2}>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
              >
                Our Story
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-5xl leading-[1.1] mb-6 sm:mb-8"
                style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
              >
                Born from a love of plants{" "}
                <span className="italic" style={{ color: p.sage }}>
                  and impatience
                </span>{" "}
                with watering.
              </h2>
              <div
                className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.7 }}
              >
                <p>
                  We kept killing our plants. Not from neglect, exactly, but from
                  the chaos of daily life in a small Indian apartment. No balcony.
                  No window sills left. And watering? Always forgotten.
                </p>
                <p>
                  So we designed something better. A modular, wall-mounted planter
                  system that waters itself, grows with you, and turns any wall
                  into a living garden. Crafted in India with 3D printing
                  technology and sustainable materials.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Features ───
function FeaturesSection() {
  const features = [
    {
      number: "01",
      title: "Self-Watering",
      subtitle: "Two weeks of freedom",
      description:
        "An integrated reservoir and capillary wick system delivers water directly to roots. Fill it once, forget for fourteen days. Your plants thrive even when you travel.",
      image:
        "Diagram-style shot: Cross-section view of the planter showing the water reservoir below, the wick threading up through soil to roots. Clean white background, technical illustration feel with soft shadows.",
    },
    {
      number: "02",
      title: "Wall-Mounted",
      subtitle: "Reclaim your surfaces",
      description:
        "A single wooden dowel rail mounts flush to your wall. Planters clip on and off in seconds. No drill holes per planter. No shelf space sacrificed. Your desk stays yours.",
      image:
        "Lifestyle shot: Three planters on a wooden dowel rail in a minimal home office. The desk below is clean and uncluttered. A laptop and coffee cup on the desk. Warm afternoon light. The wall is painted in a soft warm white.",
    },
    {
      number: "03",
      title: "Modular",
      subtitle: "Grow your collection",
      description:
        "Start with two planters. Add more whenever the mood strikes. Each planter clicks onto the same dowel rail. Rearrange freely. Your wall garden evolves with your life.",
      image:
        "Flat-lay style: Multiple white planters arranged in different configurations around a single dowel rail. Some with plants, some empty. Overhead shot on a linen background. Demonstrates the modular, mix-and-match nature of the system.",
    },
    {
      number: "04",
      title: "3D Printed",
      subtitle: "Precision meets personality",
      description:
        "Every planter is 3D printed in India using plant-based PLA. This means zero injection-mold waste, precise tolerances for a perfect clip fit, and the ability to introduce new shapes and sizes with every season.",
      image:
        "Detail macro shot: Close-up of the 3D printed planter surface showing the fine layer lines that give it texture and character. The white planter is on a warm stone surface with a sprig of dried eucalyptus beside it. Studio lighting.",
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: p.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12 sm:mb-20 lg:mb-32">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
            >
              Why Planterra
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
            >
              Four reasons to <br />
              <span className="italic" style={{ color: p.sage }}>
                rethink your walls.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="space-y-16 sm:space-y-24 lg:space-y-48">
          {features.map((f, i) => (
            <div
              key={f.number}
              className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center gap-6"
            >
              {/* Image - on mobile always on top, on desktop alternates */}
              <div
                className={`lg:col-span-6 ${
                  i % 2 === 1 ? "lg:col-start-7 lg:order-2" : "lg:col-start-1"
                }`}
              >
                <Reveal direction={i % 2 === 0 ? "left" : "right"} delay={0.1}>
                  <ImagePlaceholder
                    description={f.image}
                    aspect="4/5"
                    bg={i % 2 === 0 ? p.sand : `${p.sage}22`}
                    className="w-full"
                  />
                </Reveal>
              </div>

              {/* Text */}
              <div
                className={`lg:col-span-5 ${
                  i % 2 === 1 ? "lg:col-start-1 lg:order-1" : "lg:col-start-8"
                }`}
              >
                <Reveal direction={i % 2 === 0 ? "right" : "left"} delay={0.25}>
                  <span
                    className="text-5xl sm:text-6xl lg:text-7xl font-light block mb-2 sm:mb-4"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: p.warmStone,
                      opacity: 0.3,
                    }}
                  >
                    {f.number}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl mb-2"
                    style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-xs sm:text-sm tracking-[0.1em] uppercase mb-4 sm:mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
                  >
                    {f.subtitle}
                  </p>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.7 }}
                  >
                    {f.description}
                  </p>
                  <div className="mt-6 sm:mt-8 w-12 h-px" style={{ backgroundColor: p.sage }} />
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Feature Marquee Strip ───
function FeatureMarquee() {
  return (
    <MarqueeStrip
      items={[
        "14-Day Self-Watering",
        "No Shelf Space Needed",
        "Start Small, Grow Big",
        "Sustainable PLA",
        "Made in India",
        "Zero Waste Manufacturing",
      ]}
      speed={40}
      bg={p.sage}
      color={p.cream}
    />
  );
}

// ─── How It Works ───
function HowItWorksSection() {
  const scrollY = useScrollY();

  const steps = [
    {
      step: "I",
      title: "Mount the Rail",
      description:
        "Drill two screws into your wall. Slide the wooden dowel rail onto the brackets. Done in under five minutes. Works on concrete, brick, or drywall.",
    },
    {
      step: "II",
      title: "Clip On Your Planters",
      description:
        "Each 3D printed planter has an integrated clip mechanism. Slide it onto the rail at any position. It locks with a satisfying click. No tools needed.",
    },
    {
      step: "III",
      title: "Plant & Fill",
      description:
        "Add soil, place your plant, and fill the water reservoir through the side port. The capillary wick does the rest. Your plant stays hydrated for up to 14 days.",
    },
    {
      step: "IV",
      title: "Expand Over Time",
      description:
        "When you are ready for more green, simply clip additional planters onto the same rail. Mix sizes and heights. Create your own living wall, one planter at a time.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: p.espresso }}
    >
      {/* Decorative circles with parallax */}
      <div
        className="absolute top-12 sm:top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 rounded-full opacity-[0.04]"
        style={{
          border: `1px solid ${p.cream}`,
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />
      <div
        className="absolute bottom-12 sm:bottom-20 right-4 sm:right-10 w-48 sm:w-96 h-48 sm:h-96 rounded-full opacity-[0.03]"
        style={{
          border: `1px solid ${p.cream}`,
          animation: "spinSlow 60s linear infinite",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <Reveal>
          <div className="text-center mb-12 sm:mb-20 lg:mb-28">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
            >
              Simple by Design
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: "'Playfair Display', serif", color: p.cream }}
            >
              Set up in minutes.
              <br />
              <span className="italic" style={{ color: p.sage }}>
                Enjoy for years.
              </span>
            </h2>
          </div>
        </Reveal>

        {/* Steps - vertical stack on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Desktop connecting line */}
          <div
            className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: `${p.warmStone}33` }}
          />

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-10 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.12} direction="tilt">
                <div className="text-center relative flex flex-col items-center">
                  {/* Step circle */}
                  <div
                    className="w-12 h-12 rounded-full mb-6 sm:mb-8 flex items-center justify-center text-sm relative z-10"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      border: `1px solid ${p.sage}`,
                      color: p.sage,
                      backgroundColor: p.espresso,
                    }}
                  >
                    {s.step}
                  </div>
                  <h3
                    className="text-xl sm:text-2xl mb-3 sm:mb-4"
                    style={{ fontFamily: "'Playfair Display', serif", color: p.cream }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed max-w-xs mx-auto"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.8 }}
                  >
                    {s.description}
                  </p>

                  {/* Mobile connecting line between steps */}
                  {i < steps.length - 1 && (
                    <div
                      className="lg:hidden w-px h-8 mt-8"
                      style={{ backgroundColor: `${p.warmStone}33` }}
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Step images - scrollable on mobile, 3-col on desktop */}
        <Reveal delay={0.3}>
          <div className="mt-12 sm:mt-20 lg:mt-28 flex gap-3 sm:gap-4 overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-3 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[75vw] sm:min-w-0 snap-center">
              <ImagePlaceholder
                description="Step photo: Hands holding the wooden dowel rail against a cream wall, pencil marks visible for drill points. Clean, instructional feel."
                aspect="16/9"
                bg={`${p.warmStone}33`}
                className="w-full"
              />
            </div>
            <div className="min-w-[75vw] sm:min-w-0 snap-center">
              <ImagePlaceholder
                description="Step photo: Close-up of a white planter being clipped onto the wooden rail. The clip mechanism is visible. Fingers guiding it into place."
                aspect="16/9"
                bg={`${p.warmStone}33`}
                className="w-full"
              />
            </div>
            <div className="min-w-[75vw] sm:min-w-0 snap-center">
              <ImagePlaceholder
                description="Step photo: Water being poured into the side reservoir port of a mounted planter. A small watering can with a thin spout. The plant is already potted and healthy."
                aspect="16/9"
                bg={`${p.warmStone}33`}
                className="w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Editorial Quote Break ───
function QuoteBreak() {
  const scrollY = useScrollY();

  return (
    <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden" style={{ backgroundColor: p.linen }}>
      {/* Floating quotation mark */}
      <div
        className="absolute top-8 left-4 sm:left-12 text-[6rem] sm:text-[10rem] leading-none select-none pointer-events-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          color: p.sage,
          opacity: 0.06,
          transform: `translateY(${scrollY * 0.04}px)`,
          animation: "float 8s ease-in-out infinite",
        }}
      >
        &ldquo;
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <Reveal>
          <blockquote>
            <p
              className="text-xl sm:text-2xl lg:text-5xl leading-snug italic"
              style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
            >
              &ldquo;We believe every wall is an invitation to grow something
              beautiful.&rdquo;
            </p>
            <footer className="mt-6 sm:mt-8">
              <EditorialRule className="max-w-[80px] mx-auto mb-4 sm:mb-6" />
              <span
                className="text-xs tracking-[0.3em] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
              >
                The Planterra Team
              </span>
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Testimonials ───
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I was skeptical about self-watering, but it actually works. Went on a 10-day trip to Jaipur and came back to perfectly happy plants. This thing is magic.",
      name: "Priya Sharma",
      location: "Mumbai",
      detail: "Starter Kit, 6 months",
    },
    {
      quote:
        "Our apartment is tiny. No balcony. These planters turned a blank wall in our kitchen into a herb garden. Fresh tulsi and mint every morning now.",
      name: "Arjun & Meera Iyer",
      location: "Bangalore",
      detail: "4 Planters, 3 months",
    },
    {
      quote:
        "The modular aspect is what sold me. I started with two planters and now I have eight on the same rail. It looks stunning and everyone asks about it.",
      name: "Kavitha Reddy",
      location: "Hyderabad",
      detail: "8 Planters, 1 year",
    },
  ];

  return (
    <section id="reviews" className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: p.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-16 lg:mb-24 gap-4">
            <div>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
              >
                Voices
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
                style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
              >
                What our community
                <br />
                <span className="italic" style={{ color: p.sage }}>
                  has to say.
                </span>
              </h2>
            </div>
            <p
              className="text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
            >
              500+ happy plant parents across India
            </p>
          </div>
        </Reveal>

        {/* Mobile: horizontal scroll. Desktop: grid */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-3 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12} direction="tilt" className="min-w-[85vw] sm:min-w-[60vw] lg:min-w-0 snap-center">
              <div
                className="p-6 sm:p-8 lg:p-10 h-full flex flex-col justify-between transition-all duration-500"
                style={{
                  backgroundColor: p.linen,
                  border: `1px solid ${p.warmStone}22`,
                }}
              >
                {/* Stars */}
                <div className="mb-4 sm:mb-6 flex gap-1">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill={p.sage}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                <p
                  className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 flex-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.8 }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div>
                  <div className="w-8 h-px mb-3 sm:mb-4" style={{ backgroundColor: p.sage }} />
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.charcoal }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
                  >
                    {t.location} &middot; {t.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ───
function PricingSection() {
  const [hoveredAdd, setHoveredAdd] = useState<number | null>(null);

  const addOns = [
    { name: "Extra Planter", price: "Rs. 899", desc: "Add to any existing rail" },
    { name: "Extended Rail", price: "Rs. 699", desc: "Fits up to 5 planters" },
    { name: "Drip Tray Set", price: "Rs. 399", desc: "Set of 2, catches overflow" },
  ];

  return (
    <section
      id="pricing"
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: p.linen }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 gap-10">
          {/* Main Product */}
          <div className="lg:col-span-7">
            <Reveal>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
              >
                The Starter Kit
              </span>
            </Reveal>

            <Reveal delay={0.1} direction="scale">
              <div
                className="p-5 sm:p-8 lg:p-12 relative"
                style={{ backgroundColor: p.cream, border: `1px solid ${p.warmStone}33` }}
              >
                {/* Badge */}
                <div
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: p.sage, color: p.linen }}
                >
                  Most Popular
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <ImagePlaceholder
                    description="Product shot: Complete Starter Kit laid out on a linen surface. Wooden dowel rail, two white 3D-printed planters, wall brackets, screws, and a small instruction card. Overhead flat-lay, soft even lighting, everything neatly arranged."
                    aspect="1/1"
                    bg={p.sand}
                    className="w-full"
                  />

                  <div className="flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-xl sm:text-2xl lg:text-3xl mb-2"
                        style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
                      >
                        Planterra Starter
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4 sm:mb-6"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.7 }}
                      >
                        Everything you need to start your wall garden. Two
                        self-watering planters, one wooden dowel rail, wall
                        mounting hardware, and a care guide.
                      </p>

                      <ul className="space-y-2 sm:space-y-2.5 mb-6 sm:mb-8">
                        {[
                          "2 Self-watering planters",
                          "1 Wooden dowel rail (fits 3 planters)",
                          "Wall mounting brackets & screws",
                          "Capillary wicks (2 spare)",
                          "Plant care guide",
                        ].map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-3 text-sm"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.8 }}
                          >
                            <span style={{ color: p.sage }} className="mt-0.5">&#10003;</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
                        <span
                          className="text-3xl sm:text-4xl lg:text-5xl"
                          style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
                        >
                          Rs. 2,999
                        </span>
                        <span
                          className="text-sm line-through"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
                        >
                          Rs. 3,999
                        </span>
                      </div>
                      <button
                        className="w-full py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer active:scale-[0.98]"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          backgroundColor: p.espresso,
                          color: p.linen,
                          border: "none",
                        }}
                      >
                        Add to Cart
                      </button>
                      <p
                        className="text-center text-[10px] mt-3 tracking-wide"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
                      >
                        Free shipping &middot; 30-day returns &middot; 1-year warranty
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Add-Ons */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
              >
                Add-Ons
              </span>

              <div className="space-y-3 sm:space-y-4">
                {addOns.map((a, i) => (
                  <div
                    key={a.name}
                    className="p-4 sm:p-6 transition-all duration-500 cursor-pointer min-h-[48px]"
                    style={{
                      backgroundColor: hoveredAdd === i ? p.cream : "transparent",
                      border: `1px solid ${hoveredAdd === i ? `${p.sage}44` : `${p.warmStone}22`}`,
                    }}
                    onMouseEnter={() => setHoveredAdd(i)}
                    onMouseLeave={() => setHoveredAdd(null)}
                    onTouchStart={() => setHoveredAdd(i)}
                    onTouchEnd={() => setHoveredAdd(null)}
                  >
                    <div className="flex items-start justify-between mb-1 sm:mb-2">
                      <h4
                        className="text-base"
                        style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
                      >
                        {a.name}
                      </h4>
                      <span
                        className="text-base font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: p.charcoal }}
                      >
                        {a.price}
                      </span>
                    </div>
                    <p className="text-xs" style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}>
                      {a.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Guarantee */}
              <div
                className="mt-6 sm:mt-8 p-5 sm:p-6 text-center"
                style={{ border: `1px solid ${p.sage}33`, backgroundColor: `${p.sage}0a` }}
              >
                <div className="mb-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={p.sage}
                    strokeWidth="1.5"
                    className="mx-auto"
                    style={{ animation: "pulse 3s ease-in-out infinite" }}
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <p
                  className="text-xs tracking-[0.1em] uppercase mb-1"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
                >
                  Planterra Promise
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.6 }}
                >
                  If your plants don't survive the first 30 days, we'll replace
                  the planter and send you a free care consultation.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ───
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "What types of plants work best with Planterra?",
      a: "Our planters work beautifully with trailing plants like pothos, philodendrons, and string of pearls. They are also perfect for herbs like basil, mint, and tulsi. Succulents work well too, though you would fill the reservoir less frequently. We include a plant guide with every kit.",
    },
    {
      q: "How does the self-watering system actually work?",
      a: "Each planter has a sealed reservoir at the bottom separated from the soil by a partition. A capillary wick threads through from the reservoir into the soil. Water naturally wicks upward as the soil dries, providing consistent moisture. Just refill through the side port every 10 to 14 days.",
    },
    {
      q: "Will mounting damage my walls?",
      a: "The rail system requires just two screw holes, regardless of how many planters you add. That is the same as hanging a single picture frame. We include wall plugs for concrete and drywall. If you ever remove it, you are left with just two small holes easily patched.",
    },
    {
      q: "How much weight can the rail hold?",
      a: "Each rail supports up to 8 kg when properly mounted, which comfortably holds three fully watered planters with mature plants. For larger setups, we recommend our Extended Rail which supports up to 12 kg and fits five planters.",
    },
    {
      q: "Is the 3D printed plastic safe for plants?",
      a: "Absolutely. We use food-safe PLA, a plant-based bioplastic derived from corn starch. It contains no BPA or harmful chemicals. It is UV-resistant and will not degrade under normal indoor conditions. The material is also compostable at end of life.",
    },
    {
      q: "Do you ship across India? What about returns?",
      a: "We ship free to all pin codes in India. Orders are dispatched within 48 hours and typically arrive in 3 to 7 business days. We offer a no-questions-asked 30-day return policy. If your planter arrives damaged, we will send a replacement immediately.",
    },
  ];

  const handleToggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: p.cream }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-10 sm:mb-16 lg:mb-24">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.sage }}
            >
              Common Questions
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif", color: p.charcoal }}
            >
              Everything you need
              <br />
              <span className="italic" style={{ color: p.sage }}>
                to know.
              </span>
            </h2>
          </div>
        </Reveal>

        <div>
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div
                className="border-t py-5 sm:py-6 cursor-pointer"
                style={{ borderColor: `${p.warmStone}33` }}
                onClick={() => handleToggle(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleToggle(i); }}
              >
                <div className="flex items-start justify-between gap-4">
                  <h4
                    className="text-base sm:text-lg transition-colors duration-300 pr-2"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: openIndex === i ? p.sage : p.charcoal,
                    }}
                  >
                    {faq.q}
                  </h4>
                  <span
                    className="text-xl flex-shrink-0 transition-transform duration-500 mt-0.5 w-11 h-11 flex items-center justify-center"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: p.sage,
                      transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    maxHeight: openIndex === i ? "300px" : "0",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <p
                    className="pt-3 sm:pt-4 text-sm leading-relaxed max-w-2xl"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.espresso, opacity: 0.7 }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <div className="border-t" style={{ borderColor: `${p.warmStone}33` }} />
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ───
function FinalCTA() {
  const scrollY = useScrollY();

  return (
    <section
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: p.espresso }}
    >
      {/* Parallax background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(100px, 18vw, 350px)",
          color: p.cream,
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
            style={{ fontFamily: "'Playfair Display', serif", color: p.cream }}
          >
            Your walls are waiting
            <br />
            <span className="italic" style={{ color: p.sage }}>
              to come alive.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.8 }}
          >
            Join hundreds of plant lovers across India who have transformed their
            homes with Planterra. Start with a Starter Kit and grow from there.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 active:scale-[0.97]"
              style={{ fontFamily: "'DM Sans', sans-serif", backgroundColor: p.sage, color: p.linen }}
            >
              <span>Get Your Starter Kit</span>
              <span className="inline-block transition-transform duration-500">&rarr;</span>
            </a>
            <span
              className="text-sm"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.6 }}
            >
              Rs. 2,999 &middot; Free Shipping
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: p.charcoal }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top section */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <h3
              className="text-xl sm:text-2xl mb-3 sm:mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: p.cream }}
            >
              Planterra
            </h3>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.6 }}
            >
              3D printed self-watering wall planters, designed and made in India.
              Bringing life to your walls, one planter at a time.
            </p>
          </div>

          {/* Shop links */}
          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h4
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
            >
              Shop
            </h4>
            <ul className="space-y-2.5">
              {["Starter Kit", "Extra Planters", "Extended Rail", "Accessories"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.cream, opacity: 0.5 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="col-span-1 lg:col-span-2">
            <h4
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              {["Our Story", "Sustainability", "Contact", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.cream, opacity: 0.5 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect links */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h4
              className="text-[10px] tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone }}
            >
              Connect
            </h4>
            <ul className="space-y-2.5">
              {["Instagram", "Pinterest", "YouTube", "Newsletter"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: p.cream, opacity: 0.5 }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className="border-t border-b py-8 sm:py-10 mb-8 sm:mb-12"
          style={{ borderColor: `${p.warmStone}1a` }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <h4
                className="text-lg mb-1"
                style={{ fontFamily: "'Playfair Display', serif", color: p.cream }}
              >
                Join the growing community
              </h4>
              <p
                className="text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.5 }}
              >
                Plant care tips, new releases, and 10% off your first order.
              </p>
            </div>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 min-h-[48px] text-sm flex-1 sm:w-56 lg:w-64 outline-none transition-colors duration-300"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: `${p.warmStone}11`,
                  color: p.cream,
                  border: `1px solid ${p.warmStone}22`,
                  borderRight: "none",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = `${p.sage}44`; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = `${p.warmStone}22`; }}
              />
              <button
                className="px-5 sm:px-6 py-3 min-h-[48px] text-xs tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  backgroundColor: p.sage,
                  color: p.linen,
                  border: `1px solid ${p.sage}`,
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-[10px] tracking-[0.15em]"
            style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.4 }}
          >
            &copy; 2026 Planterra. Made with care in India.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Shipping"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                style={{ fontFamily: "'DM Sans', sans-serif", color: p.warmStone, opacity: 0.4 }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Design Component ───
export default function Design1() {
  return (
    <>
      <style>{fontLink}</style>
      <style>{keyframes}</style>
      <div style={{ backgroundColor: p.cream, overflowX: "hidden" }}>
        <Nav />
        <Hero />
        <SocialProofStrip />
        <StorySection />
        <FeaturesSection />
        <FeatureMarquee />
        <HowItWorksSection />
        <QuoteBreak />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
