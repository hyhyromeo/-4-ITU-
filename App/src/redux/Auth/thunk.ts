import { IRootState, IRootThunkDispatch } from "../store";
import {
  failedAction,
  loginFailedAction,
  loginLoadTokenAction,
  logoutAction,
  signUpFailedAction,
  uploadedIconAction,
} from "./action";
import { History } from "history";
import { showToast } from "stencil-lib/components/ion-toast/ion-toast";
import { ResponseJSON, UpdateProfilePictureResult } from "../../../../Shared/";

const { REACT_APP_API_SERVER } = process.env;

export function logoutThunk(history: History) {
  return (dispatch: IRootThunkDispatch) => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
    history.replace("/onboarding");
  };
}

// export function loginFacebookThunk(accessToken: string, history: History) {
//   return async (dispatch: IRootThunkDispatch) => {
//     const res = await fetch(`${REACT_APP_API_SERVER}/login/facebook`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json; charset=utf-8",
//       },
//       body: JSON.stringify({ accessToken }),
//     });
//     const result = await res.json();

//     if (res.status !== 200) {
//       dispatch(loginFailedAction(result.msg));
//     } else {
//       let { token } = result.data;
//       localStorage.setItem("token", token);
//       dispatch(loginLoadTokenAction(token));
//       history.push("/");
//     }
//   };
// }

export function changeProfilePictureThunk(file: File, history: History) {
  return async (dispatch: IRootThunkDispatch, getState: () => IRootState) => {
    const state = getState();
    const token = state.auth.token;
    if (!token) {
      dispatch(failedAction("Need to login first"));
      history.push("/login");
      return;
    }
    let formData = new FormData();
    formData.set("icon", file);
    const res = await fetch(`${REACT_APP_API_SERVER}/user/icon`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const result: ResponseJSON<UpdateProfilePictureResult> = await res.json();

    if (result.ok) {
      dispatch(uploadedIconAction(file, result.data.icon));
      localStorage.setItem("token", result.data.token);
      dispatch(loginLoadTokenAction(result.data.token));
    } else {
      dispatch(failedAction(result.error));
    }
  };
}

export function loginThunk(loginFormData: object, history: History) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      //formData no need header
      body: JSON.stringify(loginFormData),
    });
    const result = await res.json();

    if (res.status !== 200) {
      dispatch(loginFailedAction(result.msg));
    } else {
      // console.log("dispatch", result);
      localStorage.setItem("token", result.data.token);
      dispatch(loginLoadTokenAction(result.data.token));
      history.push("/home")
      // window.location.reload()
    }
  };
}

export function signUpThunk(registerData: object, history: History) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      //formData no need header
      body: JSON.stringify(registerData),
    });
    const result = await res.json();
    if (!res.ok) {
      dispatch(signUpFailedAction(result.msg));
      showToast({
        message: "Fail to create user, please confirm yours information",
        duration: 2000,
      });
    } else {
      //notification of created user
      showToast({ message: "User Created", duration: 2000 });
      history.push("/login");
    }
  };
}
