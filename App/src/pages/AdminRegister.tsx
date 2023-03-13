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
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonBackButton,
} from "@ionic/react";
import React, { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from "reactstrap";
import { AdminSignUpThunk } from "../redux/AdminAuth/thunk";
import IonPageFix from "../components/IonPageFix";

const initialState = {
  email: "",
  password: "",
  cpassword: "",
  role: "agent",
  phoneNumber: "",
};
export default function AdminRegister() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState(initialState);
  // const failed = useSelector((state : IRootState) => state.adminAuth.error)
  // const { register, handleSubmit, reset } =
  //   useForm<AdminAuthState>();

  //initial value of admin is false (selected Agent)
  // const [role, setRole] = useState("admin");

  function submitForm(e: FormEvent) {
    e.preventDefault();
    console.log("submitForm", state); //for checking only

    // if (role === "admin") {
    //   newForm.admin = true;
    // } else if (role === "agent") {
    //   newForm.admin = false;
    // }
    // console.log("the current newForm status: --> ", newForm); //for checking only
    dispatch(AdminSignUpThunk(state, history));
    setState(initialState);
  }

  return (
    <IonPageFix path="/adminRegister" className="ion-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle color="secondary" style={{ fontSize: "15px" }}>
            Register Admin/Agent
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Form onSubmit={submitForm}>
          <IonGrid className="column-evenly ion-grid">
            <IonRow>
              <IonCol>
                <IonItem className="ion-no-padding ion-item">
                  <IonLabel position="stacked" className="ion-label">
                    Email address:
                  </IonLabel>
                  <IonInput
                    id="email"
                    value={state.email}
                    onIonChange={(e) => {
                      setState({ ...state, email: e.detail.value! });
                    }}
                    // {...register("email")}
                    type="email"
                    required
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
                    // {...register("cpassword", {
                    //   validate: (value) => {
                    //     return value === getValues().password;
                    //   },
                    // })}
                    // {...register("cpassword")}

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
              </IonCol>
            </IonRow>
            <br/>
            <IonRow>
              <IonCol>
                <IonSegment
                  value={state.role}
                  onIonChange={(e) => {
                    setState({ ...state, role: e.detail.value! });

                    console.log("Segment selected", e.detail.value);
                  }}
                >
                  <IonSegmentButton value="agent">
                    <IonLabel>Agent</IonLabel>
                  </IonSegmentButton>
                  <IonSegmentButton value="admin">
                    <IonLabel>Admin</IonLabel>
                  </IonSegmentButton>
                </IonSegment>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol>
                {state.role === "agent" ? (
                  <IonItem className="ion-no-padding ion-item">
                    <IonLabel position="stacked" className="ion-label">
                      Phone Number (Agent only):
                    </IonLabel>
                    <IonInput
                      type="tel"
                      value={state.phoneNumber}
                      onIonChange={(e) => {
                        setState({ ...state, phoneNumber: e.detail.value! });
                      }}
                    ></IonInput>
                  </IonItem>
                ) : (
                  ""
                )}
              </IonCol>
            </IonRow>

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
            <br></br>

            <IonRow>
              <IonCol>
                <IonButton
                  type="submit"
                  className="button-size center-button"
                  expand="block"
                >
                  Sign Up
                </IonButton>
                <br></br>

                <IonButton
                  type="button"
                  className="button-size center-button"
                  expand="block"
                  color="medium"
                  onClick={() => setState(initialState)}
                >
                  Reset
                </IonButton>
                {/* <div className="m-top">
                  <span>
                    If you already have an account:
                    <Link to="/login" style={{ marginLeft: "0.3rem" }}>
                      Sign in
                    </Link>
                  </span>
                </div> */}
              </IonCol>
            </IonRow>
          </IonGrid>
        </Form>
      </IonContent>
    </IonPageFix>
  );
}
