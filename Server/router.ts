import express from "express"
import { Multer } from "multer"
import { requireJWT, requireAdmin } from "./guards"
import { UserController } from "./controllers/user-controller"
import { GiftController } from "./controllers/gift-controller"
import { MedServicesController } from "./controllers/medServices-controller"
import { NewsAndPromotionController } from "./controllers/newsAndPromotion-controller"

export function createRouter(options: {
  upload: Multer
  // tempUpload: Multer
  requireAdmin: express.RequestHandler
  requireJWT: express.RequestHandler
  userController: UserController
  giftController: GiftController
  medServicesController: MedServicesController
  newsAndPromotionController: NewsAndPromotionController
}) {
  const {
    upload,
    // tempUpload,
    medServicesController,
    giftController,
    userController,
    newsAndPromotionController,
  } = options

  let router = express.Router()

  // user routes
  router.post(
    "/user/icon",
    requireJWT,
    upload.single("icon"),
    userController.changeProfilePicture
  )
  router.post("/login", userController.login)
  router.post("/adminRegister", requireAdmin, userController.adminRegister)
  router.post("/register", userController.register)
  router.get("/profile", requireJWT, userController.getProfile)
  router.patch("/profile", requireJWT, userController.editProfile)
  router.get("/claimed", requireJWT, userController.getClaimed)
  router.get("/user", userController.getUser)
  router.post("/agent", requireAdmin, userController.getAgent)
  router.get("/admin", requireAdmin, userController.getAdmin)
  router.post("/QRscan/genQr", requireJWT, userController.getQR)
  router.get("/QRscan/:qrCode", requireAdmin, userController.getUserByQR)
  router.post("/QRscan", requireAdmin, userController.getUserByQRPW)
  // router.post(
  //   "/importAgent",
  //   requireAdmin,
  //   tempUpload.single("agentList"),
  //   userController.importAgent
  // )

  // gift routes
  router.get("/gifts/", giftController.getGifts)
  router.get("/allGifts/", requireAdmin, giftController.getAllGifts)
  router.post("/gifts/", requireAdmin, giftController.addGift)
  router.post("/gifts/edit", requireAdmin, giftController.editGift)
  router.delete("/gifts/:id", requireAdmin, giftController.delGift)
  router.post("/redemption", requireAdmin, giftController.redeemGift)
  router.get("/points", requireAdmin, giftController.getUserPoints)
  router.post("/pointAddition", requireAdmin, giftController.addPoints)
  router.get("/giftCost", giftController.getGiftCost)
  //admin point edit history
  router.post("/pointRecord", requireAdmin, giftController.getPointRecord)

  // medical services routes
  router.get("/medServices", medServicesController.getServices)
  router.get("/allMedServices", medServicesController.getAllServices)
  router.post("/medServices", requireAdmin, medServicesController.addService)
  router.post(
    "/medServices/edit",
    requireAdmin,
    medServicesController.editService
  )
  router.delete(
    "/medServices/:id",
    requireAdmin,
    medServicesController.delService
  )
  router.post("/consultation", requireAdmin, medServicesController.useService)
  router.get("/medHistory", requireJWT, medServicesController.getMedHistory)

  // news and promotion routes
  router.get(
    "/newsAndPromotion/",
    newsAndPromotionController.getAllNewsAndPromotions
  )
  router.post(
    "/newsAndPromotion/",
    upload.single("newsImage"),
    newsAndPromotionController.createNewsAndPromotion
  )
  router.patch(
    "/newsAndPromotion/:id",
    newsAndPromotionController.updateNewsAndPromotion
  )
  router.delete(
    "/newsAndPromotion/:id",
    newsAndPromotionController.deleteNewsAndPromotion
  )

  return router
}
