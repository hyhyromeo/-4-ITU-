import { Knex } from "knex"
import { add } from "date-fns"

export type Gift = {
  gift_item: string
  cost: number
  description: string
  created_by?: number
  edited_by?: number
  status?: "active" | "inactive"
}
export class GiftService {
  constructor(private knex: Knex) {}

  async getPointRecord(userId?: number, adminId?: number) {
    let query = await this.knex.select("*").from("point_record")
    if (userId && adminId)
      query = await this.knex
        .select("*")
        .from("point_record")
        .where("userId", userId)
        .andWhere("created_by", adminId)
    if (userId) {
      query = await this.knex
        .select("*")
        .from("point_record")
        .where("userId", userId)
    }
    if (adminId) {
      query = await this.knex
        .select("*")
        .from("point_record")
        .where("created_by", adminId)
    }
    return query
  }

  async addPoints(
    userId: number,
    medId: number,
    points: number,
    adminId: number,
    commission?: number,
    agentUserId?: number
  ) {
    return await this.knex.transaction(async (knex) => {
      let expiryDate = add(new Date(), { years: 1 })
      let addPointsId = await this.knex
        .select("id")
        .from("medical_services")
        .where("service", "Add points")

      await this.knex
        .insert({
          user_id: userId,
          medical_services_id: medId,
          points_gained: points,
          points_gained_date: new Date().toISOString(),
          points_expiry_date: expiryDate,
          created_by: adminId,
        })
        .into("point_record")

      await this.knex
        .insert({
          user_id: agentUserId,
          medical_services_id: addPointsId[0].id,
          points_gained: commission,
          points_gained_date: new Date().toISOString(),
          points_expiry_date: expiryDate,
          created_by: adminId,
        })
        .into("point_record")
    })
  }

  async getGiftCost(giftId: number) {
    let result = await this.knex
      .select("cost")
      .from("gifts")
      .where("gifts.id", giftId)
      .first()
    return result.cost as number
  }

  async getUserPoints(userId: number) {
    let sum = await this.knex("point_record")
      .sum("points_gained")
      .where("points_expiry_date", ">", "now()")
      .where("user_id", userId)
    let spent = await this.knex("gifts_history")
      .sum("cost_at_date")
      .where("user_id", userId)
    console.log("sum: ", sum, "spent: ", spent)
    let result = sum[0].sum - spent[0].sum
    console.log("result: ", result)
    return result as number
  }

  async redeemGift(giftId: number, userId: number, cost: number) {
    let expiryDate = add(new Date(), { years: 1 })
    await this.knex
      .insert({
        user_id: userId,
        gift_item_id: giftId,
        cost_at_date: cost,
        claim_date: new Date().toISOString(),
        expiry_date: expiryDate,
      })
      .into("gifts_history")
  }

  async getGifts() {
    return this.knex.select("*").from("gifts").where("status", "active")
  }

  async getAllGifts() {
    return this.knex.select("*").from("gifts").orderBy("created_at")
  }

  async addGift(gift: Gift) {
    await this.knex
      .insert({
        gift_item: gift.gift_item,
        cost: gift.cost,
        description: gift.description,
        created_by: gift.created_by,
      })
      .into("gifts")
  }

  async editGift(id: number, gift: Gift) {
    let result = await this.knex("gifts").where("gifts.id", id).update(gift)
    return result
  }

  async delGift(id: number) {
    await this.knex("gifts")
      .where("gifts.id", id)
      .update({ status: "inactive" })
  }
}
