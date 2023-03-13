import React from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonList,
  IonInput,
  IonButton,
} from "@ionic/react";
import { editProfile } from "../redux/profile/thunk";
import { Point_record, Profile } from "../redux/profile/state";
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

export const data = {};

export type editInfoForm = {
  name: string | null;
  membership_no: string | null;
  email: string | null;
  phone_number: string | null;
  gender: string | null;
  birthday: string;
  icon: string | null;
  roles: string | null;
  agent: string | null;
};

const Info = (props: {
  profile: Profile;
  points: Point_record[];
  availablePts: number;
}) => {
  const dispatch = useDispatch();

  const { profile, availablePts } = props;
  let name = profile.name;
  let membership_no = profile.membership_no;
  let email = profile.email;
  let phone_number = profile.phone_number;
  let birthday = profile.birthday;
  let agent = profile.agent;

  const { register, handleSubmit } = useForm<editInfoForm>({
    defaultValues: {
      name: name,
      membership_no: profile.membership_no,
      email: email,
      phone_number: phone_number,
      birthday: birthday,
      agent: agent,
    },
  });
  const onSubmit: SubmitHandler<editInfoForm> = (data) => {
    refresh();
    console.log(data);
    dispatch(editProfile(data));
  };

  function refresh() {
    window.location.reload();
  }

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <div className="info-list">
            <IonList>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <IonItem>
                  <label>Available Points:</label>
                  <IonInput
                    disabled={true}
                    slot="end"
                    value={availablePts.toString()}
                  />
                </IonItem>
                <IonItem>
                  <label>Name</label>
                  <IonInput slot="end" value={name} {...register("name")} />
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
                  <label>Email</label>
                  <IonInput
                    slot="end"
                    disabled={true}
                    value={email}
                    {...register("email")}
                  />
                </IonItem>
                <IonItem>
                  <label>Phone Number</label>
                  <IonInput
                    slot="end"
                    type="tel"
                    value={phone_number}
                    {...register("phone_number")}
                    // disabled={EditReady}
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
                <IonButton
                  style={{ marginTop: "50px", marginBottom: "30px" }}
                  class="button-size"
                  expand="block"
                  type="submit"
                  id="editProfileButton"
                  color="dark"
                >
                  Update Profile
                </IonButton>
              </Form>
            </IonList>
            {/* {points.map((point) => (
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
                ))} */}
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Info;
