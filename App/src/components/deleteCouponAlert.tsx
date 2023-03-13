import React from "react";
import { IonAlert } from "@ionic/react";
import { useDispatch } from "react-redux";
import { redeemCouponAction } from "../redux/coupon/action";

export const AlertExample = (props: any) => {
  const dispatch = useDispatch();
  function comfirmCoupon() {
    dispatch(redeemCouponAction);
  }

  return (
    <>
      <IonAlert
        isOpen={props.isShown}
        onDidDismiss={() => {
          console.log("onDismiss");
          props.onHideAlert();
        }}
        header={"Delete This Coupon?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: (blah) => {
              console.log("Confirm Cancel: blah");
            },
          },
          {
            text: "Delete",
            handler: () => {
              comfirmCoupon();
              console.log("Confirm Delete");
            },
          },
        ]}
      />
    </>
  );
};

export default AlertExample;
