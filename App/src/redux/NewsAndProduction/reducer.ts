import produce, { enableMapSet } from 'immer'
import 'map.prototype.tojson'
import { NewsAndPromotionAction } from './action'
import { initialState, NewsAndPromotionState } from './state'
enableMapSet()

export let newsAndPromotionReducer = produce((state: NewsAndPromotionState, action: NewsAndPromotionAction): void => {
  switch (action.type) {
    case '@@NewsAndPromotion/failed':
      state.status = 'error'
      state.error = action.msg
      return
    case '@@NewsAndPromotion/deleted':
      state.newsAndPromotions.delete(action.id)
      return
    case '@@NewsAndPromotion/loaded':
      state.status = 'ready'
      state.error = undefined
      action.newsAndPromotions.forEach((newsAndPromotion) => {
        state.newsAndPromotions.set(newsAndPromotion.id, newsAndPromotion)
      })
      return
  }
}, initialState)
