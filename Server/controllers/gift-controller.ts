import express from "express";
import { GiftService } from "../services/gift-service";
import "../request";

export class GiftController {
  constructor(private giftService: GiftService) {}

  getPointRecord = async (req: express.Request, res: express.Response) => {
    try {
      let userId = req.body.userId;
      let adminId = req.body.adminId;
      let pointRecord = await this.giftService.getPointRecord(userId, adminId);
      res.status(200).json(pointRecord);
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to get admin edit point history.");
    }
  };

  addPoints = async (req: express.Request, res: express.Response) => {    
    try {
      let userId = req.body.userId;
      let medId = req.body.medicalServiceId;
      let points = req.body.points;
      let adminId = req.jwtPayload.id;
      let agentUserId = req.body.agentUserId;
      let commission = req.body.commission;
      await this.giftService.addPoints(
        userId,
        medId,
        points,
        adminId,
        commission,
        agentUserId,
      );
      res.json({ status: "Points added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Failed to add points." });
    }
  };

  getGiftCost = async (req: express.Request, res: express.Response) => {
    try {
      let giftId = parseInt(req.params.id);
      let cost = await this.giftService.getGiftCost(giftId);
      res.json(cost);
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to get gift cost.");
    }
  };

  getUserPoints = async (req: express.Request, res: express.Response) => {
    try {
      let userId = req.jwtPayload.id;
      let points = await this.giftService.getUserPoints(userId);
      res.json(points);
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to get points.");
    }
  };

  redeemGift = async (req: express.Request, res: express.Response) => {
    try {
      let giftId = req.body.giftId;
      let cost = req.body.cost;
      let userId = req.body.userId;
      let availablePts = await this.giftService.getUserPoints(userId);
      if (availablePts < cost) {
        res.status(400).end({ msg: "Insufficient points." });
        return;
      }
      if (availablePts >= cost) {
        await this.giftService.redeemGift(giftId, userId, cost);
        res.json({ msg: "Gift claimed." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Fail Redeem" });
    }
  };

  getGifts = async (req: express.Request, res: express.Response) => {
    try {
      let giftsList = await this.giftService.getGifts();
      giftsList.map((gift) => {
        gift.mode = "view";
      });
      res.json(giftsList);
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to get gift list.");
    }
  };

  getAllGifts = async (req: express.Request, res: express.Response) => {
    try {
      let fullGiftsList = await this.giftService.getAllGifts();
      res.json(fullGiftsList);
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to get full gift list.");
    }
  };

  addGift = async (req: express.Request, res: express.Response) => {
    try {
      await this.giftService.addGift({
        gift_item: req.body.giftItem,
        cost: req.body.cost,
        description: req.body.description,
        created_by: req.jwtPayload.id,
      });
      res.json("Gift added");
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to add gift.");
    }
  };

  editGift = async (req: express.Request, res: express.Response) => {
    try {
      console.log(req.body);

      // let id = parseInt(req.params.id)
      let id = parseInt(req.body.id);
      await this.giftService.editGift(id, {
        gift_item: req.body.editGiftItem,
        cost: req.body.editCost,
        description: req.body.editDescription,
        status: req.body.editStatus,
        edited_by: req.jwtPayload.id,
      });
      // let giftsList = await this.giftService.getGifts()
      // giftsList.map((gift) => {
      //   gift.mode='view'
      // })
      res.json({ msg: "Gift edited" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Failed to edit gift." });
    }
  };
  delGift = async (req: express.Request, res: express.Response) => {
    try {
      let id = parseInt(req.params.id);
      if (!id) {
        res.status(400).end("Missing service ID.");
      }
      await this.giftService.delGift(id);
      res.status(200).json({ msg: "Service deactivated" });
    } catch (error) {
      console.log(error);
      res.status(500).end("Failed to del service.");
    }
  };
}
