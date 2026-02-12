// ─── Planterra Design System ───
// Combines Design 1 editorial botanical + Design 4 interactive warmth

export const colors = {
  cream: '#F5F0EB',
  sage: '#8B9A7E',
  sageDark: '#6B7D5E',
  terracotta: '#B87355',
  terracottaDark: '#A2624A',
  charcoal: '#2C2C2C',
  warmStone: '#C4B5A4',
  espresso: '#3D3228',
  forest: '#1b3a2d',
  forestLight: '#2d5a47',
  sand: '#E8DDD1',
  clay: '#a0826d',
  linen: '#FAF7F4',
  moss: '#5A6B4F',
  sienna: '#d4763a',
  white: '#FFFFFF',
} as const

export const fonts = {
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
} as const

export type ColorKey = keyof typeof colors
