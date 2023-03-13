import {
  RouterState,
  connectRouter,
  routerMiddleware,
  CallHistoryMethodAction,
} from "connected-react-router";
import { createBrowserHistory } from "history";
import logger from "redux-logger";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { AuthState } from "./Auth/state";
import { authReducer } from "./Auth/reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AuthAction } from "./Auth/action";
import reviewReducers from "./template data(not using)/reviewReducers";

import { CouponState } from "./coupon/state";
import { CouponAction } from "./coupon/action";
import { CouponReducer } from "./coupon/reducer";
import { profileState } from "./profile/state";
import { ProfileReducer } from "./profile/reducer";
import { profileAction } from "./profile/action";
import { AdminAuthAction } from "./AdminAuth/action";
import { AdminAuthState } from "./AdminAuth/state";
import { adminAuthReducer } from "./AdminAuth/reducer";
import { profileLookUpState } from "./profileLookUp/state";
import { profileLookUpReducer } from "./profileLookUp/reducer";
import { profileLookUpAction } from "./profileLookUp/action";
import { medicalServiceAction } from "./medicalService/action";
import { MedicalServiceState } from "./medicalService/state";
import { MedicalServiceReducer } from "./medicalService/reducer";
import { NewsAndPromotionState } from "./NewsAndProduction/state";
import { newsAndPromotionReducer } from "./NewsAndProduction/reducer";
import { NewsAndPromotionAction } from "./NewsAndProduction/action";

export const history = createBrowserHistory();

export interface IRootState {
  [x: string]: any;
  router: RouterState;
  auth: AuthState;
  coupon: CouponState;
  medicalService: MedicalServiceState;
  claimed: profileState;
  newsAndPromotion: NewsAndPromotionState;
  adminAuth: AdminAuthState;
  profileAndPoints: profileState;
  profileLookUp: profileLookUpState;
}

const rootReducer = combineReducers<IRootState>({
  router: connectRouter(history),
  auth: authReducer,
  templateData: reviewReducers,
  coupon: CouponReducer,
  newsAndPromotion: newsAndPromotionReducer,
  medicalService: MedicalServiceReducer,
  claimed: ProfileReducer,
  profileAndPoints: ProfileReducer,
  adminAuth: adminAuthReducer,
  profileLookUp: profileLookUpReducer,
});

type IRootAction =
  | CallHistoryMethodAction
  | AuthAction
  | CouponAction
  | profileAction
  | AdminAuthAction
  | profileLookUpAction
  | medicalServiceAction
  | NewsAndPromotionAction;

export type IRootThunkDispatch = ThunkDispatch<IRootState, null, IRootAction>;

declare global {
  /* tslint:disable:interface-name */
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEnhancer = composeEnhancers(
  applyMiddleware(thunk),
  // applyMiddleware(logger),
  applyMiddleware(routerMiddleware(history))
);

let store = createStore<IRootState, IRootAction, {}, {}>(
  rootReducer,
  rootEnhancer
);

export default store;
