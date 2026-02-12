export interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  description: string
  shortDescription: string
  features: string[]
  category: 'planter' | 'kit' | 'accessory' | 'bundle'
  badge?: string
  inStock: boolean
  rating: number
  reviewCount: number
  specs: Record<string, string>
  colors?: { name: string; hex: string }[]
  imageEmoji: string
  imageBg: string
  image?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
  detail?: string
}

export interface FAQItem {
  question: string
  answer: string
  category?: string
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  emoji: string
}
