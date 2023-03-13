import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import "./Coupon.scss";
import { create, trash } from "ionicons/icons";
import { delCoupon, editCouponThunk, getCoupon } from "../redux/coupon/thunk";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { coupon } from "../redux/coupon/state";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import {
  cancelEditCouponAction,
  wantToEditCouponAction,
} from "../redux/coupon/action";

export type confirmState = {
  id: number;
  editDescription: string;
  editCost: string;
  editGiftItem: string;
};

const CouponApp1: React.FC = (props: any) => {
  const [showAlert, setShowAlert] = useState(false);
  const { register, handleSubmit } = useForm<confirmState>({});
  const dispatch = useDispatch();

  const adminChecking = useSelector(
    (state: IRootState) => state.auth.user?.is_admin
  );

  const cardData: coupon[] = useSelector(
    (state: IRootState) => state.coupon.coupons
  );

  // useEffect(() => {
  //   dispatch(getCoupon());
  // }, [dispatch]);

  useIonViewDidEnter(() => {
    dispatch(getCoupon());
  });

  return (
    <>
      {cardData.map((cardItem, cardIdex) => {
        function onEditCoupon(id: number) {
          // console.log("i will to edit ->");
          dispatch(wantToEditCouponAction(cardItem.id));
        }
        function confirmEditCoupon(newCoupon: confirmState) {
          dispatch(editCouponThunk(newCoupon));
        }
        function cancelEditCoupon(id: number) {
          console.log("i will to edit ->");
          dispatch(cancelEditCouponAction(cardItem.id));
        }
        function deleteCouponBtn(id: number) {
          setShowAlert(true);
        }
        return (
          <React.Fragment key={cardItem.id}>
            {cardItem.mode === "view" ? (
              <IonCard className="couponCard">
                {adminChecking === true ? (
                  <IonButton
                    fill="clear"
                    style={{ marginRight: "1em", marginBottom: "1em" }}
                    onClick={() => onEditCoupon(cardItem.id)}
                  >
                    <IonIcon
                      size="large"
                      slot="icon-only"
                      color="dark"
                      icon={create}
                    />
                  </IonButton>
                ) : (
                  ""
                )}
                {!adminChecking || adminChecking == null? (
                  <IonCardTitle>
                    {" "}
                    <br />
                  </IonCardTitle>
                ) : (
                  ""
                )}
                <IonCardTitle>{cardItem.gift_item}</IonCardTitle>
                <IonCardTitle>{cardItem.description}</IonCardTitle>
                Required Points : {cardItem.cost}
                <div className="ion-text-end"></div>
              </IonCard>
            ) : (
              <Form
                key={cardItem.id}
                onSubmit={handleSubmit(confirmEditCoupon)}
              >
                <IonCard>
                  <IonInput
                    value={cardItem.id}
                    {...register("id")}
                    hidden
                  ></IonInput>

                  <IonItem style={{ width: "75vw" }}>
                    <IonLabel position="floating">Gift Item :</IonLabel>
                    <IonInput
                      value={cardItem.gift_item}
                      {...register("editGiftItem")}
                    ></IonInput>
                  </IonItem>
                  <IonItem style={{ width: "75vw" }}>
                    <IonLabel position="floating">Description : </IonLabel>
                    <IonInput
                      value={cardItem.description}
                      {...register("editDescription")}
                    ></IonInput>
                  </IonItem>
                  <IonItem style={{ width: "75vw" }}>
                    <IonLabel position="floating">
                      {" "}
                      Points (number only):{" "}
                    </IonLabel>
                    <IonInput
                      type="number"
                      value={cardItem.cost}
                      {...register("editCost")}
                    >
                      $
                    </IonInput>
                  </IonItem>

                  <div className="ion-text-end">
                    <br />
                    <IonButton
                      color="danger"
                      style={{
                        backgroundColor: "danger",
                        width: "4em",
                        margin: "2px",
                      }}
                      onClick={() => deleteCouponBtn(cardItem.id)}
                    >
                      <IonIcon size="large" slot="icon-only" icon={trash} />
                    </IonButton>

                    <IonButton
                      style={{ margin: "2px" }}
                      onClick={() => cancelEditCoupon(cardItem.id)}
                      color="secondary"
                    >
                      Cancel
                    </IonButton>
                    <IonButton
                      style={{ margin: "2px" }}
                      type="submit"
                      color="primary"
                    >
                      Confirm
                    </IonButton>
                  </div>
                  <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => setShowAlert(false)}
              cssClass='my-custom-class'
              header={'Are you sure?'}
              message={`<strong>You won't be able to revert!</strong>`}
              buttons={[
                {
                  text: 'Delete',
                  cssClass: 'permDeleteButton',
                  handler: () => {
                    dispatch(delCoupon(cardItem.id));
                  },
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    return
                  },
                },
              ]}
            />
                </IonCard>
              </Form>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
export default CouponApp1;
