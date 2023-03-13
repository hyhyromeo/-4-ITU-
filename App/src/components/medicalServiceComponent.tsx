import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { create, trash } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";
import { medical_service } from "../redux/medicalService/state";
import {
  delMedicalService,
  editServiceThunk,
  getMedicalService,
} from "../redux/medicalService/thunk";
import { useForm } from "react-hook-form";
import { Form } from "reactstrap";
import {
  cancelEditServiceAction,
  wantToEditServiceAction,
} from "../redux/medicalService/action";

export type editServiceState = {
  id: number;
  service: string;
  point: number;
  price: number;
  description: string;
  medical_center_id: number;
};

const MedicalServiceCard: React.FC = (props: any) => {
  const [showAlert1, setShowAlert1] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<editServiceState>({});

  const adminChecking = useSelector(
    (state: IRootState) => state.auth.user?.is_admin
  );

  // useEffect(() => {
  //   dispatch(getMedicalService());
  // }, [dispatch]);


  useIonViewDidEnter(() => {
  dispatch(getMedicalService());
});



  const MedicalServiceCardData: medical_service[] = useSelector(
    (state: IRootState) => state.medicalService.medicalServices
  );

  function deleteCouponBtn(id: number) {
    setShowAlert1(true);
  }
  function wantToEditService(id: number) {
    dispatch(wantToEditServiceAction(id));
  }
  function confirmEditService(newService: editServiceState) {
    dispatch(editServiceThunk(newService));
  }
  function cancelEditService(id: number) {
    dispatch(cancelEditServiceAction(id));
  }
  return (
    <>
      {MedicalServiceCardData.map(
        (MedicalServiceCardItem, idx) => {
       
          return (
            <React.Fragment key={idx}>
              {MedicalServiceCardItem.mode === "view" ? (
                <IonCard
                   
                  className="medicalServiceCard"
                >
                  <IonCardHeader className="medicalServiceCardHeader">
                    <IonCardTitle className="medicalServiceCardTitle">
                      {MedicalServiceCardItem.service}
                    </IonCardTitle>
                    {adminChecking === true ? (
                      <>
                        <div className="adminControlButton">
                          <IonButton
                            fill="clear"
                            style={{ marginLeft: "2em" }}
                            onClick={() =>
                              wantToEditService(MedicalServiceCardItem.id)
                            }
                          >
                            {" "}
                            <IonIcon
                              size="large"
                              slot="icon-only"
                              color="dark"
                              icon={create}
                            />
                          </IonButton>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </IonCardHeader>
                  <IonCardSubtitle className="medicalServiceCardSubtitle">
                    {MedicalServiceCardItem.description}
                    <br />
                    Points : {MedicalServiceCardItem.point}
                    <br />
                    Service Price : {MedicalServiceCardItem.price}
                    <br />
                  </IonCardSubtitle>
                </IonCard>
              ) : (
                <Form
                  key={MedicalServiceCardItem.id}
                  onSubmit={handleSubmit(confirmEditService)}
                >
                  <IonCard>
                    {/* // medical_center_id Hidden // */}
                    <IonInput
                      required
                      value={MedicalServiceCardItem.id}
                      {...register("id")}
                      hidden
                    ></IonInput>
                    <IonInput
                      value={MedicalServiceCardItem.medical_center_id}
                      {...register("medical_center_id")}
                      hidden
                    ></IonInput>
                    {/* // medical_center_id Hidden End // */}

                    <IonItem style={{ width: "75vw" }}>
                      <IonLabel position="floating">Service:</IonLabel>
                      <IonInput
                        required
                        value={MedicalServiceCardItem.service}
                        {...register("service")}
                      ></IonInput>
                    </IonItem>
                    <IonItem style={{ width: "75vw" }}>
                      <IonLabel position="floating">Description:</IonLabel>
                      <IonInput
                        required
                        value={MedicalServiceCardItem.description}
                        {...register("description")}
                      ></IonInput>
                    </IonItem>

                    <IonItem style={{ width: "75vw" }}>
                      <IonLabel position="floating">Points: </IonLabel>
                      <IonInput
                        required
                        value={MedicalServiceCardItem.point}
                        {...register("point")}
                      ></IonInput>
                    </IonItem>

                    <IonItem style={{ width: "75vw" }}>
                      <IonLabel position="floating">Service Price : </IonLabel>
                      <IonInput
                        required
                        value={MedicalServiceCardItem.price}
                        {...register("price")}
                      >
                        ${" "}
                      </IonInput>
                    </IonItem>

                    <div className="ion-text-end">
                      <br />
                      <IonButton
                        style={{
                          width: "4em",
                          margin: "2px",
                        }}
                        color="danger"
                        onClick={() =>
                          deleteCouponBtn(MedicalServiceCardItem.id)
                        }
                      >
                        <IonIcon size="large" slot="icon-only" icon={trash} />
                      </IonButton>

                      <IonButton
                        style={{ margin: "2px" }}
                        color="secondary"
                        onClick={() =>
                          cancelEditService(MedicalServiceCardItem.id)
                        }
                      >
                        Cancel
                      </IonButton>
                      <IonButton
                        style={{ margin: "2px" }}
                        type="submit"
                        color="primary"
                      >
                        Confirm
                      </IonButton>
                    </div>

                    <IonAlert
                      isOpen={showAlert1}
                      onDidDismiss={() => setShowAlert1(false)}
                      cssClass="my-custom-class"
                      header={"Are you sure?"}
                      message={`<strong>You won't be able to revert!</strong>`}
                      buttons={[
                        {
                          text: "Delete",
                          cssClass: "permDeleteButton",
                          handler: () => {
                            dispatch(
                              delMedicalService(MedicalServiceCardItem.id)
                            );
                            console.log("Confirm Delete");
                          },
                        },
                        {
                          text: "Cancel",
                          role: "cancel",
                          cssClass: "secondary",
                          handler: (blah) => {
                            console.log("Confirm Cancel: blah");
                          },
                        },
                      ]}
                    />
                  </IonCard>
                </Form>
              )}
            </React.Fragment>
          );
        }
      )}
    </>
  );
};
export default MedicalServiceCard;
