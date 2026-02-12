import { useState, useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { colors, fonts } from '../lib/theme'
import { useCart } from '../context/CartContext'

const p = colors

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        backgroundColor: scrolled || menuOpen ? `${p.linen}ee` : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${p.warmStone}33` : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between h-14 sm:h-16 lg:h-20">
        <Link
          to="/"
          className="tracking-[0.25em] uppercase text-xs font-medium transition-colors duration-300 z-50"
          style={{ fontFamily: fonts.sans, color: p.espresso, textDecoration: 'none' }}
        >
          Planterra
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-60"
              style={{
                fontFamily: fonts.sans,
                color: location.pathname === item.to ? p.sage : p.espresso,
                textDecoration: 'none',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Cart + CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/cart"
            className="relative transition-colors duration-300 hover:opacity-70"
            style={{ color: p.espresso, textDecoration: 'none' }}
            aria-label={`Cart with ${totalItems} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ backgroundColor: p.sage, color: p.linen, fontFamily: fonts.sans }}
              >
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/shop"
            className="text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-500 hover:tracking-[0.25em]"
            style={{ fontFamily: fonts.sans, color: p.linen, backgroundColor: p.espresso, textDecoration: 'none' }}
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="md:hidden flex items-center gap-3 z-50">
          <Link
            to="/cart"
            className="relative w-11 h-11 flex items-center justify-center"
            style={{ color: p.espresso, textDecoration: 'none' }}
            aria-label={`Cart with ${totalItems} items`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute top-1 right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ backgroundColor: p.sage, color: p.linen, fontFamily: fonts.sans }}
              >
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="flex flex-col justify-center items-center gap-1.5 w-11 h-11"
            style={{ background: 'none', border: 'none' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{ backgroundColor: p.espresso, transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{ backgroundColor: p.espresso, opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{ backgroundColor: p.espresso, transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className="md:hidden fixed inset-0 top-14 flex flex-col items-center justify-center transition-all duration-500"
        style={{
          backgroundColor: p.linen,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
        }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-2xl tracking-[0.1em] transition-all duration-300"
              style={{
                fontFamily: fonts.serif,
                color: location.pathname === item.to ? p.sage : p.charcoal,
                textDecoration: 'none',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(16px)',
                transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + i * 0.06}s`,
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/track-order"
            className="text-lg tracking-[0.1em] transition-all duration-300"
            style={{
              fontFamily: fonts.serif,
              color: p.warmStone,
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s`,
            }}
          >
            Track Order
          </Link>
          <Link
            to="/shop"
            className="mt-4 text-sm tracking-[0.2em] uppercase px-8 py-4 min-h-[48px] flex items-center"
            style={{
              fontFamily: fonts.sans,
              color: p.linen,
              backgroundColor: p.espresso,
              textDecoration: 'none',
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 0.4s ease 0.5s`,
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="py-12 sm:py-16 lg:py-20" style={{ backgroundColor: p.charcoal }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-12 sm:mb-16">
          <div className="col-span-2 sm:col-span-2 lg:col-span-4">
            <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4" style={{ fontFamily: fonts.serif, color: p.cream }}>
              Planterra
            </h3>
            <p className="text-sm leading-relaxed max-w-xs" style={{ fontFamily: fonts.sans, color: p.warmStone, opacity: 0.6 }}>
              Self-watering wall planters that need no drilling. Designed and made in India.
              Bringing life to your walls, one planter at a time.
            </p>
          </div>

          <div className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h4 className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: fonts.sans, color: p.warmStone }}>
              Shop
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'All Products', to: '/shop' },
                { label: 'Starter Kit', to: '/product/starter-kit' },
                { label: 'Add-On Planter', to: '/product/add-on-planter' },
                { label: 'Extended Dowel', to: '/product/extended-dowel' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                    style={{ fontFamily: fonts.sans, color: p.cream, opacity: 0.5, textDecoration: 'none' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: fonts.sans, color: p.warmStone }}>
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Our Story', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Track Order', to: '/track-order' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                    style={{ fontFamily: fonts.sans, color: p.cream, opacity: 0.5, textDecoration: 'none' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1 lg:col-span-2">
            <h4 className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ fontFamily: fonts.sans, color: p.warmStone }}>
              Connect
            </h4>
            <ul className="space-y-2.5">
              {['Instagram', 'Pinterest', 'YouTube', 'Newsletter'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                    style={{ fontFamily: fonts.sans, color: p.cream, opacity: 0.5, textDecoration: 'none' }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-b py-8 sm:py-10 mb-8 sm:mb-12" style={{ borderColor: `${p.warmStone}1a` }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="text-lg mb-1" style={{ fontFamily: fonts.serif, color: p.cream }}>
                Join the growing community
              </h4>
              <p className="text-xs" style={{ fontFamily: fonts.sans, color: p.warmStone, opacity: 0.5 }}>
                Plant care tips, new releases, and 10% off your first order.
              </p>
            </div>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 min-h-[48px] text-sm flex-1 sm:w-56 lg:w-64 outline-none transition-colors duration-300"
                style={{
                  fontFamily: fonts.sans,
                  backgroundColor: `${p.warmStone}11`,
                  color: p.cream,
                  border: `1px solid ${p.warmStone}22`,
                  borderRight: 'none',
                }}
              />
              <button
                className="px-5 sm:px-6 py-3 min-h-[48px] text-xs tracking-[0.15em] uppercase transition-all duration-500 cursor-pointer"
                style={{
                  fontFamily: fonts.sans,
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

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em]" style={{ fontFamily: fonts.sans, color: p.warmStone, opacity: 0.4 }}>
            &copy; 2026 Planterra. Made with care in India.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Shipping'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-[0.15em] uppercase transition-colors duration-300 hover:opacity-80 min-h-[44px] inline-flex items-center"
                style={{ fontFamily: fonts.sans, color: p.warmStone, opacity: 0.4, textDecoration: 'none' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: colors.cream, overflowX: 'hidden' }}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
