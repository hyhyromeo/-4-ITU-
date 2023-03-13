import { NewsAndPromotions } from './state'

export function deletedNewsAndPromotions(id: number) {
  return {
    type: '@@NewsAndPromotion/deleted' as const,
    id,
  }
}

export function loadedNewsAndPromotions(newsAndPromotions: NewsAndPromotions) {
  return {
    type: '@@NewsAndPromotion/loaded' as const,
    newsAndPromotions,
  }
}

export function failed(msg: string) {
  return {
    type: '@@NewsAndPromotion/failed' as const,
    msg,
  }
}

export function setDraftNewsAndPromotionPictureAction(file: File) {
  return {
    type: '@@Auth/set_draft_profile_picture' as const,
    file,
  }
}

export type NewsAndPromotionAction =
  | ReturnType<typeof deletedNewsAndPromotions>
  | ReturnType<typeof loadedNewsAndPromotions>
  | ReturnType<typeof failed>
  | ReturnType<typeof setDraftNewsAndPromotionPictureAction>
