import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonInput,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonLabel,
} from "@ionic/react";

import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import {Point_record, Profile } from "../redux/profileLookUp/state";
export const data = {};

export type editInfoForm = {
  name: string | null;
  membership_no: string | null;
  email: string | null;
  phone_number: string | null;
  gender: string | null;
  birthday: string | null;
  icon: string | null;
  roles: string | null;
  agent: string | null;
};

const AdminGetInfo = (props: {
  profile: Profile ;
  points: Point_record[];
  availablePts: number;
}) => {
  const { profile, points, availablePts } = props;

  let name = profile.name;
  let membership_no = profile.membership_no;
  // let email = profile.email;
  let phone_number = profile.phone_number;
  // let birthday = profile.birthday;
  let agent = profile.agent;

  const { register, handleSubmit } = useForm<editInfoForm>({
    defaultValues: {
      name: name,
      membership_no: profile.membership_no,
      phone_number: phone_number,
      agent: agent,
    },
  });
  const onSubmit: SubmitHandler<editInfoForm> = (data) => {
    console.log("adminGetInfo date ====",data);
  };

  return (
    <div style={{display:"grid"}}>
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonLabel>
            Customer information: 
          </IonLabel>
          <div className="info-list">
            <IonList>
              <IonItem key="data">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <IonItem>
                    <label>Available Points:</label>
                    <IonInput
                      disabled={true}
                      slot="end"
                      value={availablePts}
                    />
                  </IonItem>
                  <IonItem>
                    <label>Name</label>
                    <IonInput slot="end" value={name} disabled={true}{...register("name")} />
                  </IonItem>
                  <IonItem>
                    <label>Membership No.</label>
                    <IonInput
                      slot="end"
                      disabled={true}
                      value={membership_no}
                      {...register("membership_no")}
                    />
                  </IonItem>
                  <IonItem>
                    <label>Phone Number</label>
                    <IonInput
                      slot="end"
                      value={phone_number}
                      disabled={true}
                      {...register("phone_number")}
                    />
                  </IonItem>
                  <IonItem>
                    <label>Agent Name</label>
                    <IonInput
                      disabled={true}
                      slot="end"
                      value={agent}
                      {...register("agent")}
                    />
                  </IonItem>

                  {points.map((point) => (
                    <IonCard style={{ height: "13vh" }}>
                      <IonCardTitle
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      >
                        Points: {point.point}
                      </IonCardTitle>
                      <br />
                      <IonCardContent
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {point.points_gained_date.split("T")[0]}
                      </IonCardContent>
                    </IonCard>
                  ))}
                </Form>
              </IonItem>
            </IonList>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
    </div>
  );
};

export default AdminGetInfo;
