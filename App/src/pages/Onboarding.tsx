import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonImg,
  IonFooter,
} from "@ionic/react";
import "./Onboarding.scss";
import logo from "../assets/logo.png";

import React from "react";
import { Link } from "react-router-dom";
import { IonPageFix } from "../components/IonPageFix";

const Onboarding: React.FC = () => {
  return (
    <IonPageFix path="/onboarding">
      <IonContent className=" ion-text-center ion-content">
        <IonGrid className="column-evenly ion-grid-background-image">
          <IonRow>
            <IonCol>
              <IonImg src={logo} className="ion-img" />
              <h5>CMS</h5>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <Link to="/login" style={{ marginLeft: "0.3rem" }}>
                <IonButton
                  className="button-size center-button ion-button"
                >
                  Let's started
                </IonButton>
              </Link>
              <div className="m-top">
                <span>
                  Don't have an account?
                  <Link to="/register" style={{ marginLeft: "0.3rem" }}>
                    Sign up
                  </Link>
                </span>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter style={{textAlign:'end',padding:'1em'}}>Version: 1.0.0</IonFooter>
    </IonPageFix>
  );
};

export default Onboarding;
