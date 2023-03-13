import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonLabel,
  IonItem,
} from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router";
import { IRootState } from "../redux/store";
import "./Settings.scss";

const Settings: React.FC = () => {
  const history = useHistory();
  const token = useSelector((state: IRootState) => state.auth.token);
  const data = useSelector((state: any) => state.templateData.data);
  const adminChecking = useSelector(
    (state: IRootState) => state.auth.user?.is_admin
  );

  function goToAdminRegister() {
    history.push("/adminRegister");
  }
  return (
    <IonPage>
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle color="secondary">Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonList>
                {
                  <IonItem
                    key={data.id}
                    button
                    onClick={() => history.push("/profile")}
                  >
                    <IonLabel>
                      <h2>Profile information</h2>
                      <p>Manage your payment information</p>
                    </IonLabel>
                  </IonItem>
                }
                {adminChecking === true ? (
                  <IonItem
                    key={token?.length}
                    button
                    onClick={() => goToAdminRegister()}
                  >
                    <IonLabel>
                      <h2>Register Admin Account</h2>
                      <p>Manage your payment information</p>
                    </IonLabel>
                  </IonItem>
                ) : (
                  ""
                )}

                {/* <IonItem button onClick={() => history.push("/profile")}>
                  <IonLabel>
                    <h2>Notifications</h2>
                    <p>Manage the notifications in the app</p>
                  </IonLabel>
                </IonItem>
                <IonItem button onClick={() => history.push("/profile")}>
                  <IonLabel>
                    <h2>Language</h2>
                    <p>Manage your language and geolocation values</p>
                  </IonLabel>
                </IonItem>
                <IonItem button onClick={() => history.push("/profile")}>
                  <IonLabel>
                    <h2>Security</h2>
                    <p>Manage your security settings</p>
                  </IonLabel>
                </IonItem> */}
              </IonList>
            </IonCol>
          </IonRow>
          {/* vvvvv Old code:Using it for easy developmnet vvvvv*/}
          {/* <IonRow>
            <IonCol>
            <IonButton
        fill="outline"
        color="tertiary"
        class="button-size center-button"
        expand="block"
        onClick={logout}
      >
        Logout
      </IonButton>
            </IonCol>
          </IonRow> */}
          {/* ^^^^^Old code:Using it for easy developmnet ^^^^^ */}

          {/* Good Code: Just comment it for easy developmnet */}
          {token ? (
            <IonRow>
              <IonCol>
                {/* <IonButton
                  onClick={undefined}
                  fill="outline"
                  color="tertiary"
                  class="button-size center-button"
                  expand="block"
                >
                  Delete Account
                </IonButton> */}
              </IonCol>
            </IonRow>
          ) : (
            <Redirect to="/onboarding" />
          )}
          {/* Good Code: Just comment it for easy developmnet */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
