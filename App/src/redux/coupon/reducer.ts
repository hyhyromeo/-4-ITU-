import { CouponAction } from "./action";
import { CouponState, initialCouponState } from "./state";

export let CouponReducer = (
  state: CouponState = initialCouponState,
  action: CouponAction
): CouponState => {
  switch (action.type) {
    case "@@coupon/gotCouponAction": {
      return {
        ...state,
        coupons: action.coupons,
      };
    }
    case "@@coupon/addCouponAction": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "@@coupon/redeemCoupon": {
      return {
        ...state,
        status: action.status,
      };
    }
    case "@@coupon/redeemFail": {
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
    }
    case "@@edit/wantToEdit": {
      let targetId: number = action.id;
      let updatedState = { ...state };
      updatedState.coupons.forEach((item) => {
        if (targetId === item.id) {
          item.mode = "edit";
        }
      });
      return { ...updatedState, coupons: [...updatedState.coupons] };
    }
    case "@@edit/cancelEdit": {
      let targetId: number = action.id;
      let updatedState = { ...state };
      updatedState.coupons.forEach((item) => {
        if (targetId === item.id) {
          item.mode = "view";
        }
      });
      return { ...updatedState, coupons: [...updatedState.coupons] };

    }case '@@coupon/delCouponAction': {
      return {
        ...state,
        coupons:state.coupons.filter(s=>s.id!==action.id)
      };
    }
    default:
      return state;
  }
};
