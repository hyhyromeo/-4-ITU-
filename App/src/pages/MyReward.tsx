import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import MyReward from "../components/MyReward";
import { settings } from "ionicons/icons";



const MyRewardPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol className="flex-container">
                <div className="left-side">
                  {/* <span style={{ color: "white" }}>For spacing, TODO </span> */}
                  <h5>My Reward</h5>
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
          <MyReward />
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MyRewardPage;
