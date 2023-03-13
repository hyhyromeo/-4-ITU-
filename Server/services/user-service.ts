import { Knex } from "knex"
import { add, format } from "date-fns"
import { hashPassword } from "../hash"

export type Profile = {
  name: string
  email: string
  phone_number: number
  gender: string
  birthday: string
  description: string
  // profile_pic
}
export class UserService {
  constructor(private knex: Knex) {}

  async importAgent(list: Array<any>) {
    for (let i = 0; i < list.length; i++) {
      list[i].name = list[i].__EMPTY
      delete list[i].__EMPTY

      list[i].email = list[i].__EMPTY_1
      delete list[i].__EMPTY_1

      list[i].phone_number = list[i].__EMPTY_2
      delete list[i].__EMPTY_2
    }
    for (let i = 1; i < list.length; i++) {
      await this.knex
        .insert({
          name: list[i].name,
          email: list[i].email,
          phone_number: list[i].phone_number,
          is_agent: true,
        })
        .into("users")
    }
    return list
  }

  async getUserByQR(token: string) {
    let result = await this.knex
      .select("user_id", "name", "membership_no", "phone_number")
      .from("qr_code")
      .innerJoin("users", "users.id", "user_id")
      .where("root", token)
      .andWhere("expiry_time", ">", this.knex.fn.now())
    return result[0]
  }

  async getQR2(userId: number) {
    return this.knex.transaction(async (knex) => {
      let timeDiff = 0
      let row = await this.knex
        .select("root", "expiry_time")
        .from("qr_code")
        .where("user_id", userId)
        .first()
      if (row) {
        timeDiff = new Date(row.expiry_time).getTime() - Date.now()
        if (timeDiff > 0) {
          return { token: row.root, timeDiff }
        }
        await knex("qr_code").where("root", row.root).delete()
      }
      // GenNewToken
      let newExpiryTime = add(new Date(), { minutes: 1 })
      let token = Math.floor(Math.random() * 1000000)
      while (token < 100000) {
        token = token * 10 + Math.floor(Math.random() * 10)
      }
      await this.knex
        .insert({
          user_id: userId,
          root: token,
          expiry_time: newExpiryTime,
        })
        .into("qr_code")
      return { token, timeDiff }
    })
  }

  async createUser(
    email: string,
    password: string,
    phoneNumber?: number | string,
    admin?: boolean,
    agent?: boolean
  ) {
    let passwordHash = await hashPassword(password)
    let tempName = email.split("@")
    // console.log("tempName: ", tempName)
    let membershipNo
    if (admin) {
      let memNo = await this.knex
        .select("membership_no")
        .from("users")
        .where("membership_no", "ilike", "admin%")
        .orderBy("membership_no", "desc")

      // console.log("memNo: ", memNo[0].membership_no)
      let memNo2 = memNo[0].membership_no
      let memNo3 = memNo2.split("#")
      // console.log("memNo3: ", memNo3)
      let n = memNo3[1]
      // console.log("N: ", n)
      let number = parseInt(n)
      number = number + 1
      // console.log("Number: ", number)
      let s = ("000" + number).substr(-3)
      // console.log("S: ", s)
      membershipNo = "Admin#" + s
    } else {
      let getMonth = format(new Date(), "MMM/yyyy")
      let getMonth2 = getMonth.split("/")
      let num = Math.floor(Math.random() * 1000000)
      while (num < 100000) {
        num = num * 10 + Math.floor(Math.random() * 10)
      }
      membershipNo = getMonth2[0] + "#" + num
      // console.log("membershipNo: ", membershipNo)
    }

    return await this.knex
      .insert({
        name: tempName[0],
        email: email,
        password: passwordHash,
        phone_number: phoneNumber == "" ? null : phoneNumber,
        membership_no: membershipNo,
        is_admin: admin,
        is_agent: agent,
      })
      .into("users")
    // .returning("id")
  }

  async editProfile(id: number, profile: Profile) {
    await this.knex("users").where("users.id", id).update(profile)
  }

  async getClaimed(id: number) {
    return await this.knex
      .select("*")
      .from("gifts_history")
      .innerJoin("gifts", "gift_item_id", "gifts.id")
      .where("gifts_history.user_id", id)
  }

  async getAdmin() {
    return await this.knex
      .select("name", "is_admin", "membership_no")
      .from("users")
      .where("is_admin", true)
  }

  async getAgent(phoneNumber: number) {
    let agent = await this.knex
      .select("id", "name", "membership_no", "is_agent", "phone_number")
      .from("users")
      .where("users.phone_number", phoneNumber)
      .where("is_agent", true)
      .first()
    if (!agent) {
      throw new Error("Agent not found")
    }
    return agent
  }

  async getUser(membershipNo: string) {
    let user = await this.knex
      .select("name", "membership_no")
      .from("users")
      .where("users.membership_no", membershipNo)
    if (!user) {
      throw new Error("user not found")
    }
    return user
  }

  async getProfile(id: number) {
    return await this.knex
      .select(
        "users.icon",
        "users.name",
        "users.email",
        "users.membership_no",
        "users.phone_number",
        "users.birthday",
        "users.description",
        "users.agent"
      )
      .from("users")
      .where("users.id", id)
      .first()
  }

  async getPointRecord(id: number) {
    return await this.knex
      .select(
        "user_id",
        "users.name AS created_by",
        "medical_services_id",
        "service",
        "points_gained",
        "points_gained_date",
        "points_expiry_date",
      )
      .from("point_record")
      .innerJoin(
        "medical_services",
        "medical_services_id",
        "medical_services.id"
      )
      .innerJoin("users", "point_record.created_by", "users.id")
      .where("point_record.user_id", id)
  }

  async getUserByEmail(email: string) {
    let user = await this.knex
      .select([
        "id",
        "email",
        "name",
        "password",
        "is_admin",
        "is_agent",
        "icon",
      ])
      .from("users")
      .where({ email })
      .first()
    if (!user) {
      throw new Error("user not found")
    }
    return user
  }

  async changeProfilePicture(user_id: number, icon: string) {
    await this.knex("users").update({ icon }).where({ id: user_id })
  }

  // async loginWithFacebookToken(accessToken: string) {
  //   const res = await fetch(
  //     `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
  //   )
  //   const data: ReactFacebookLoginInfo = await res.json()
  //   let { name, email, picture } = data
  //   let icon = picture?.data.url
  //   try {
  //     let user = await this.getUserByEmail(email!)
  //     return user
  //   } catch (error) {
  //     if (error.message !== "user not found") {
  //       throw error
  //     }
  //     console.log("insert", { name, email, icon })
  //     let [user] = await this.knex
  //       .insert({
  //         email,
  //         name,
  //         icon,
  //       })
  //       .into("users")
  //       .returning(["id", "email", "name", "icon"])
  //     return user
  //   }
  // }
}
