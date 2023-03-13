import {
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import "./Login.scss";
import React from "react";
import { Link, useHistory } from "react-router-dom";
// import ReactFacebookLogin, {
//   ReactFacebookFailureResponse,
//   ReactFacebookLoginInfo,
// } from "react-facebook-login";
// import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../redux/Auth/thunk";
import { useForm } from "react-hook-form";
import { LoginState } from "../redux/Auth/state";
import { Form } from "reactstrap";
import { IRootState } from "../redux/store";
import IonPageFix from "../components/IonPageFix";

// const { REACT_APP_FACEBOOK_APP_ID } = process.env;
// const { REACT_APP_GOOGLE_ID } = process.env;
// const responseGoogle = (response: any) => {
//   console.log(response);
// };
// declare var FB: any;

  const Login: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory()
  const errors = useSelector((state: IRootState) => state.auth.error);
  // function facebookAuthCallback(
  //   data: ReactFacebookFailureResponse | ReactFacebookLoginInfo
  // ) {
  //   console.log("facebook auth data:", data);
  //   if ("accessToken" in data) {
  //     dispatch(loginFacebookThunk(data.accessToken, props.history));
  //   }
  // }
  // function facebookAuthOnClick() {}

  const { register, handleSubmit, reset } = useForm<LoginState>({});

  function localLogin(newForm: LoginState) {
    if (newForm.email !== "" && newForm.password !== "") {
      dispatch(loginThunk(newForm, history));
      reset();
    }
  }

  return (
    <IonPageFix path="/login" className="ion-page">
      {/* <IonHeader className="ion-header">
        <IonToolbar className="ion-toolbar">
          <IonTitle className="ion-title" color="primary">
            Welcome back
          </IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent className="ion-padding">
        <IonGrid className="column-evenly ion-grid">
          <div className="center">
            <Form id="loginForm" onSubmit={handleSubmit(localLogin)}>
              <IonRow>
                <IonCol>
                  <IonItem className="ion-no-padding ion-item">
                    <IonLabel position="stacked" className="ion-label">
                      Email address
                    </IonLabel>
                    <IonInput
                      {...register("email")}
                      type="email"
                      required
                    ></IonInput>
                  </IonItem>
                  {errors ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      Invalid user
                    </span>
                  ) : (
                    ""
                  )}

                  <IonItem className="ion-no-padding ion-item">
                    <IonLabel position="stacked" className="ion-label">
                      Password
                    </IonLabel>
                    <IonInput
                      type="password"
                      required
                      {...register("password")}
                    ></IonInput>
                  </IonItem>
                  {errors ? (
                    <span style={{ color: "red", fontSize: "10px" }}>
                      Wrong password
                    </span>
                  ) : (
                    ""
                  )}

                  <p className="input-help">Forgot password?</p>
                </IonCol>
              </IonRow>
              <IonButton
                type="submit"
                className="button-size center-button"
                expand="block"
              >
                Login
              </IonButton>
            </Form>
          </div>

          <IonRow>
            <IonCol>
              {/* <div className="loginButtons">
                <ReactFacebookLogin
                  appId={REACT_APP_FACEBOOK_APP_ID!}
                  autoLoad={false}
                  fields="name,email,picture"
                  onClick={facebookAuthOnClick}
                  callback={facebookAuthCallback}
                />
              </div>
              <div className="loginButtons">
                <GoogleLogin
                  clientId={REACT_APP_GOOGLE_ID!}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  isSignedIn={true}
                  cookiePolicy={"single_host_origin"}
                />
              </div> */}
              <div className="loginButtons">{/* <WechatApp/> */}</div>
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
    </IonPageFix>
  );
}
export default Login
