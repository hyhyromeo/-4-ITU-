import { showToast } from "stencil-lib/components/ion-toast/ion-toast";
import { IRootThunkDispatch } from "../store";
import { genQrCodeFailedAction, genQrCodeSuccessAction, gotAgentAction, getAgentFailAction, gotProfilesAction, profileFailAction, scanQrFailedAction, scanQrSuccessAction } from "./action";
import { History } from "history";


const { REACT_APP_API_SERVER } = process.env;

export function getProfile() {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(profileFailAction(result.msg));
    } else {
      dispatch(gotProfilesAction(result));
    }
  };
}

export function getAgent(phoneNumber:number) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/agent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        phoneNumber
      }),
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(getAgentFailAction(result.msg));
    } else {
      dispatch(gotAgentAction(result));
    }
  };
}


export function getClientInfoThunk(qrCode: string, history: History) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/QRscan/${JSON.parse(qrCode)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    console.log("scan qr code res =>",result);
    
    if (!res.ok) {
      console.log("result is what",result);

      dispatch(scanQrFailedAction(result.msg));
    } else {
      //notification of created user
      showToast({ message: "Find user", duration: 2000 });
      history.push("/admin/Panel");
      dispatch(scanQrSuccessAction(result))
    }
  };
}

export function getClientInfoByTextThunk(qrPw: object, history: History) {
  return async (dispatch: IRootThunkDispatch) => {
    
    const res = await fetch(`${REACT_APP_API_SERVER}/QRscan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(qrPw),
    });
    
    const result = await res.json();
    console.log("input qrpw result", result);
    
    if (!res.ok) {
      dispatch(scanQrFailedAction(result.msg));
    } else {
      //notification of created user
      showToast({ message: "Find user", duration: 2000 });
      history.push("/admin/Panel");
      dispatch(scanQrSuccessAction(result))
    }
  };
}

export function genQrCodeThunk (qrCode: string|null) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/QRscan/genQr`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(qrCode),
    });
    const result = await res.json();
    if (!res.ok) {
      dispatch(genQrCodeFailedAction(result.msg));
    } else {
      dispatch(genQrCodeSuccessAction(result.token, result.timeDiff))
    }
  };
}

