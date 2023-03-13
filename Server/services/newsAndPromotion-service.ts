import fs from "fs"
import path from "path"
import { Knex } from "knex"
export type NewsAndPromotion = {
  id: number
  image?: any
  title: string
  description: string
  status?: "active" | "inactive"
}
export class NewsAndPromotionService {
  constructor(private knex: Knex) {}

  async createNewsAndPromotion(newsAndPromotion: {
    title: string
    description: string
    image: string | null
  }): Promise<NewsAndPromotion> {
    let [id]: number[] = await this.knex
      .insert({
        title: newsAndPromotion.title,
        image: newsAndPromotion.image,
        description: newsAndPromotion.description,
      })
      .into("newsAndPromotion")
      .returning("id")
    return {
      id,
      title: newsAndPromotion.title,
      description: newsAndPromotion.description,
      image: newsAndPromotion.image || undefined,
    }
  }

  async getAllNewsAndPromotions(): Promise<NewsAndPromotion[]> {
    return this.knex.select("*").from("newsAndPromotion").where("status", "active").orderBy("id", "desc")
  }

  async updateNewsAndPromotion(newsAndPromotion: {
    id: number
    title: string
    description: string
  }): Promise<NewsAndPromotion> {
    let affectedRows = await this.knex("newsAndPromotions")
      .update({
        title: newsAndPromotion.title,
        description: newsAndPromotion.description,
        updated_at: this.knex.fn.now(),
      })
      .where({ id: newsAndPromotion.id })
    if (affectedRows == 0) {
      throw new Error("newsAndPromotion not found")
    }
    let row = await this.knex.select("image").from("newsAndPromotion").where({ id: newsAndPromotion.id }).first()
    return {
      id: newsAndPromotion.id,
      title: newsAndPromotion.title,
      description: newsAndPromotion.description,
      image: row.image,
    }
  }

  async deleteNewsAndPromotion(id: number) {
    const row = await this.knex("newsAndPromotion").select("image").where({ id }).first()
    let filename = row?.image
    if (filename) {
      fs.unlink(path.join("uploads", filename), (err) => {
        if (err) {
          console.log("failed to delete newsAndPromotion image:", filename, "error:", err)
        }
      })
    }
    await this.knex("newsAndPromotion").where({ id }).del()
  }
}
