import { IRootThunkDispatch } from "../store";
import {
  getClaimedAction,
  gotProfilesAction,
  profileFailAction,
} from "./action";

const { REACT_APP_API_SERVER } = process.env;

// fetch token from backend and store in localstorage
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
      // dispatch(getProfile());

      console.log("result;", result);
    }
  };
}
export function getClaimed() {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/claimed`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(profileFailAction(result.msg));
    } else {
      // dispatch(getClaimed());
      dispatch(getClaimedAction(result));
      console.log("result;", result);
    }
  };
}

export function editProfile(edit: any) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/profile`, {
      method: "PATCH",
      body: JSON.stringify({ edit }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(profileFailAction(result.msg));
    } else {
      dispatch(gotProfilesAction(result));
      console.log("result;", result);
    }
  };
}
