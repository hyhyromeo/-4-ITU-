import { MedicalServiceState, medical_service } from './state'

export function getMedicalServiceAction(medical_service: medical_service[]) {
  return {
    type: '@@medical/getMedicalService' as const,
    medical_service,
    // status: "active"
  }
}

export function delMedicalServiceAction(id: number) {
  return {
    type: '@@medical/delMedicalService' as const,
    id
  }
}
export function failAction(status: string) {
  return {
    type: '@@medical/failAction' as const,
    status: 'Fail',
  }
}
export function addMedicalServiceAction(medical_service: medical_service[]) {
  return {
    type: '@@medical/addMedicalServiceAction' as const,
    medical_service,
    // status: 'Success',
  }
}

export function addPointAction(md: MedicalServiceState) {
  return {
    type: '@@medical/addPointAction' as const,
    md,
    status: 'Success',
  }
}
export function clearStatus() {
  return {
    type: '@@clearStatus' as const,
    status: '',
  }
}
export function wantToEditServiceAction(id: number) {
  return {
    type: "@@edit/wantToEditService" as const,
    id,
  };
}
export function editServiceFailAction(msg: string) {
  return {
    type: "@@edit/failEditService" as const,
    msg,
  };
}
export function cancelEditServiceAction(id: number) {
  return {
    type: "@@edit/cancelServiceEdit" as const,
    id,
  };
}

export type medicalServiceAction = ReturnType<
  | typeof getMedicalServiceAction
  | typeof failAction
  | typeof addMedicalServiceAction
  | typeof addPointAction
  | typeof clearStatus
  | typeof delMedicalServiceAction
  | typeof wantToEditServiceAction
  | typeof editServiceFailAction
  | typeof cancelEditServiceAction

>
