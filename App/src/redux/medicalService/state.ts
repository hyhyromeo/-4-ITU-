export type medical_service = {
  id: number;
  service: string;
  point: number;
  price: number;
  description: string;
  medical_center_id: number;
  status: string;
  mode:string
};
export type MedicalServiceState = {
  medicalServices: medical_service[];
  status: string;
};
export const initialMedicalServiceState: MedicalServiceState = {
  medicalServices: [],
  status: "",
};
