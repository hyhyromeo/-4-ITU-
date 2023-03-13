import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCheckbox,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpThunk } from "../redux/Auth/thunk";
import { Form } from "reactstrap";
import IonPageFix from "../components/IonPageFix";

const initialState = {
  email: "",
  password: "",
  cpassword: "",
  agentPhoneNumber: "",
};
export default function Register() {
  const dispatch = useDispatch();
  // const { register, handleSubmit, getValues } = useForm<RegisterState>({});
  // const { REACT_APP_API_SERVER } = process.env;
  const [state, setState] = useState(initialState);
  const history = useHistory();
  function submitRegisterForm(e: FormEvent) {
    // console.log("the current newForm status: --> ", newForm); //for checking only
    e.preventDefault();
    dispatch(signUpThunk(state, history));
    setState(initialState);
  }

  return (
    <IonPageFix path="/register" className="ion-page">
      <IonContent>
        <Form onSubmit={submitRegisterForm}>
          <IonGrid className="column-evenly ion-grid">
            <IonRow>
              <IonCol>
                <IonItem className="ion-no-padding ion-item">
                  <IonLabel position="stacked" className="ion-label">
                    Email address:
                  </IonLabel>
                  <IonInput
                    id="email"
                    type="email"
                    required
                    value={state.email}
                    onIonChange={(e) => {
                      setState({ ...state, email: e.detail.value! });
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem className="ion-no-padding ion-item">
                  <IonLabel position="stacked" className="ion-label">
                    Password:
                  </IonLabel>
                  <IonInput
                    id="password"
                    type="password"
                    required
                    minlength={5}
                    maxlength={20}
                    // {...register("password")}
                    value={state.password}
                    onIonChange={(e) => {
                      setState({ ...state, password: e.detail.value! });
                    }}
                  ></IonInput>
                </IonItem>
                <IonItem className="ion-no-padding ion-item">
                  <IonLabel position="stacked" className="ion-label">
                    Confirm Password:
                  </IonLabel>
                  <IonInput
                    id="cpassword"
                    type="password"
                    required
                    value={state.cpassword}
                    onIonChange={(e) => {
                      setState({ ...state, cpassword: e.detail.value! });
                    }}
                  ></IonInput>
                </IonItem>{" "}
                {state.password !== state.cpassword && (
                  <>
                    <span style={{ color: "red", fontSize: "10px" }}>
                      Password not match
                    </span>
                  </>
                )}
                <IonItem className="ion-no-padding ion-item">
                  <IonLabel position="stacked" className="ion-label">
                    Agent Phone Number:
                  </IonLabel>
                  <IonInput
                    type="tel"
                    value={state.agentPhoneNumber}
                    onIonChange={(e) => {
                      setState({ ...state, agentPhoneNumber: e.detail.value! });
                    }}
                  ></IonInput>
                </IonItem>
                <div className="agree-terms">
                  <IonCheckbox slot="start" checked={true}>
                    {" "}
                  </IonCheckbox>
                  <IonLabel>
                    <span style={{ marginLeft: "0.5rem" }}>
                      {" "}
                      I agree with the{" "}
                      <Link to="/register">Terms and Conditions</Link>
                    </span>
                  </IonLabel>
                </div>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  type="submit"
                  className="button-size center-button"
                  expand="block"
                >
                  Sign Up
                </IonButton>
                <br />
                <IonButton
                  type="button"
                  className="button-size center-button"
                  expand="block"
                  color="medium"
                  onClick={() => setState(initialState)}
                >
                  Reset
                </IonButton>

                <div className="m-top">
                  <span>
                    If you already have an account:
                    <Link to="/login" style={{ marginLeft: "0.3rem" }}>
                      Sign in
                    </Link>
                  </span>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Form>
      </IonContent>
    </IonPageFix>
  );
}
