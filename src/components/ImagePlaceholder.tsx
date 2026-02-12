import { colors, fonts } from '../lib/theme'

interface ImagePlaceholderProps {
  emoji?: string
  description?: string
  aspect?: string
  bg?: string
  className?: string
}

export default function ImagePlaceholder({
  emoji,
  description,
  aspect = '4/5',
  bg = colors.sand,
  className = '',
}: ImagePlaceholderProps) {
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
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 gap-2">
        {emoji && (
          <span className="text-4xl sm:text-5xl" style={{ animation: 'float 5s ease-in-out infinite' }}>
            {emoji}
          </span>
        )}
        {description && (
          <p
            className="text-center text-xs sm:text-sm leading-relaxed max-w-xs"
            style={{ fontFamily: fonts.sans, color: colors.espresso, opacity: 0.5 }}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
