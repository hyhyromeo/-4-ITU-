import React, { useState, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import "./Qrscanner.scss";
import QrReader from "react-qr-reader";

import { useDispatch } from "react-redux";
import { getClientInfoThunk } from "../redux/profileLookUp/thunk";
import { useHistory } from "react-router";
import { IonButton, IonCol, IonGrid, IonRow } from "@ionic/react";

function ReactQrScanner(props: {
  onQrCode: (qrCode: string) => void;
  hidden?: boolean;
}) {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);

  useEffect(() => {
    console.log("useEffect video:", video);

    if (!video) {
      return;
    }
    let streamPromise = navigator.mediaDevices.getUserMedia({
      video: { facingMode: { exact: "environment" } },
      audio: false,
    });
    streamPromise.catch((err) => {
      console.error("failed to get user media for qr scanner:", err);
    });
    let qrScannerPromise = streamPromise.then((stream) => {
      if (!video) {
        return;
      }
      return new Promise<QrScanner>((resolve) => {
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();

          let qrScanner = new QrScanner(video, (scannedResult: any) => {
            console.log("scannedResult@@@@2", scannedResult);

            let token = JSON.parse(scannedResult);
            props.onQrCode(token);
            qrScanner.stop();
          });
          qrScanner.start();
          resolve(qrScanner);
        };
      });
    });

    async function stop() {
      console.log("clean up video:", video);
      streamPromise.then((stream) => {
        stream.getVideoTracks().forEach((track) => stream.removeTrack(track));
      });
      qrScannerPromise.then(async (qrScanner) => {
        if (!qrScanner) {
          console.log("no scarner D");

          return;
        }
        console.log("stoping scaner :", qrScanner);

        await qrScanner.stop();
        await qrScanner.destroy();
        console.log("destroyed :", qrScanner);
      });
    }

    // clean up
    return () => {
      console.log("child clear up");

      stop();
    };
  }, [video, props]);

  return <video ref={setVideo} hidden={props.hidden} />;
}

function QrCodeScanner(props: any) {
  const [qrCode, setQrCode] = useState("");
  const [shouldScan, setShouldScan] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [buttonSwitch, setButtonSwitch] = useState(false);
  const qrRef = useRef(null) as any;

  function startScanner() {
    setQrCode("");
    setShouldScan(true);
    setButtonSwitch(true);
  }
  function stopScanner() {
    setQrCode("");
    setShouldScan(false);
    setButtonSwitch(false);
  }


  const handleErrorWebCam = (error: any) => {
    console.log(error);
  };
  const handleScanWebCam = (qrCode: any) => {
    
    if (qrCode) {
    dispatch(getClientInfoThunk(qrCode, history));
      stopScanner()
    }
  };
  const handleOnload = (): void => {
    console.log("onloading");
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
        {shouldScan && (
              <QrReader
                className="box-img"
                delay={300}
                onError={handleErrorWebCam}
                onScan={handleScanWebCam}
                onLoad={handleOnload}
              />
          )}
          <br/>
          <div className="QrCodeScanner">
            {buttonSwitch === false ? (
              <IonButton
                color="secondary"
                className="button-size center-button"
                expand="block"
                onClick={startScanner}
              >
                Scan QR Code
              </IonButton>
            ) : (
              <IonButton
                color="secondary"
                className="button-size center-button"
                expand="block"
                
                onClick={stopScanner}
              >
                Close Camera
              </IonButton>
            )}
            {/* {shouldScan && <ReactQrScanner onQrCode={onQRCode} />} */}
           
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
}

export default QrCodeScanner;
