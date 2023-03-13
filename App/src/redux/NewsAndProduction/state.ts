export type NewsAndPromotions = Array<{
  id: number
  image: string
  title: string
  description: string
}>

export type NewsAndPromotionState = {
  status: 'loading' | 'ready' | 'error'
  error?: string
  newsAndPromotions: Map<number, NewsAndPromotion>
}

export const initialState: NewsAndPromotionState = {
  status: 'loading',
  newsAndPromotions: new Map(),
}

export type NewsAndPromotion = NewsAndPromotions[number]
