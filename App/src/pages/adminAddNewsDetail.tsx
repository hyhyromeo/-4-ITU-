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
  IonAlert,
  IonInput,
} from "@ionic/react"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { useDispatch } from "react-redux"
import { Form } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form"
import { setDraftNewsAndPromotionPictureAction } from "../redux/NewsAndProduction/action"
import { addNewsAndPromotionForm } from "../../../Shared/dist/types"
import { loadNewsAndPromotions, postNewsAndPromotion } from "../redux/NewsAndProduction/thunk"
import "./adminAddNewsDetail.scss"

const AdminAddNewsAndPromotion: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  // const image = useSelector((state: IRootState) => state.newsAndPromotion.image)
  const [showAlert1, setShowAlert1] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<addNewsAndPromotionForm>({
    defaultValues: {
      title: null,
      description: null,
    },
  })

  function pickPhoto() {
    let input = document.createElement("input")
    input.type = "file"
    input.pattern = "image/*"
    input.multiple = false
    input.onchange = () => {
      let file = input.files?.item(0)
      if (!file) {
        return
      }
      dispatch(setDraftNewsAndPromotionPictureAction(file))
      let fileReader = new FileReader()
      fileReader.onload = () => {
        let base64String = fileReader.result as string
        setImagePreview(base64String)
      }

      fileReader.readAsDataURL(file)
      setFile(file)
    }
    input.click()
  }

  function renderChangeProfilePicture() {
    if (!imagePreview) {
      return
    }
    return (
      <div>
        <img src={imagePreview} alt="new user avatar" className="avatar" />
        <IonButton onClick={pickPhoto} color="medium" expand="block" class="button-size center-button">
          Change Image
        </IonButton>
      </div>
    )
  }

  const onSubmit: SubmitHandler<addNewsAndPromotionForm> = (data) => {
    if (data) {
      data.image = file
      setShowAlert1(true)
      dispatch(postNewsAndPromotion(data))
    } else {
      setShowAlert1(false)
    }
  }

  useEffect(() => {
    dispatch(loadNewsAndPromotions())
  }, [dispatch])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle color="secondary">Add Latest News Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <IonList lines="full" class="ion-no-margin ion-no-padding">
            <IonItem style={{ alignItems: "center" }}>
              <IonLabel position="floating">News or Promotion Image </IonLabel>
              <IonInput
                onClick={() => {
                  pickPhoto()
                }}
                {...register("image")}
              />
              {renderChangeProfilePicture()}
            </IonItem>
            <IonItem>
              <IonLabel position="floating">News or Promotion Title</IonLabel>
              <IonInput required {...register("title")} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Description</IonLabel>
              <IonInput required {...register("description")} />
            </IonItem>
          </IonList>
          <div className="ion-no-margin ion-padding footercover">
            <IonButton expand="block" type="submit">
              List
            </IonButton>
          </div>
          <IonAlert
            isOpen={showAlert1}
            onDidDismiss={() => setShowAlert1(false)}
            header={"News or Promotion Added"}
            message={""}
            buttons={[
              {
                text: "Okay",
                handler: () => {
                  history.push("/home")
                },
              },
            ]}
          />
        </Form>
      </IonContent>
    </IonPage>
  )
}

export default AdminAddNewsAndPromotion
