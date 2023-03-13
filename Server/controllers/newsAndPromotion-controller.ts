import express from 'express'
import { NewsAndPromotionService } from '../services/newsAndPromotion-service'
export type NewsAndPromotion = {
  id: number
  image?: string
  title: string
  description: string
}

export class NewsAndPromotionController {
  constructor(private newsAndPromotionService: NewsAndPromotionService) {}

  createNewsAndPromotion = async (req: express.Request, res: express.Response) => {
    let title = req.body.title
    let description = req.body.description
    let image = req.file!['location']
    if (req.file) {
      image = req.file['location']
    }
    if (!description && !image && !title) {
      res.status(400).end('require content or image but both are not given')
      return
    }
    try {
      let newsAndPromotion: NewsAndPromotion = await this.newsAndPromotionService.createNewsAndPromotion({
        title,
        image,
        description,
      })
      res.status(201).json(newsAndPromotion)
    } catch (error) {
      console.log('failed to insert newsAndPromotion:', error)
      res.status(500).end('failed to insert newsAndPromotion')
    }
  }

  getAllNewsAndPromotions = async (req: express.Request, res: express.Response) => {
    try {
      let newsAndPromotions: NewsAndPromotion[] = await this.newsAndPromotionService.getAllNewsAndPromotions()
      res.json(newsAndPromotions)
    } catch (error) {
      console.log('failed to get NewsAndPromotions:', error)
      res.status(500).end('failed to get NewsAndPromotions')
    }
  }

  updateNewsAndPromotion = async (req: express.Request, res: express.Response) => {
    let id = parseInt(req.params.id)
    if (Number.isNaN(id)) {
      res.status(400).end('Expected numeric id in params')
      return
    }
    if (!req.body.description) {
      res.status(400).end('Missing content in req.body')
      return
    }
    try {
      let newsAndPromotion = await this.newsAndPromotionService.updateNewsAndPromotion({
        id,
        description: req.body.description,
        title: req.body.title,
      })
      res.status(202).json(newsAndPromotion)
    } catch (error) {
      console.log('failed to update NewsAndPromotion:', { id, error })
      res.status(500).end('failed to update NewsAndPromotion:' + error.message)
    }
  }

  deleteNewsAndPromotion = async (req: express.Request, res: express.Response) => {
    let id = parseInt(req.params['id'])
    if (Number.isNaN(id)) {
      res.status(400).end('expect number "id" in params')
      return
    }
    try {
      await this.newsAndPromotionService.deleteNewsAndPromotion(id)
      res.status(202).end('deleted')
    } catch (error) {
      console.error('failed to delete NewsAndPromotion:', error)
      res.status(500).end('failed to delete NewsAndPromotion')
    }
  }
}
