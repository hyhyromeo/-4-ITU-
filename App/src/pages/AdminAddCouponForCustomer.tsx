import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonFooter,
  IonItem,
  IonLabel,
  IonInput,
  IonSelectOption,
  IonSelect,
  IonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { getCoupon, redeemCoupon } from "../redux/coupon/thunk";
import { IRootState } from "../redux/store";
import { coupon } from "../redux/coupon/state";
import { getProfile } from "../redux/profile/thunk";
import { clearStatus } from "../redux/coupon/action";

export const data = {};

export type addedCouponForm = {
  giftId: string;
  giftDescription: string;
  cost: string;
  userId: number;
};

export type alertObj = {
  header: string;
  subHeader: string;
};

const AdminAddCouponForCustomer = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const [alertObj, setAlertObj] = useState<alertObj>({
    header: "",
    subHeader: "",
  });
  const userId = useSelector(
    (state: IRootState) => state.profileLookUp.profiles.profile?.user_id
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const cardData: coupon[] = useSelector(
    (state: IRootState) => state.coupon.coupons
  );
  const status: string = useSelector(
    (state: IRootState) => state.coupon.status
  );

  useEffect(() => {
    if (status) {
      if (status === "Fail") {
        setAlertObj({
          header: "Redeem Fail",
          subHeader: "Not enough Point to redeem",
        });
        setShowAlert1(true);
      }
      if (status === "Success") {
        setAlertObj({
          header: "Redeem Success",
          subHeader: "Thanks",
        });
        setShowAlert1(true);
      }
    }
    console.log("statusPPPPP", status);

    dispatch(getCoupon());
    dispatch(getProfile());
  }, [dispatch, status]);

  const { register, handleSubmit, setValue } = useForm<addedCouponForm>({
    defaultValues: {
      userId: userId,
    },
  });

  const onSubmit: SubmitHandler<addedCouponForm> = (data) => {
    if (data) {
      console.log("addedCouponForm:", data);
      dispatch(redeemCoupon(data));
    }
  };

  function setFormValue(e: any) {
    setValue("cost", e.detail.value.cost);
    setValue("giftDescription", e.detail.value.description);
    setValue("giftId", e.detail.value.id);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle color="secondary">Add New Coupon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">
            <IonItem>
              <IonLabel>Gifts Item</IonLabel>
              <IonSelect
                interface="popover"
                placeholder="Select One"
                onIonChange={(e) => setFormValue(e)}
              >
                {cardData.map((cardItem, cardIdex) => {
                  return (
                    <IonSelectOption key={cardIdex} value={cardItem}>
                      {cardItem.gift_item}
                    </IonSelectOption>
                  );
                })}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Gift Description</IonLabel>
              <IonInput
                disabled={true}
                required
                {...register("giftDescription")}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Cost</IonLabel>
              <IonInput type="number" required {...register("cost")} />
            </IonItem>
          </IonList>
          <IonFooter className="ion-padding footercover">
            <IonButton
              style={{ marginTop: "50px", marginBottom: "50px" }}
              class="button-size"
              expand="block"
              type="submit"
            >
              Submit
            </IonButton>
            <IonAlert
              isOpen={showAlert1}
              onDidDismiss={() => {
                setShowAlert1(false);
                dispatch(clearStatus());
              }}
              header={alertObj.header}
              message={""}
              buttons={[
                {
                  text: "Okay",
                  handler: () => {
                    if (status === "Success") {
                      history.push("/home");
                    }
                    dispatch(clearStatus());
                    console.log("Redeem Success and back Homepage");
                  },
                },
              ]}
            />
          </IonFooter>
        </Form>
      </IonContent>
    </IonPage>
  );
};

export default AdminAddCouponForCustomer;
