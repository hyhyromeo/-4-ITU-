import { confirmState } from "../../components/CouponComponent";
import { IRootThunkDispatch } from "../store";
import {
  addCouponAction,
  addCouponFailAction,
  delCouponAction,
  delFailAction,
  editFailAction,
  gotCouponAction,
  redeemCouponAction,
  redeemFailAction,
} from "./action";

const { REACT_APP_API_SERVER } = process.env;

export function getCoupon() {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/gifts`, {
      method: "GET",
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(redeemFailAction(result.status));
    } else {
      //   dispatch(couponRedeemAction(result.localToken))
      dispatch(gotCouponAction(result));
    }
  };
}

export function addCoupon(add: any) {
  console.log("add coupon data = ", add); //for confirm

  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/gifts`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(addCouponFailAction(result.status));
    } else {
      dispatch(addCouponAction(result));
      dispatch(getCoupon());
      console.log("result;", result); //checking
    }
  };
}

export function redeemCoupon(add: any) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/redemption`, {
      method: "POST",
      body: JSON.stringify(add),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();

    if (res.status !== 200) {
      console.log("redeem Fail;", result);

      dispatch(redeemFailAction(result.status));
    } else {
      dispatch(redeemCouponAction(result));
      dispatch(getCoupon());
      console.log("result;", result); //checking
    }
  };
}

export function editCouponThunk(newCoupon: confirmState) {
  console.log("newCoupon", newCoupon);

  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/gifts/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newCoupon),
    });
    const result = await res.json();
    console.log("result", result);

    if (!res.ok) {
      dispatch(editFailAction(result.msg));
    } else {
      dispatch(getCoupon());
    }
  };
}

export function delCoupon(id: number) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/gifts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const result = await res.json();
    if (res.status !== 200) {
      dispatch(delFailAction(result.status));
    } else {
      dispatch(delCouponAction(id));
      console.log("result;", result); //checking
    }
  };
}
