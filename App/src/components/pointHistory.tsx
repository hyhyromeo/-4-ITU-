import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import React from "react";
import "./Coupon.scss";
import { IRootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { settings } from "ionicons/icons";
import { useHistory } from "react-router";
import { getProfile } from "../redux/profile/thunk";

const PointHistory: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const points = useSelector(
    (state: IRootState) => state.profileAndPoints.profiles.record
  );

  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [dispatch]);

  useIonViewDidEnter(() => {
    dispatch(getProfile());
  });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
            <IonBackButton defaultHref="/myReward" />
          </IonButtons>
          <IonGrid>
            <IonRow>
              <IonCol className="flex-container">
                <div className="left-side">

                  <h5 style={{marginLeft:"50px"}}>Point History </h5>
                </div>
                <div className="right-side">
                  <div
                    className="inbox-icon"
                    onClick={() => history.push("/settings")}
                  >
                    <IonIcon icon={settings}></IonIcon>
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {points.map((point) => (
              <IonCard style={{ width: "70vh" }} key={point.id}>
                <br />
                Gained Point History
                <IonCardTitle
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  Points: {point.points_gained}
                </IonCardTitle>
                <IonCardContent
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  medical services : {point.service}
                  <br />
                  Gained date : {point.points_gained_date.split("T")[0]}
                  <br />
                  Points created by :{point.created_by}
                </IonCardContent>
                <IonCardContent></IonCardContent>
              </IonCard>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
export default PointHistory;
