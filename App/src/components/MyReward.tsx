import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  useIonViewDidEnter,
} from "@ionic/react";
import React from "react";
import "./Coupon.scss";
import "./MyReward.scss";

import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { claimed } from "../redux/profile/state";
import { getClaimed } from "../redux/profile/thunk";
import { useHistory } from "react-router";

const MyReward: React.FC = () => {
  const history = useHistory()

  const dispatch = useDispatch();
  const ClaimData: claimed[] = useSelector(
    (state: IRootState) => state.claimed.claims
  );
  // const points = useSelector(
  //   (state: IRootState) => state.profileAndPoints.profiles.record
  // );

  // useEffect(() => {
  //   dispatch(getClaimed());
  // }, [dispatch]);

  useIonViewDidEnter(() => {
    dispatch(getClaimed());

  });

  return (
    <>
      <IonButton onClick={() => history.push("/pointHistory")}>
        Check Point History
      </IonButton>

      {ClaimData.map((ClaimDataCardItem, ClaimDataCardIdex) => {
        return (
          <IonCard className="rewardCard" key={ClaimDataCardIdex}>
            <IonCardHeader>
              <IonCardTitle>{ClaimDataCardItem.gift_item}</IonCardTitle>
            </IonCardHeader>
            <IonCardSubtitle style={{ margin: "2em" }}>
              {ClaimDataCardItem.description}
              <br />
              cost : {ClaimDataCardItem.cost_at_date}
              <br />
            </IonCardSubtitle>
          </IonCard>
        );
      })}
    </>
  );
};
export default MyReward;
