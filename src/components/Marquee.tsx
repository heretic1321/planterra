import { colors, fonts } from '../lib/theme'

interface MarqueeProps {
  items: string[]
  speed?: number
  bg?: string
  color?: string
  separator?: string
  className?: string
  reverse?: boolean
}

export default function Marquee({
  items,
  speed = 30,
  bg = colors.espresso,
  color = colors.cream,
  separator = '\u2022',
  className = '',
  reverse = false,
}: MarqueeProps) {
  const doubled = [...items, ...items]
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${className}`}
      style={{ backgroundColor: bg }}
    >
      <div
        className="inline-flex py-3 sm:py-4"
        style={{
          animation: `marquee ${speed}s linear infinite${reverse ? ' reverse' : ''}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-4 sm:mx-8 text-xs sm:text-sm tracking-[0.2em] uppercase inline-flex items-center gap-4 sm:gap-8"
            style={{ fontFamily: fonts.sans, color }}
          >
            {item}
            <span style={{ opacity: 0.4 }}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
