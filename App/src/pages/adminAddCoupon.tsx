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
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonAlert,
} from "@ionic/react"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"
import { Form } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { addCoupon } from "../redux/coupon/thunk"
export type addedCouponForm = {
  giftItem: string | null
  cost: string | null
  description: string | null
}

const AdminAddCoupon: React.FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [showAlert1, setShowAlert1] = useState(false)

  const { register, handleSubmit } = useForm<addedCouponForm>({
    defaultValues: {
      giftItem: null,
      cost: null,
      description: null,
    },
  })

  const onSubmit: SubmitHandler<addedCouponForm> = (data) => {
    if (data) {
      setShowAlert1(true)
      console.log("addedCouponForm:", data)
      dispatch(addCoupon(data))
    } else {
      setShowAlert1(false)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/coupon" />
          </IonButtons>
          <IonTitle color="secondary">Add New Coupon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">
            <IonItem>
              <IonLabel position="floating">New Coupon Title </IonLabel>
              <IonInput required {...register("giftItem")} />
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Required Points</IonLabel>
              <IonInput type="number" required {...register("cost")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">New Coupon Description</IonLabel>
              <IonTextarea required {...register("description")} />
            </IonItem>
          </IonList>

          <div className="ion-padding footercover">
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
              header={"Coupon Added!"}
              message={""}
              buttons={[
                {
                  text: "Okay",
                  handler: () => {
                    history.push("/coupon")
                    console.log("Redeem Success and back Homepage")
                    // window.location.reload();

                  },
                },
              ]}
            />
          </div>
        </Form>
      </IonContent>
    </IonPage>
  )
}

export default AdminAddCoupon
