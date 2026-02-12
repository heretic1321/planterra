import { useState, useEffect } from 'react'
import Reveal, { useScrollY } from '../components/Reveal'
import ImagePlaceholder from '../components/ImagePlaceholder'
import { colors, fonts } from '../lib/theme'
import { teamMembers } from '../lib/data'
import { Link } from 'react-router-dom'

// ─── Decorative Rule ───
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

// ─── Hero ───
function AboutHero() {
  const [loaded, setLoaded] = useState(false)
  const scrollY = useScrollY()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: colors.cream }}
    >
      {/* Parallax dot pattern */}
      <div
        className="absolute top-0 left-0 w-3/4 sm:w-1/2 h-full opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, ${colors.sage} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          transform: `translateY(${scrollY * 0.12}px)`,
        }}
      />

      {/* Floating decorative shapes */}
      <div
        className="absolute top-20 right-8 sm:top-28 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 rounded-full opacity-[0.05]"
        style={{
          border: `1px solid ${colors.sage}`,
          animation: 'floatSlow 7s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-32 left-6 sm:left-16 w-12 h-12 sm:w-16 sm:h-16 opacity-[0.04]"
        style={{
          border: `1px solid ${colors.terracotta}`,
          transform: `rotate(45deg) translateY(${scrollY * 0.08}px)`,
          animation: 'float 5s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-40 left-1/2 w-6 h-6 rounded-full opacity-[0.06]"
        style={{
          backgroundColor: colors.sage,
          animation: 'floatDeep 8s ease-in-out infinite',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-24">
        <div className="pt-24 sm:pt-32 lg:pt-40 max-w-4xl">
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
              Our Story
            </span>
          </div>

          <h1
            className="leading-[0.95] mb-6 sm:mb-8"
            style={{
              fontFamily: fonts.serif,
              color: colors.charcoal,
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
            }}
          >
            <span className="block text-[clamp(2rem,8vw,5rem)] lg:text-7xl">
              Born from a love
            </span>
            <span className="block text-[clamp(2rem,8vw,5rem)] lg:text-7xl">
              of plants{' '}
              <span className="italic" style={{ color: colors.sage }}>
                and impatience
              </span>
            </span>
            <span className="block text-[clamp(2rem,8vw,5rem)] lg:text-7xl">
              with watering.
            </span>
          </h1>

          <div
            className="max-w-lg"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s',
            }}
          >
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
            >
              Two plant lovers in Bangalore who kept killing houseplants.
              So they designed something better.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Origin Story ───
function OriginStory() {
  const scrollY = useScrollY()

  return (
    <section className="py-16 sm:py-24 lg:py-40 overflow-hidden" style={{ backgroundColor: colors.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <EditorialRule className="mb-12 sm:mb-16 lg:mb-24 max-w-lg mx-auto" />
        </Reveal>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center gap-10">
          {/* Image */}
          <div className="lg:col-span-5 lg:col-start-1">
            <Reveal direction="left" delay={0.1}>
              <div style={{ transform: `translateY(${scrollY * 0.03}px)` }}>
                <ImagePlaceholder
                  emoji="🛠️"
                  description="Workshop shot: Two founders at a workbench surrounded by 3D printers, planter prototypes in various colors lined up on shelves. Bangalore apartment turned workshop. Warm tungsten lighting, creative chaos."
                  aspect="4/5"
                  bg={colors.sand}
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>

          {/* Text */}
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal direction="right" delay={0.2}>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                How It Started
              </span>
              <h2
                className="text-2xl sm:text-3xl lg:text-5xl leading-[1.1] mb-6 sm:mb-8"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                From dead plants{' '}
                <span className="italic" style={{ color: colors.sage }}>
                  to a living idea.
                </span>
              </h2>
              <div
                className="space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed"
                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
              >
                <p>
                  It started with a running joke: Rohan and Sneha, two friends sharing a tiny
                  Bangalore apartment, had collectively killed fourteen houseplants in under a year.
                  Not from neglect, exactly, but from the reality of busy lives in a small space with
                  no balcony and a tendency to forget everything that was not on a screen.
                </p>
                <p>
                  Rohan, a product designer, started sketching wall-mounted planters that would not
                  need daily attention. Sneha, a mechanical engineer, turned those sketches into
                  prototypes. The first seventeen versions leaked, cracked, or fell off the wall.
                  Prototype eighteen held.
                </p>
                <p>
                  They added a self-watering drip tray with water absorbers and a cotton ball wicking
                  system, inspired by commercial greenhouse technology but shrunk down to apartment
                  scale. A simple wooden dowel mounted with double-sided tape meant zero holes in your
                  wall, no matter how many planters you added. The thumbscrew clip system let you
                  rearrange everything in seconds.
                </p>
                <p>
                  Friends noticed. Then friends of friends. What started as a weekend project in a
                  spare bedroom became Planterra: a small, intentional company making precision-crafted
                  self-watering wall planters for people who love plants but live in the real world.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Mission & Values ───
function MissionValues() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const values = [
    {
      icon: '🌍',
      title: 'Sustainability',
      description:
        'Every planter is precision-crafted from PLA, a plant-based bioplastic derived from corn starch. Our layer-by-layer process generates near-zero waste, and the material is compostable at end of life. No injection moulds, no excess inventory, no landfill guilt.',
    },
    {
      icon: '🏠',
      title: 'Accessibility',
      description:
        'Great design should not be a luxury. Our planters are priced for real budgets, install in under two minutes with double-sided tape, and work in the smallest apartments. You do not need a balcony, a garden, or a green thumb.',
    },
    {
      icon: '🔬',
      title: 'Craftsmanship',
      description:
        'Each planter is precision-crafted layer by layer on our farm of twelve printers in Bangalore. We tested forty-seven prototypes before we were satisfied. Every unit is inspected by hand before it ships.',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              What We Believe
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Built on three{' '}
              <span className="italic" style={{ color: colors.sage }}>
                simple truths.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.12} direction="tilt">
              <div
                className="p-6 sm:p-8 lg:p-10 h-full transition-all duration-500 cursor-default"
                style={{
                  backgroundColor: hoveredIndex === i ? colors.linen : 'transparent',
                  border: `1px solid ${hoveredIndex === i ? `${colors.sage}44` : `${colors.warmStone}22`}`,
                  transform: hoveredIndex === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredIndex === i ? `0 12px 40px ${colors.warmStone}22` : 'none',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className="text-3xl sm:text-4xl block mb-5 sm:mb-6"
                  style={{ animation: 'float 5s ease-in-out infinite', animationDelay: `${i * 0.5}s` }}
                >
                  {v.icon}
                </span>
                <h3
                  className="text-xl sm:text-2xl mb-3 sm:mb-4"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                >
                  {v.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Numbers Section ───
function NumbersSection() {
  const scrollY = useScrollY()

  const stats = [
    { number: '500+', label: 'Happy Homes' },
    { number: '5,000+', label: 'Planters Shipped' },
    { number: '47', label: 'Prototypes' },
    { number: '4.8', label: 'Average Rating' },
  ]

  return (
    <section
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
      style={{ backgroundColor: colors.forest }}
    >
      {/* Floating decorative elements */}
      <div
        className="absolute top-8 left-8 sm:top-12 sm:left-16 w-24 sm:w-40 h-24 sm:h-40 rounded-full opacity-[0.04]"
        style={{
          border: `1px solid ${colors.cream}`,
          animation: 'spinSlow 60s linear infinite',
        }}
      />
      <div
        className="absolute bottom-8 right-8 sm:bottom-12 sm:right-16 w-16 sm:w-24 h-16 sm:h-24 rounded-full opacity-[0.05]"
        style={{
          border: `1px solid ${colors.sage}`,
          animation: 'floatSlow 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full opacity-[0.08]"
        style={{
          backgroundColor: colors.sage,
          animation: 'pulse 3s ease-in-out infinite',
          transform: `translateY(${scrollY * 0.04}px)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1} direction="scale">
              <div className="text-center">
                <span
                  className="block text-4xl sm:text-5xl lg:text-7xl leading-none mb-2 sm:mb-3"
                  style={{ fontFamily: fonts.serif, color: colors.cream }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-[10px] sm:text-xs tracking-[0.2em] uppercase"
                  style={{ fontFamily: fonts.sans, color: colors.sage }}
                >
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Meet the Team ───
function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              The People
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              Meet the{' '}
              <span className="italic" style={{ color: colors.sage }}>
                team.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.1} direction="tilt">
              <div
                className="text-center transition-all duration-500 cursor-default"
                style={{
                  transform: hoveredIndex === i ? 'translateY(-6px) perspective(800px) rotateX(2deg)' : 'translateY(0)',
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Emoji avatar area */}
                <div
                  className="w-full aspect-square flex items-center justify-center mb-5 sm:mb-6 relative overflow-hidden transition-all duration-500"
                  style={{
                    backgroundColor: hoveredIndex === i ? `${colors.sage}15` : `${colors.sand}`,
                    border: `1px solid ${hoveredIndex === i ? `${colors.sage}33` : `${colors.warmStone}22`}`,
                    boxShadow: hoveredIndex === i ? `0 16px 48px ${colors.warmStone}25` : 'none',
                  }}
                >
                  {/* Grain overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />
                  <span
                    className="text-5xl sm:text-6xl lg:text-7xl"
                    style={{
                      animation: 'float 5s ease-in-out infinite',
                      animationDelay: `${i * 0.3}s`,
                    }}
                  >
                    {member.emoji}
                  </span>
                </div>

                <h3
                  className="text-lg sm:text-xl mb-1"
                  style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-[10px] sm:text-xs tracking-[0.15em] uppercase mb-3 sm:mb-4"
                  style={{ fontFamily: fonts.sans, color: colors.sage }}
                >
                  {member.role}
                </p>
                <p
                  className="text-sm leading-relaxed max-w-xs mx-auto"
                  style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.65 }}
                >
                  {member.bio}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Our Process ───
function ProcessSection() {
  const scrollY = useScrollY()

  const steps = [
    {
      number: '01',
      title: 'Design',
      description: 'Every planter starts as a sketch. We explore dozens of shapes, test proportions, and refine until the form feels right. Function and beauty in equal measure.',
      imageDesc: 'Sketchbook open on a desk with planter shape explorations drawn in pencil. A laptop showing CAD software in the background. Warm desk lamp lighting.',
      emoji: '✏️',
    },
    {
      number: '02',
      title: 'Craft',
      description: 'Our farm of twelve printers runs around the clock, crafting each planter layer by layer from plant-based PLA. Every layer is 0.2mm of precision.',
      imageDesc: 'Close-up of a 3D printer mid-print, building a white planter layer by layer. The print head glows warm. Multiple printers visible in the background, all running.',
      emoji: '🖨️',
    },
    {
      number: '03',
      title: 'Test',
      description: 'Each planter goes through a water-hold test, a clip-strength test, and a visual inspection. We test every single unit, not samples. If it is not perfect, it does not ship.',
      imageDesc: 'Hands inspecting a finished planter, checking the clip mechanism. A row of planters on a testing bench with water containers. Quality control station.',
      emoji: '🔍',
    },
    {
      number: '04',
      title: 'Ship',
      description: 'Packed in recycled cardboard with zero plastic. Every order includes a handwritten note, a care guide, and spare absorbers. It arrives at your door in 3 to 7 days.',
      imageDesc: 'Beautifully packed box being sealed. Recycled cardboard, a small handwritten note card visible, planter nestled in paper padding. Ready to ship.',
      emoji: '📦',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-40 relative overflow-hidden" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16 lg:mb-24">
            <span
              className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
              style={{ fontFamily: fonts.sans, color: colors.sage }}
            >
              Our Process
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-6xl leading-[1.05]"
              style={{ fontFamily: fonts.serif, color: colors.charcoal }}
            >
              From idea to{' '}
              <span className="italic" style={{ color: colors.sage }}>
                your wall.
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Desktop vertical connecting line */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2"
            style={{ backgroundColor: `${colors.warmStone}33` }}
          />

          <div className="space-y-12 sm:space-y-16 lg:space-y-0">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0

              return (
                <div
                  key={step.number}
                  className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center gap-6 lg:mb-0"
                  style={{ marginBottom: i < steps.length - 1 ? undefined : 0 }}
                >
                  {/* Image side */}
                  <div
                    className={`lg:col-span-5 ${isEven ? 'lg:col-start-1' : 'lg:col-start-8 lg:order-2'}`}
                  >
                    <Reveal direction={isEven ? 'left' : 'right'} delay={0.1}>
                      <div style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
                        <ImagePlaceholder
                          emoji={step.emoji}
                          description={step.imageDesc}
                          aspect="3/2"
                          bg={i % 2 === 0 ? colors.sand : `${colors.sage}15`}
                          className="w-full"
                        />
                      </div>
                    </Reveal>
                  </div>

                  {/* Center step indicator (desktop only) */}
                  <div className="hidden lg:flex lg:col-span-2 lg:col-start-6 justify-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-sm relative z-10"
                      style={{
                        fontFamily: fonts.serif,
                        border: `1px solid ${colors.sage}`,
                        color: colors.sage,
                        backgroundColor: colors.cream,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Text side */}
                  <div
                    className={`lg:col-span-5 ${isEven ? 'lg:col-start-8 lg:order-2' : 'lg:col-start-1 lg:order-1'}`}
                  >
                    <Reveal direction={isEven ? 'right' : 'left'} delay={0.25}>
                      {/* Mobile step number */}
                      <span
                        className="lg:hidden text-4xl font-light block mb-2"
                        style={{ fontFamily: fonts.serif, color: colors.warmStone, opacity: 0.3 }}
                      >
                        {step.number}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl mb-3 sm:mb-4"
                        style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm sm:text-base leading-relaxed"
                        style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                      >
                        {step.description}
                      </p>
                      <div className="mt-5 sm:mt-6 w-12 h-px" style={{ backgroundColor: colors.sage }} />
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ───
function AboutCTA() {
  const scrollY = useScrollY()

  return (
    <section
      className="py-16 sm:py-24 lg:py-40 relative overflow-hidden"
      style={{ backgroundColor: colors.espresso }}
    >
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
        Join
      </div>

      {/* Floating decorative shapes */}
      <div
        className="absolute top-16 right-12 w-20 h-20 rounded-full opacity-[0.04]"
        style={{
          border: `1px solid ${colors.cream}`,
          animation: 'floatSlow 7s ease-in-out infinite',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <Reveal>
          <EditorialRule className="max-w-[80px] mx-auto mb-8 sm:mb-12" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-3xl sm:text-4xl lg:text-7xl leading-[1.05] mb-6 sm:mb-8"
            style={{ fontFamily: fonts.serif, color: colors.cream }}
          >
            Ready to join{' '}
            <span className="italic" style={{ color: colors.sage }}>
              the community?
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-lg mx-auto"
            style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.8 }}
          >
            Start your wall garden today. Pick a Starter Kit and transform your space
            in under two minutes. No drilling required.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 active:scale-[0.97] no-underline"
              style={{ fontFamily: fonts.sans, backgroundColor: colors.sage, color: colors.linen }}
            >
              <span>Shop Now</span>
              <span className="inline-block transition-transform duration-500">&rarr;</span>
            </Link>
            <Link
              to="/contact"
              className="text-sm tracking-[0.15em] uppercase min-h-[48px] inline-flex items-center px-6 py-3 transition-all duration-300 no-underline"
              style={{
                fontFamily: fonts.sans,
                color: colors.warmStone,
                border: `1px solid ${colors.warmStone}44`,
              }}
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Main About Page ───
export default function About() {
  return (
    <div style={{ backgroundColor: colors.cream, overflowX: 'hidden' }}>
      <AboutHero />
      <OriginStory />
      <MissionValues />
      <NumbersSection />
      <TeamSection />
      <ProcessSection />
      <AboutCTA />
    </div>
  )
}
