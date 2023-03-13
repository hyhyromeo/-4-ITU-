import { editServiceState } from "../../components/medicalServiceComponent";
import { IRootThunkDispatch } from "../store";
import {
  addMedicalServiceAction,
  addPointAction,
  delMedicalServiceAction,
  editServiceFailAction,
  failAction,
  getMedicalServiceAction,
} from "./action";

const { REACT_APP_API_SERVER } = process.env;
export function getMedicalService() {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/medServices`, {
      method: "GET",
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(failAction(result.status));
    } else {
      //   dispatch(couponRedeemAction(result.localToken))
      dispatch(getMedicalServiceAction(result));
    }
  };
}
export function addMedicalService(add: any) {
  console.log("add MedicalService data = ", add); //for confirm

  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/medServices`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(failAction(result.status));
    } else {
      dispatch(addMedicalServiceAction(result));
      dispatch(getMedicalService());
      console.log("result;", result); //checking
    }
  };
}

export function delMedicalService(id: number) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/medServices/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(failAction(result.status));
    } else {
      dispatch(delMedicalServiceAction(id));
      console.log("result;", result); //checking
    }
  };
}
export function addPointThunk(add: any) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/pointAddition`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(add),
    });
    const result = await res.json();
    if (!res.ok) {
      dispatch(failAction(result.status));
    } else {
      dispatch(addPointAction(result));
      console.log("result;", result); //checking
    }
  };
}
export function editServiceThunk(newService: editServiceState) {
  console.log("newService", newService);   

  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/medServices/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newService),
    });
    const result = await res.json();
    console.log("result", result);

    if (!res.ok) {
      dispatch(editServiceFailAction(result.msg));
    } else {
      dispatch(getMedicalService());
    }
  };
}