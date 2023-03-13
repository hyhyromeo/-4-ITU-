import express from "express"
import { MedServicesService } from "../services/medServices-service"

export class MedServicesController {
  constructor(private medServicesService: MedServicesService) {}

  getMedHistory = async (req: express.Request, res: express.Response) => {
    try {
      let id = req.jwtPayload.id
      let medicalHistory = await this.medServicesService.getMedHistory(id)
      res.json(medicalHistory)
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to get medical history.")
    }
  }

  useService = async (req: express.Request, res: express.Response) => {
    try {
      await this.medServicesService.useService(
        req.body.userId,
        req.body.medServiceId
      )
      res.json("Event registered.")
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to register service.")
    }
  }

  getServices = async (req: express.Request, res: express.Response) => {
    try {
      let medServicesList = await this.medServicesService.getServices()
      medServicesList.map((service) => {
        service.mode ="view"
      })
      res.json(medServicesList)
    } catch (error) {
      console.log(error)
      res.status(500).json({msg:"Failed to get medical services list."})
    }
  }

  getAllServices = async (req: express.Request, res: express.Response) => {
    try {
      let allMedServicesList = await this.medServicesService.getAllServices()
      res.json(allMedServicesList)
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to get all medical services list.")
    }
  }

  addService = async (req: express.Request, res: express.Response) => {
    try {
      await this.medServicesService.addService({
        service: req.body.service,
        point: req.body.point,
        price: req.body.price,
        description: req.body.description,
        medical_center_id: req.body.medical_center_id,
        doctor_id: req.body.doctor_id,
        status: req.body.status,
      })
      res.json("Service added")
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to add service.")
    }
  }

  editService = async (req: express.Request, res: express.Response) => {
    try {
      // let id = parseInt(req.params.id)
      let id = parseInt(req.body.id)

      await this.medServicesService.editService(id, {
        service: req.body.service,
        point: req.body.point,
        price: req.body.price,
        description: req.body.description,
        medical_center_id: req.body.medical_center_id,
        doctor_id: req.body.doctor_id,
        status: req.body.status,
      })
      res.json({msg:"Service edited"})
    } catch (error) {
      console.log(error)
      res.status(500).json({msg:"Failed to edit service."})
    }
  }

  delService = async (req: express.Request, res: express.Response) => {
    try {
      let id = parseInt(req.params.id)
      if (!id) {
        res.status(400).end("Missing service ID.")
      }
      await this.medServicesService.delService(id)
      res.status(200).json({ msg: "Service deactivated" })
    } catch (error) {
      console.log(error)
      res.status(500).end("Failed to del service.")
    }
  }
}
