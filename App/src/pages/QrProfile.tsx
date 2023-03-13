import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import QrCodeScanner from "../components/QrScanner";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import {
  genQrCodeThunk,
  getClientInfoByTextThunk,
} from "../redux/profileLookUp/thunk";
import { useHistory } from "react-router";
import { Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { qrTextState } from "../redux/profileLookUp/state";
import { useEffect } from "react";
import { settings } from "ionicons/icons";
import "./QrProfile.scss";

const Category: React.FC = () => {
  const dispatch = useDispatch();
  const qrCode = useSelector((state: IRootState) => state.profileLookUp.qrCode);
  const history = useHistory();
  const { register, handleSubmit , reset} = useForm<qrTextState>();
  const timeDiff = useSelector(
    (state: IRootState) => state.profileLookUp.timeDiff
  );
  const adminChecking = useSelector(
    (state: IRootState) => state.auth.user?.is_admin
  );

  // useEffect(() => {
  //   console.log('$$$$$$$$useeffect', { qrCode })
  //   dispatch(genQrCodeThunk(qrCode))
  // }, [dispatch, qrCode])
  // useEffect(() => {
  //   dispatch(getProfile())
  // }, [dispatch])

  useEffect(() => {
    dispatch(genQrCodeThunk(qrCode));
  }, [dispatch, qrCode]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (timeDiff) {
      timerId = setTimeout(() => {
        getQrCode();
      }, timeDiff);
      return () => {
        clearTimeout(timerId);
      };
    }
  });

  function getQrCode() {
    console.log("getQrCode in QrProfile");
    dispatch(genQrCodeThunk(qrCode));
  }

  function searchQr(qrPw: qrTextState) {
    dispatch(getClientInfoByTextThunk(qrPw, history));
    reset()
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol className="flex-container">
                <div className="left-side">
                  {/* <span style={{ color: "white" }}>For spacing, TODO </span> */}
                  <h5>ITU ID</h5>
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
        <IonGrid >
          <IonCol>
            <br />
            {/* <IonButton onClick={() => getQrCode()}></IonButton> */}
            {adminChecking === false || adminChecking === null ? <div style={{marginTop: "6em"}}>Your QR CODE Number : {qrCode}</div> : ''}
            <br />
            {adminChecking === false || adminChecking === null  ? <QRCode value={qrCode ? JSON.stringify(qrCode) : ''}></QRCode> : ''}
            {adminChecking === true ? <QrCodeScanner /> : ''}

            {/* uncomment those will easy to development */}
            {/* <QRCode value={qrCode ? JSON.stringify(qrCode) : ''}></QRCode>
           <div>Your QR CODE Number : { qrCode}</div> */}

            <div>
              {adminChecking === true ? (
                <>
                  <br />
                  <br />
                  <Form onSubmit={handleSubmit(searchQr)}>
                    <IonItem
                      style={{ display: "table-cell" }}
                      className="ion-no-padding ion-item"
                    >
                      <IonLabel className="ion-label">
                        {" "}
                        &nbsp; Search qr code:
                      </IonLabel>
                      <IonInput
                        id="qrPw"
                        {...register("qrPw")}
                        type="number"
                      ></IonInput>
                    </IonItem>
                    <br />

                    <IonButton
                      type="submit"
                      className="button-size center-button"
                      expand="block"
                    >
                      Search
                    </IonButton>
                  </Form>{" "}
                </>
              ) : (
                ""
              )}
            </div>
          </IonCol>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Category;
