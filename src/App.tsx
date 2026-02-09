import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Design1 from './designs/Design1'
import Design2 from './designs/Design2'
import Design3 from './designs/Design3'
import Design4 from './designs/Design4'
import Design5 from './designs/Design5'

function Index() {
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/1" element={<Design1 />} />
        <Route path="/2" element={<Design2 />} />
        <Route path="/3" element={<Design3 />} />
        <Route path="/4" element={<Design4 />} />
        <Route path="/5" element={<Design5 />} />
      </Routes>
    </BrowserRouter>
  )
}
