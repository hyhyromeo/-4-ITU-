import express from "express"
import cors from "cors"
import aws from "aws-sdk"
import multerS3 from "multer-s3"
import multer from "multer"

import { config } from "dotenv"
import { knex } from "./db"
import { createRouter } from "./router"
import { requireJWT, requireAdmin } from "./guards"
import { UserController } from "./controllers/user-controller"
import { UserService } from "./services/user-service"
import { GiftController } from "./controllers/gift-controller"
import { GiftService } from "./services/gift-service"
import { MedServicesController } from "./controllers/medServices-controller"
import { MedServicesService } from "./services/medServices-service"
import { NewsAndPromotionController } from "./controllers/newsAndPromotion-controller"
import { NewsAndPromotionService } from "./services/newsAndPromotion-service"

let KB = 1024
let MB = 1024 * KB

config()
let { PORT } = process.env

const app = express()

app.use(express.static("uploads"))
// app.use(express.json() as any)
// app.use(express.urlencoded({ extended: true }) as any)
app.use(cors())
app.use(express.json({ limit: "5mb" }) as any)
app.use(express.urlencoded({ extended: true, limit: "5mb" }) as any)

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
})

const upload = multer({
  limits: {
    files: 1,
    fileSize: 5 * MB,
  },
  fileFilter: (req, file, cb) => cb(null, true),
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET!,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname })
    },
    key: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`)
    },
  }),
})

// let tempStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads")
//   },
//   filename: (req, file, cb) => {
//     let filename = file.fieldname + "-" + Date.now() + "-" + file.originalname
//     cb(null, filename)
//   },
// })
// let tempUpload = multer({ storage: tempStorage })

let userService = new UserService(knex)
let giftService = new GiftService(knex)
let medServicesService = new MedServicesService(knex)
let newsAndPromotionService = new NewsAndPromotionService(knex)
let userController = new UserController(userService, giftService)
let giftController = new GiftController(giftService)
let medServicesController = new MedServicesController(medServicesService)
let newsAndPromotionController = new NewsAndPromotionController(newsAndPromotionService)

// let upload = multer({ storage })

let router = createRouter({
  upload,
  // tempUpload,
  userController,
  giftController,
  medServicesController,
  newsAndPromotionController,
  requireJWT,
  requireAdmin,
})
app.use(router)

app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT)
})
