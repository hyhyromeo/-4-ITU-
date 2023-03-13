import express from "express"
import "../request"
import jwt from "../jwt"
import jwtSimple from "jwt-simple"
import decodeJWT from "jwt-decode"
import { UpdateProfilePictureResult } from "../../Shared"
import { checkPassword } from "../hash"
import { Profile, UserService } from "../services/user-service"
import { GiftService } from "../services/gift-service"
// import XLSX from "xlsx"

export class UserController {
  constructor(
    private userService: UserService,
    private giftService: GiftService
  ) {}

  changeProfilePicture = async (
    req: express.Request,
    res: express.Response
  ) => {
    if (!req.file) {
      res.status(400).json({ ok: false, msg: "Missing file in request.body" })
      return
    }
    let file = req.file as any
    let icon = file.key
    if (!icon) {
      res.status(400).json({ ok: false, msg: "Missing key in s3 multer file" })
      return
    }

    // Optional: because the router can call guard middleware to ensure this field exists
    // if (!req.jwtPayload) {
    //   res.status(400).json({ ok: false, msg: 'Missing jwtPayload in request' })
    // }

    let user_id = req.jwtPayload!.id

    try {
      await this.userService.changeProfilePicture(user_id, icon)
      let payload = req.jwtPayload!
      payload.icon = icon
      let token = jwtSimple.encode(payload, jwt.jwtSecret)
      let data: UpdateProfilePictureResult = {
        icon,
        token,
      }
      res.json({ ok: true, data })
    } catch (error) {
      console.error(error)
      res.status(500).json({ ok: false, msg: error.message })
    }
  }

  // importAgent = async (req: express.Request, res: express.Response) => {
  //   try {
  //     let agentList = req.file
  //     let abc = XLSX.readFile(agentList.path)
  //     let json = XLSX.utils.sheet_to_json(abc.Sheets[abc.SheetNames[0]])
  //     let finalList = await this.userService.importAgent(json)
  //     res.json(finalList)
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({ msg: "Failed to import agents." })
  //   }
  // }

  getUserByQR = async (req: express.Request, res: express.Response) => {
    try {
      let { qrCode } = req.params
      let result = await this.userService.getUserByQR(qrCode)
      console.log("Result from getUserByQR: ", result)
      // console.log("Result.user_id: ", result.user_id)
      if (result == undefined) {
        res.status(500).json({ msg: "Token does not existed." })
        return
      }
      let availablePts = await this.giftService.getUserPoints(result.user_id)

      res.status(200).json({ ...result, availablePts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Failed to get user." })
    }
  }

  getUserByQRPW = async (req: express.Request, res: express.Response) => {
    try {
      let qrPw = req.body.qrPw
      let result = await this.userService.getUserByQR(qrPw)
      console.log("getUserByQRPW", result)
      // console.log("Result.user_id: ", result.user_id)
      if (result == undefined) {
        res.status(500).json({ msg: "Token does not existed." })
        return
      }
      let availablePts = await this.giftService.getUserPoints(result.user_id)

      res.status(200).json({ ...result, availablePts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Failed to get user." })
    }
  }

  getQR = async (req: express.Request, res: express.Response) => {
    try {
      let userId = req.jwtPayload.id
      let result = await this.userService.getQR2(userId)
      JSON.stringify(result.token)
      res
        .status(200)
        .json({ status: "ok", token: result.token, timeDiff: result.timeDiff })
    } catch (error) {
      res.status(500).json({ msg: "Unable to gen QRcode." })
    }
  }
  getAdmin = async (req: express.Request, res: express.Response) => {
    try {
      let adminList = await this.userService.getAdmin()
      res.json(200).json(adminList)
    } catch (error) {
      console.log(error)
      res.status(500).end("Not an agent.")
    }
  }

  getAgent = async (req: express.Request, res: express.Response) => {
    try {
      let phoneNumber = req.body.phoneNumber
      let agent = await this.userService.getAgent(phoneNumber)
      res.json(agent)
    } catch (error) {
      console.log(error)
      res.status(500).json({msg:"Not an agent."})
    }
  }

  getUser = async (req: express.Request, res: express.Response) => {
    try {
      let membershipNo = req.body.membershipNo
      let user = await this.userService.getUser(membershipNo)
      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to get user by membership No.")
    }
  }

  getClaimed = async (req: express.Request, res: express.Response) => {
    try {
      let id = req.jwtPayload.id
      let rewardList = await this.userService.getClaimed(id)
      res.json(rewardList)
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to get claimed list.")
    }
  }

  getProfile = async (req: express.Request, res: express.Response) => {
    try {
      let id = req.jwtPayload.id
      let profile = await this.userService.getProfile(id)
      let record = await this.userService.getPointRecord(id)
      let availablePts = await this.giftService.getUserPoints(id)
      res.json({ profile, record, availablePts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Failed to get profile." })
    }
  }

  editProfile = async (req: express.Request, res: express.Response) => {
    try {
      console.log("req.body in editprofile (usercontroller)", req.body)

      let tokenEncoded = req.headers.authorization
      let tokenDecoded: any = decodeJWT(tokenEncoded!.split("Bearer ")[1])
      console.log("tokenDecoded", tokenDecoded)
      let profile: Profile = req.body.edit
      await this.userService.editProfile(tokenDecoded.id, profile)
      res.json({ msg: "Profile updated." })
    } catch (error) {
      console.log(error)
      res.status(500).json({ msg: "Failed to update profile" })
      res.json({ msg: "Unable to locate user." })
    }
  }

  login = async (req: express.Request, res: express.Response) => {
    try {
      if (!req.body.email) {
        res.status(403).json({ msg: "Invalid email" })
        return
      }
      if (!req.body.password) {
        res.status(403).json({ msg: "Invalid password" })
        return
      }
      let user = await this.userService.getUserByEmail(req.body.email)
      if (!user) {
        res.status(403).json({ msg: "Unable to locate user" })
        return
      }
      if (!user.password) {
        res.status(403).json({ msg: "You didn't signup with password" })
        return
      }
      let matched = await checkPassword(req.body.password, user.password)
      if (!matched) {
        res.status(403).json({
          msg: "wrong username or password",
        })
        return
      }
      delete user.password

      //gen local token
      let token = jwtSimple.encode(user, jwt.jwtSecret)
      res.status(200).json({
        isSuccess: true,
        data: { token },
      })
    } catch (error) {
      res.status(400).json({ msg: "Unable to locate user." })
    }
  }

  adminRegister = async (req: express.Request, res: express.Response) => {
    let email = req.body.email
    if (!email) {
      res.status(400).json({ msg: "Missing email." })
      return
    }
    let password = req.body.password
    if (!password) {
      res.status(400).json({ msg: "Missing password." })
      return
    }
    let phoneNumber = req.body.phoneNumber
    
    let admin
    let agent
    let role = req.body.role
    console.log("Role: ", role)
    if (role == "admin") {
      admin = true
    }
    if (role == "agent") {
      agent = true
    }

    let result = await this.userService.createUser(
      email,
      password,
      phoneNumber,
      admin,
      agent
    )
    console.log("result: ", { result })
    if (result) {
      res.status(201).json({ msg: "Created User" })
    } else {
      console.log(result)
      res.status(500).json({ msg: "Failed to create user" })
    }
  }

  register = async (req: express.Request, res: express.Response) => {
    let email = req.body.email
    if (!email) {
      res.status(400).json({ msg: "Missing email" })
      return
    }
    let password = req.body.password
    if (!password) {
      res.status(400).json({ msg: "Missing password" })
      return
    }
    let phoneNo = req.body.phoneNumber
    let result = await this.userService.createUser(email, password, phoneNo)
    console.log("result: ", { result })
    if (result) {
      res.status(201).json({ msg: "Created User" })
    } else {
      console.log(result)
      res.status(500).json({ msg: "Failed to create user" })
    }
  }

  // loginWechat= async (req: express.Request, res: express.Response) => {
  //       // getAccessToken(req.query.code, (access) => {
  //       //     getUserInfo(access.access_token, access.openid, (user) => {
  //       //         res.set('Content-Type', 'text/html')
  //       //         res.send(template.replace(/WECHAT_LOGIN_REPLACE_ME/, JSON.stringify(user)));
  //       //     });
  //       // });
  //       console.log("login with Wechat");
  //       res.status(200).json({
  //         ok: true,
  //         data: { 'msg':'test ok' },
  //       })
  //   }

  // loginFacebook = async (req: express.Request, res: express.Response) => {
  //   let { accessToken } = req.body
  //   if (!accessToken) {
  //     res.status(400).json({
  //       ok: false,
  //       msg: "Missing accessToken in req.body",
  //     })
  //     return
  //   }
  //   try {
  //     let user = await this.userService.loginWithFacebookToken(accessToken)
  //     let token = jwtSimple.encode(user, jwt.jwtSecret)
  //     res.status(200).json({
  //       ok: true,
  //       data: { token },
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     res.status(500).json({
  //       ok: false,
  //       msg: error.message,
  //     })
  //   }
  // }
}
