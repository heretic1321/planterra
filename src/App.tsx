import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'

// Legacy design previews
import Design1 from './designs/Design1'
import Design2 from './designs/Design2'
import Design3 from './designs/Design3'
import Design4 from './designs/Design4'
import Design5 from './designs/Design5'

// Pages (lazy loaded)
const Home = lazy(() => import('./pages/Home'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Cart = lazy(() => import('./pages/Cart'))
const TrackOrder = lazy(() => import('./pages/TrackOrder'))
const FAQ = lazy(() => import('./pages/FAQ'))

function DesignIndex() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-light tracking-tight">Planterra Designs</h1>
        <p className="text-neutral-400">Choose a design to preview</p>
        <div className="flex gap-4 justify-center">
          {[1, 2, 3, 4, 5].map((n) => (
            <Link
              key={n}
              to={`/${n}`}
              className="w-16 h-16 rounded-2xl bg-neutral-800 hover:bg-emerald-900 border border-neutral-700 hover:border-emerald-500 flex items-center justify-center text-lg font-medium transition-all duration-300"
            >
              {n}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F5F0EB' }}>
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent"
        style={{ borderColor: '#8B9A7E', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}
      />
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Main site routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/shop" element={<Layout><Shop /></Layout>} />
            <Route path="/product/:slug" element={<Layout><ProductDetail /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/cart" element={<Layout><Cart /></Layout>} />
            <Route path="/track-order" element={<Layout><TrackOrder /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />

            {/* Legacy design previews */}
            <Route path="/designs" element={<DesignIndex />} />
            <Route path="/1" element={<Design1 />} />
            <Route path="/2" element={<Design2 />} />
            <Route path="/3" element={<Design3 />} />
            <Route path="/4" element={<Design4 />} />
            <Route path="/5" element={<Design5 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </CartProvider>
  )
}
