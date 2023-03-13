import { Knex } from "knex"
// import { format } from "date-fns"

export type MedService = {
  service: string
  point: number
  price: number
  description: string
  medical_center_id: number
  doctor_id?: number
  status?: "active" | "inactive"
}

export class MedServicesService {
  constructor(private knex: Knex) {}

  async getMedHistory(userId: number) {
    return await this.knex
      .select("service", "point", "service_at_date")
      .from("medical_history")
      .innerJoin(
        "medical_services",
        "medical_services_id",
        "medical_services.id"
      )
      .where("user_id", userId)
  }

  async useService(user_id: number, medical_services_id: number) {
    await this.knex
      .insert({
        user_id: user_id,
        medical_services_id: medical_services_id,
        service_at_date: new Date().toISOString(),
      })
      .into("medical_history")
  }

  async getServices() {
    return await this.knex
      .select("*")
      .from("medical_services")
      .where("status", "active")
  }

  async getAllServices() {
    return await this.knex.select("*").from("medical_services")
  }

  async addService(medService: MedService) {
    await this.knex
      .insert({
        service: medService.service,
        point: medService.point,
        price: medService.price,
        description: medService.description,
        medical_center_id: medService.medical_center_id,
        doctor_id: medService.doctor_id,
        status: medService.status,
      })
      .into("medical_services")
  }

  async editService(id: number, medService: MedService) {
    console.log("medService@@@", medService);
    
    await this.knex("medical_services")
      .where("medical_services.id", id)
      .update(medService)
  }
  async delService(id: number) {
    await this.knex("medical_services")
      .where("medical_services.id", id)
      .update({'status':"inactive"})
  }
}
