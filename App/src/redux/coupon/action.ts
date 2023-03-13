import { coupon, CouponState } from "./state";

export function gotCouponAction(coupons: coupon[]) {
  return {
    type: "@@coupon/gotCouponAction" as const,
    coupons,
  };
}
export function addCouponAction(coupons: coupon[]) {
  return {
    type: "@@coupon/addCouponAction" as const,
    coupons,
    status: "Success",
  };
}
export function addCouponFailAction(status: string) {
  return {
    type: "@@coupon/addCouponFail" as const,
    status: "Fail",
  };
}

export function redeemCouponAction(couponHistory: CouponState) {
  return {
    type: "@@coupon/redeemCoupon" as const,
    couponHistory,
    status: "Success",
  };
}

export function redeemFailAction(status: string) {
  return {
    type: "@@coupon/redeemFail" as const,
    status: "Fail",
  };
}
export function clearStatus() {
  return {
    type: "@@clearStatus" as const,
    status: "",
  };
}

export function wantToEditCouponAction(id: number) {
  return {
    type: "@@edit/wantToEdit" as const,
    id,
  };
}

export function cancelEditCouponAction(id: number) {
  return {
    type: "@@edit/cancelEdit" as const,
    id,
  };
}

export function editFailAction(msg: string) {
  return {
    type: "@@edit/failEditCoupon" as const,
    msg,
  };
}
export function delFailAction(msg: string) {
  return {
    type: "@@edit/failDelCoupon" as const,
    msg,
  };
}
export function delCouponAction(id: number) {
  return {
    type: "@@coupon/delCouponAction" as const,
    id,
  };
}
export type CouponAction = ReturnType<
  | typeof redeemCouponAction
  | typeof redeemFailAction
  | typeof gotCouponAction
  | typeof addCouponAction
  | typeof clearStatus
  | typeof addCouponFailAction
  | typeof wantToEditCouponAction
  | typeof editFailAction
  | typeof cancelEditCouponAction
  | typeof delFailAction
  | typeof delCouponAction
>;
