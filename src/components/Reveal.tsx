import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrollY
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'fade' | 'scale' | 'tilt'
  style?: CSSProperties
}

const transforms: Record<string, string> = {
  up: 'translateY(40px)',
  left: 'translateX(-40px)',
  right: 'translateX(40px)',
  fade: 'translateY(0)',
  scale: 'scale(0.92)',
  tilt: 'perspective(800px) rotateY(8deg) rotateX(4deg)',
}

export default function Reveal({ children, className = '', delay = 0, direction = 'up', style = {} }: RevealProps) {
  const { ref, isVisible } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? 'translate(0,0) scale(1) perspective(800px) rotateY(0deg) rotateX(0deg)'
          : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
