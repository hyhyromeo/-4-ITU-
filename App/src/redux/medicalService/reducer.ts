import { medicalServiceAction } from "./action";
import { initialMedicalServiceState, MedicalServiceState } from "./state";

export let MedicalServiceReducer = (
  state: MedicalServiceState = initialMedicalServiceState,
  action: medicalServiceAction
): MedicalServiceState => {
  switch (action.type) {
    case "@@medical/getMedicalService": {
      return {
        ...state,
        medicalServices: action.medical_service,
        // status: action.status,
      };
    }
    case "@@medical/addMedicalServiceAction": {
      return {
        ...state,
        // status: action.status,
      };
    }
    case "@@medical/failAction": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "@@medical/addPointAction": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "@@clearStatus": {
      return {
        ...state,
        status: action.status,
      };
    }  case '@@medical/delMedicalService': {
      return {
        ...state,
        medicalServices:state.medicalServices.filter(s=>s.id!==action.id)
      };
    }
    case "@@edit/wantToEditService": {
      let targetId: number = action.id;
      let updatedState = { ...state };
      updatedState.medicalServices.forEach((item) => {
        console.log("item", item);
        
        if (targetId === item.id) {
          item.mode = "edit";
        }
      });
      return { ...updatedState, medicalServices: [...updatedState.medicalServices] };
    }

    case "@@edit/cancelServiceEdit": {
      let targetId: number = action.id;
      let updatedState = { ...state };
      updatedState.medicalServices.forEach((item) => {
        if (targetId === item.id) {
          item.mode = "view";
        }
      });
      return { ...updatedState, medicalServices: [...updatedState.medicalServices] };
    }
    default:
      return state;
  }
};
