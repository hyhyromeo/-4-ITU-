import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonFooter,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonAlert,
} from "@ionic/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { addMedicalService } from "../redux/medicalService/thunk";
export type addedMedicalServiceForm = {
  service: string;
  point: number;
  price: number;
  description: string;
};

const AdminAddMedicalService: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showAlert1, setShowAlert1] = useState(false);
  const { register, handleSubmit, reset } = useForm<addedMedicalServiceForm>();
  const onSubmit: SubmitHandler<addedMedicalServiceForm> = (data) => {
    if (data) {
      setShowAlert1(true);
      console.log("addedCouponForm:", data);
      dispatch(addMedicalService(data));
      reset();
    } else {
      setShowAlert1(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/medicalService" />
          </IonButtons>
          <IonTitle color="secondary">Add New Medical Service</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">
            <IonItem>
              <IonLabel position="floating">Type Service Title Here</IonLabel>
              <IonInput {...register("service")} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Point Reward : </IonLabel>
              <IonInput type="number" required {...register("point")} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Price : </IonLabel>
              <IonInput type="number" required {...register("price")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Input Description</IonLabel>
              <IonTextarea required {...register("description")} />
            </IonItem>
          </IonList>

          <IonFooter className="ion-padding footercover">
            <IonButton
              style={{ marginTop: "50px", marginBottom: "50px" }}
              class="button-size"
              expand="block"
              type="submit"
            >
              Submit
            </IonButton>
            <IonAlert
              isOpen={showAlert1}
              onDidDismiss={() => setShowAlert1(false)}
              header={"Medical Service Added"}
              subHeader={""}
              message={""}
              buttons={[
                {
                  text: "Okay",
                  handler: () => {
                    history.push("/medicalService");
                    console.log("Redeem Success and back Homepage");
                  },
                },
              ]}
            />
          </IonFooter>
        </Form>
      </IonContent>
    </IonPage>
  );
};

export default AdminAddMedicalService;
