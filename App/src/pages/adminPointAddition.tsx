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
  IonInput,
  IonSelectOption,
  IonSelect,
  IonAlert,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRootState } from "../redux/store";
import { getProfile } from "../redux/profile/thunk";
import {
  addPointThunk,
  getMedicalService,
} from "../redux/medicalService/thunk";
import { medical_service } from "../redux/medicalService/state";
import { clearStatus } from "../redux/coupon/action";
import { getAgent } from "../redux/profileLookUp/thunk";

export const data: any = {};

export type addedPointForm = {
  userId: number;
  medicalServiceId: string;
  points: string;
  adminName: string;
  medicalServiceDescription: string;
  agentUserPhoneNumber: number;
  agentUserId: number;
  commission: string;
};

const AdminPointAddition = () => {
  const [showAlert1, setShowAlert1] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(
    (state: IRootState) => state.profileLookUp.profiles.profile?.user_id
  );

  const AgentName = useSelector(
    (state: IRootState) => state.profileLookUp.profiles.addPoint.agent.name
  );

  const agentId = useSelector(
    (state: IRootState) => state.profileLookUp.profiles.addPoint.agent.id
  );
  const MedicalServiceCardData: medical_service[] = useSelector(
    (state: IRootState) => state.medicalService.medicalServices
  );

  const status: string = useSelector(
    (state: IRootState) => state.coupon.status
  );

  useEffect(() => {
    dispatch(getMedicalService());
    dispatch(getProfile());
  }, [dispatch, status]);

  const { register, handleSubmit, setValue, reset } = useForm<addedPointForm>({
    defaultValues: {
      userId: userId,
    },
  });
  function setFormValue(e: any) {
    setValue("points", e.detail.value.point);
    setValue("medicalServiceId", e.detail.value.id);
    setValue("medicalServiceDescription", e.detail.value.description);
  }

  const onSubmit: SubmitHandler<addedPointForm> = (data) => {
    if (data) {
      data.agentUserId = agentId!;
      console.log("addedPointForm:", data);
      dispatch(addPointThunk(data));
      setShowAlert1(true);
      reset();
    }
  };

  function findAgent(e: any) {
    const phoneNumberInput = e.detail.value;
    console.log(phoneNumberInput);
    if (phoneNumberInput && phoneNumberInput.toString().length === 8) {
      dispatch(getAgent(phoneNumberInput));
    } else {
      console.log("wrong format");
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle color="secondary">Add Point</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">
            <IonItem>
              <IonLabel>Select Medical Service</IonLabel>
              <IonSelect
                interface="popover"
                placeholder="Select One"
                onIonChange={(e) => setFormValue(e)}
              >
                {MedicalServiceCardData.map(
                  (MedicalServiceCardItem, MedicalServiceCardIdex) => {
                    return (
                      <IonSelectOption
                        key={MedicalServiceCardIdex}
                        value={MedicalServiceCardItem}
                      >
                        {MedicalServiceCardItem.service}
                      </IonSelectOption>
                    );
                  }
                )}
              </IonSelect>
            </IonItem>
            {/* <IonLabel>user id</IonLabel> */}
            {/* <IonInput value = {userId} hide disable={true}> </IonInput> */}
            <IonItem>
              <IonLabel position="floating">Medical Service</IonLabel>
              <IonInput
                disabled={true}
                required
                {...register("medicalServiceDescription")}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Point</IonLabel>
              <IonInput type="number" required {...register("points")} />
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Agent Phone Number</IonLabel>
              <IonInput
                type="number"
                minlength={8}
                maxlength={8}
                onIonChange={(e) => findAgent(e)}
                {...register("agentUserPhoneNumber")}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Agent Name</IonLabel>
              <IonInput value={AgentName}></IonInput>
            </IonItem>
            <IonInput
              value={agentId}
              {...register("agentUserId")}
              disabled={true}
              hidden
            />
            {/* <IonInput value={userId} required {...register("userId")} disabled={ true} hidden/> */}
          </IonList>

          <IonItem>
            <IonLabel position="floating">Commission</IonLabel>
            <IonInput type="number"  {...register("commission")} />
          </IonItem>

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
              onDidDismiss={() => {
                setShowAlert1(false);
                dispatch(clearStatus());
              }}
              header="Add point Success"
              subHeader="Thanks"
              message={""}
              buttons={[
                {
                  text: "Okay",
                  handler: () => {
                    dispatch(clearStatus());
                    history.push("/home");
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

export default AdminPointAddition;
