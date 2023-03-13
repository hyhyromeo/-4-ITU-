import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { heart, home, logoUsd, qrCode } from "ionicons/icons";
import { Redirect, Route } from "react-router";
import Coupon from "../pages/Coupon";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyAppointments from "../pages/MyAppointments";
import Onboarding from "../pages/Onboarding";
import QrProfile from "../pages/QrProfile";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import MyReward from "./MyReward";

export default function TabBar() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Redirect to="/onboarding" />
          </Route>

          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>

              <Route exact path="/qrProfile">
                <QrProfile />
              </Route>
              <Route exact path="/myReward">
                <MyReward />
              </Route>
              <Route exact path="/coupon">
                <Coupon />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={home} />
                {/* <IonLabel>home</IonLabel> */}
              </IonTabButton>

              <IonTabButton tab="tab3" href="/qrProfile" class="custom-tab">
                <IonIcon icon={qrCode} />
                {/* <IonLabel>Settings</IonLabel> */}
              </IonTabButton>

              <IonTabButton tab="tab4" href="/coupon">
                <IonIcon icon={logoUsd} />
                {/* <IonLabel>Coupon</IonLabel> */}
              </IonTabButton>

              <IonTabButton tab="tab5" href="/myReward" class="custom-profile">
                <IonIcon icon={heart} />
                {/* <IonBadge class="coupon">1</IonBadge> */}
                {/* <IonLabel>MyReward</IonLabel> */}
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
          <Route path="/settings" component={Settings} exact={true} />
          <Route
            path="/myappointments"
            component={MyAppointments}
            exact={true}
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
