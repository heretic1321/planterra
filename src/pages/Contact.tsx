import { useState, useEffect, type FormEvent } from 'react'
import Reveal, { useScrollY } from '../components/Reveal'
import { colors, fonts } from '../lib/theme'
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
function ContactHero() {
  const [loaded, setLoaded] = useState(false)
  const scrollY = useScrollY()

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="relative min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-end overflow-hidden"
      style={{ backgroundColor: colors.cream }}
    >
      {/* Floating decorative shapes */}
      <div
        className="absolute top-24 right-12 sm:top-32 sm:right-24 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-[0.05]"
        style={{
          border: `1px solid ${colors.sage}`,
          animation: 'floatSlow 7s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-24 left-8 sm:left-20 w-10 h-10 sm:w-14 sm:h-14 opacity-[0.04]"
        style={{
          border: `1px solid ${colors.terracotta}`,
          transform: `rotate(45deg) translateY(${scrollY * 0.06}px)`,
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-36 left-1/3 w-4 h-4 rounded-full opacity-[0.06]"
        style={{
          backgroundColor: colors.sage,
          animation: 'floatDeep 9s ease-in-out infinite',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
        <div className="pt-24 sm:pt-32 lg:pt-40 max-w-3xl">
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
              Contact
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
            <span className="block text-[clamp(2.5rem,9vw,5.5rem)] lg:text-7xl">
              Get in{' '}
              <span className="italic" style={{ color: colors.sage }}>
                Touch
              </span>
            </span>
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
              className="text-base sm:text-lg leading-relaxed"
              style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
            >
              We would love to hear from you. Whether it is a question about our planters,
              a wholesale inquiry, or just to say hello.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact Form & Info ───
function ContactFormSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputBaseStyle = {
    fontFamily: fonts.sans,
    color: colors.charcoal,
    backgroundColor: colors.cream,
    minHeight: '48px',
  }

  const subjects = [
    'General Inquiry',
    'Order Issue',
    'Wholesale',
    'Feedback',
    'Other',
  ]

  const contactInfo = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M22 4L12 13L2 4" />
        </svg>
      ),
      label: 'Email',
      value: 'hello@planterra.co.in',
      href: 'mailto:hello@planterra.co.in',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
      label: 'Phone',
      value: '+91 80 4567 8901',
      href: 'tel:+918045678901',
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Address',
      value: 'Planterra Workshop, HSR Layout, Bangalore 560102',
      href: undefined,
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Hours',
      value: 'Mon - Fri, 10am - 6pm IST',
      href: undefined,
    },
  ]

  const socials = [
    {
      name: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.87 6.42 9.31-.09-.78-.17-1.98.04-2.83.18-.77 1.17-4.95 1.17-4.95s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.85 0 1.27.64 1.27 1.41 0 .86-.55 2.14-.83 3.33-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.87 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.75 2.28a.3.3 0 01.07.29c-.08.31-.25 1-.28 1.14-.05.19-.15.23-.35.14-1.31-.61-2.13-2.53-2.13-4.07 0-3.31 2.41-6.36 6.95-6.36 3.65 0 6.49 2.6 6.49 6.07 0 3.63-2.29 6.55-5.46 6.55-1.07 0-2.07-.55-2.41-1.21l-.66 2.5c-.24.91-.88 2.05-1.31 2.75A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-40" style={{ backgroundColor: colors.linen }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 gap-12">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7">
            <Reveal>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-4 sm:mb-6"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Send a Message
              </span>
            </Reveal>

            {submitted ? (
              <Reveal direction="scale">
                <div
                  className="p-8 sm:p-12 text-center"
                  style={{ backgroundColor: `${colors.sage}0a`, border: `1px solid ${colors.sage}33` }}
                >
                  <span
                    className="text-4xl sm:text-5xl block mb-4"
                    style={{ animation: 'float 4s ease-in-out infinite' }}
                  >
                    🌱
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl mb-3"
                    style={{ fontFamily: fonts.serif, color: colors.charcoal }}
                  >
                    Message Sent
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto"
                    style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
                  >
                    Thank you for reaching out, {name || 'friend'}! We will get back to you within
                    24 hours during business days. Keep an eye on your inbox.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setName('')
                      setEmail('')
                      setSubject('')
                      setMessage('')
                    }}
                    className="text-sm tracking-[0.15em] uppercase px-6 py-3 min-h-[48px] transition-all duration-300 cursor-pointer"
                    style={{
                      fontFamily: fonts.sans,
                      color: colors.sage,
                      backgroundColor: 'transparent',
                      border: `1px solid ${colors.sage}44`,
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal delay={0.1}>
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  {/* Name & Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs tracking-[0.1em] uppercase mb-2"
                        style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                        style={{
                          ...inputBaseStyle,
                          border: `1px solid ${focusedField === 'name' ? colors.sage : `${colors.warmStone}33`}`,
                        }}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs tracking-[0.1em] uppercase mb-2"
                        style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 text-sm outline-none transition-all duration-300"
                        style={{
                          ...inputBaseStyle,
                          border: `1px solid ${focusedField === 'email' ? colors.sage : `${colors.warmStone}33`}`,
                        }}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs tracking-[0.1em] uppercase mb-2"
                      style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 cursor-pointer appearance-none"
                      style={{
                        ...inputBaseStyle,
                        border: `1px solid ${focusedField === 'subject' ? colors.sage : `${colors.warmStone}33`}`,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%238B9A7E' stroke-width='1.5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 16px center',
                        paddingRight: '40px',
                      }}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <option value="" disabled>
                        Select a subject
                      </option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs tracking-[0.1em] uppercase mb-2"
                      style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.6 }}
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what is on your mind..."
                      rows={6}
                      className="w-full px-4 py-3 text-sm outline-none transition-all duration-300 resize-vertical"
                      style={{
                        ...inputBaseStyle,
                        minHeight: '140px',
                        border: `1px solid ${focusedField === 'message' ? colors.sage : `${colors.warmStone}33`}`,
                      }}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 cursor-pointer active:scale-[0.98]"
                    style={{
                      fontFamily: fonts.sans,
                      backgroundColor: colors.espresso,
                      color: colors.linen,
                      border: 'none',
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </Reveal>
            )}
          </div>

          {/* Right: Contact Info */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <span
                className="text-[10px] tracking-[0.4em] uppercase block mb-6 sm:mb-8"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Contact Info
              </span>

              <div className="space-y-6 sm:space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${colors.sage}0a`, border: `1px solid ${colors.sage}22` }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p
                        className="text-[10px] tracking-[0.15em] uppercase mb-1"
                        style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm leading-relaxed transition-colors duration-300 no-underline"
                          style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: fonts.sans, color: colors.charcoal }}
                        >
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="my-8 sm:my-10 h-px" style={{ backgroundColor: `${colors.warmStone}22` }} />

              {/* Social Links */}
              <div>
                <p
                  className="text-[10px] tracking-[0.15em] uppercase mb-4"
                  style={{ fontFamily: fonts.sans, color: colors.warmStone }}
                >
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href="#"
                      className="w-11 h-11 flex items-center justify-center transition-all duration-300 no-underline"
                      style={{
                        color: colors.espresso,
                        backgroundColor: 'transparent',
                        border: `1px solid ${colors.warmStone}33`,
                      }}
                      title={social.name}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${colors.sage}15`
                        e.currentTarget.style.borderColor = `${colors.sage}44`
                        e.currentTarget.style.color = colors.sage
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.borderColor = `${colors.warmStone}33`
                        e.currentTarget.style.color = colors.espresso
                      }}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Map Section ───
function MapSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32" style={{ backgroundColor: colors.cream }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Reveal>
          <div
            className="relative overflow-hidden"
            style={{
              backgroundColor: `${colors.sage}0d`,
              border: `1px solid ${colors.sage}22`,
              minHeight: '320px',
            }}
          >
            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(${colors.sage} 1px, transparent 1px), linear-gradient(90deg, ${colors.sage} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 text-center min-h-[320px]">
              {/* Location pin */}
              <div className="mb-4 sm:mb-6">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.sage}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <h3
                className="text-xl sm:text-2xl mb-2"
                style={{ fontFamily: fonts.serif, color: colors.charcoal }}
              >
                Planterra Workshop
              </h3>
              <p
                className="text-sm leading-relaxed mb-1"
                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
              >
                HSR Layout, Sector 7
              </p>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.7 }}
              >
                Bangalore, Karnataka 560102
              </p>
              <p
                className="text-xs tracking-[0.1em] uppercase"
                style={{ fontFamily: fonts.sans, color: colors.sage }}
              >
                Visits by appointment only
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── FAQ Teaser ───
function FAQTeaser() {
  const scrollY = useScrollY()

  return (
    <section
      className="py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      style={{ backgroundColor: colors.espresso }}
    >
      {/* Floating decorative */}
      <div
        className="absolute top-8 right-12 w-16 h-16 rounded-full opacity-[0.04]"
        style={{
          border: `1px solid ${colors.cream}`,
          animation: 'floatSlow 8s ease-in-out infinite',
        }}
      />

      {/* Background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{
          fontFamily: fonts.serif,
          fontSize: 'clamp(80px, 14vw, 250px)',
          color: colors.cream,
          opacity: 0.02,
          lineHeight: 0.9,
          transform: `translateY(${scrollY * 0.04}px)`,
        }}
      >
        FAQ
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
        <Reveal>
          <EditorialRule className="max-w-[80px] mx-auto mb-8 sm:mb-10" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl leading-[1.1] mb-4 sm:mb-6"
            style={{ fontFamily: fonts.serif, color: colors.cream }}
          >
            Have questions?{' '}
            <span className="italic" style={{ color: colors.sage }}>
              We have answers.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto"
            style={{ fontFamily: fonts.sans, color: colors.warmStone, opacity: 0.8 }}
          >
            From plant care to shipping, our FAQ covers everything you need to know
            about Planterra.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Link
            to="/faq"
            className="inline-flex items-center gap-3 px-8 py-4 min-h-[48px] text-sm tracking-[0.2em] uppercase transition-all duration-500 active:scale-[0.97] no-underline"
            style={{ fontFamily: fonts.sans, backgroundColor: colors.sage, color: colors.linen }}
          >
            <span>Browse FAQ</span>
            <span className="inline-block transition-transform duration-500">&rarr;</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ─── Main Contact Page ───
export default function Contact() {
  return (
    <div style={{ backgroundColor: colors.cream, overflowX: 'hidden' }}>
      <ContactHero />
      <ContactFormSection />
      <MapSection />
      <FAQTeaser />
    </div>
  )
}
