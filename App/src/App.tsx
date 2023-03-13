import React, { useEffect, useLayoutEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "./redux/store";
import { loginLoadTokenAction } from "./redux/Auth/action";
import { IonReactRouter } from "@ionic/react-router";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QrProfile from "./pages/QrProfile";
import Coupon from "./pages/Coupon";
import MyReward from "./pages/MyReward";
import Settings from "./pages/Settings";
import AdminRegister from "./pages/AdminRegister";
import Profile from "./pages/Profile";
import AdminAddNewsDetail from "./pages/adminAddNewsDetail";
import AdminAddCoupon from "./pages/adminAddCoupon";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";
import "./pages/Tab.scss";
import AdminAddCouponForCustomer from "./pages/AdminAddCouponForCustomer";
import MedicalPage from "./pages/medicalService";
import AdminAddMedicalService from "./pages/adminAddMedicalService";
import AdminPointAddition from "./pages/adminPointAddition";
import AdminPanel from "./pages/adminPanel";
import { logoUsd, home, qrCode, heart, cart } from "ionicons/icons";
import PointHistory from "./components/pointHistory";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Content />
      </IonReactRouter>
    </IonApp>
  )
}
const PagesWithoutNavBar = [
  '/login',
  '/onboarding',
  '/register',
  '/adminRegister',
  '/profile',
  '/admin/AdminAddMedicalService',
  '/settings',
  '/admin/addCoupon',
  '/admin/Panel',
  '/admin/addCouponForCustomer',
  '/admin/pointAddition',
  '/admin/addNewsDetail'
]

function Content(){
  const router = useIonRouter()
  const pathname = router.routeInfo.pathname
  const hideNavBar = PagesWithoutNavBar.includes(pathname)
  const token = useSelector((state: IRootState) => state.auth.token);
  const user = useSelector((state: IRootState) => state.auth.user);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    let e = document.querySelector('ion-tab-bar')
    if (!e) return
    e.style.display = hideNavBar ? 'none' : 'flex'
  }, [hideNavBar])

  useEffect(() => {
    if (token && !user) {
      dispatch(loginLoadTokenAction(token));
    }
  }, [token, user, dispatch]);

  return (
 
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/onboarding" component={Onboarding} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/admin/addNewsDetail" component={AdminAddNewsDetail} />
            <Route path="/admin/addCoupon" component={AdminAddCoupon} />
            <Route
              path="/admin/AdminAddMedicalService"
              component={AdminAddMedicalService}
            />
            <Route
              path="/admin/addCouponForCustomer"
              component={AdminAddCouponForCustomer}
            />
            <Route path="/admin/pointAddition" component={AdminPointAddition} />
            <Route path="/adminRegister" component={AdminRegister} />
            <Route path="/admin/Panel" component={AdminPanel} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/qrProfile" component={QrProfile} />
            <Route exact path="/coupon" component={Coupon} />
            <Route exact path="/medicalService" component={MedicalPage} />
            <Route exact path="/myReward" component={MyReward} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/profile" component={Profile} />
            {/* <Route exact path="/myappointments" component={MyAppointments} /> */}
            <Route exact path="/pointHistory" component={PointHistory} />
            <Route exact path="/">
              {token ? <Redirect to="/home" /> : <Redirect to="/onboarding" />}
            </Route>
          </IonRouterOutlet>
          {token ? (
            <IonTabBar slot="bottom">
              <IonTabButton tab="tab1" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="tab2" href="/medicalService">
                <IonIcon icon={cart} />
              </IonTabButton>
              <IonTabButton tab="tab3" href="/qrProfile" class="custom-tab">
                <IonIcon icon={qrCode} />
              </IonTabButton>
              <IonTabButton tab="tab4" href="/coupon">
                <IonIcon icon={logoUsd} />
              </IonTabButton>
              <IonTabButton tab="tab5" href="/myReward" class="custom-profile">
                <IonIcon icon={heart} />
                {/* <IonBadge class='coupon'>1</IonBadge> */}
              </IonTabButton>
            </IonTabBar>
          ) : (
            <IonTabBar></IonTabBar>
          )}
        </IonTabs>

  );
};
export default App;
