import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonGrid,
  IonCol,
  IonAvatar,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonLabel,
  IonButton,
  IonContent,
  IonIcon,
  useIonViewDidEnter,
} from '@ionic/react'
import React, {  useState } from 'react'
import './Profile.scss'
import Info from '../components/info'
import { profileAndPoints } from '../redux/profile/state'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../redux/profile/thunk'
import { IRootState } from '../redux/store'
import { changeProfilePictureThunk, logoutThunk } from '../redux/Auth/thunk'
import { Redirect, useHistory } from 'react-router'
import { setDraftProfilePictureAction } from '../redux/Auth/action'
import { toImageSrc } from '../helpers/image'
import { camera } from 'ionicons/icons'

const Profile: React.FC = () => {
  // const showModal = useSelector((state: any) => state.reviewReducers.showModal);
  // const showConfirmModal = useSelector((state: any) => state.reviewReducers.showConfirmModal);

  const user = useSelector((state: IRootState) => state.auth.user);
  const file = useSelector((state: IRootState) => state.auth.draftProfileFile);
  const [valueType] = useState("info");
  const token = useSelector((state: IRootState) => state.auth.token);
  const history = useHistory();
  const profileData: profileAndPoints = useSelector(
    (state: IRootState) => state.profileAndPoints.profiles
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProfile())
  // }, [dispatch])

  useIonViewDidEnter(() => {
    dispatch(getProfile())
  });


  function uploadPhoto() {
    if (!file) {
      return;
    }
    dispatch(changeProfilePictureThunk(file, history));
  }

  function pickPhoto() {
    let input = document.createElement("input");
    input.type = "file";
    input.pattern = "image/*";
    input.multiple = false;
    input.onchange = () => {
      let file = input.files?.item(0);
      if (!file) {
        return;
      }
      dispatch(setDraftProfilePictureAction(file));
      let fileReader = new FileReader();
      fileReader.onload = () => {
        let base64String = fileReader.result as string;
        setImagePreview(base64String);
      };
      fileReader.readAsDataURL(file);
    };
    input.click();
  }

  function renderChangeProfilePicture() {
    if (!file) {
      return;
    }
    if (!imagePreview) {
      return <code>Loading image preview ...</code>;
    }
    return (
      <div>
        <IonAvatar>
          <img alt="new user avatar" src={imagePreview} />
        </IonAvatar>
        <IonButton
          onClick={uploadPhoto}
          color="primary"
          expand="block"
          class="button-size center-button"
        >
          Confirm
        </IonButton>
      </div>
    );
  }

  function showInfoSegment() {
    switch (valueType) {
      case "info":
        if (!profileData.profile) {
          return <div className="infoUpdatedText">Info updated!</div>;
        }
        return (
          <Info
            profile={profileData.profile}
            points={profileData.record}
            availablePts={profileData.availablePts}
          />
        );
      default:
        return null;
    }
  }

  function logout() {
    dispatch(logoutThunk(history));
  }

  if (!user) {
    return <Redirect to="/onboarding" />;
  }
  let icon = toImageSrc(user.icon);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonSegment
            onIonChange={(e) => console.log("Segment selected", e.detail.value)}
          >
            <IonLabel>Profile Information</IonLabel>
          </IonSegment>
          <IonCol className="ion-profile ion-text-center">
            <div className="avPad">
            <IonAvatar>
              <img alt="icon" src={icon} />
              <IonIcon
                onClick={pickPhoto}
                className="cameraIcon"
                icon={camera}
              ></IonIcon>
            </IonAvatar>
            </div>
            {renderChangeProfilePicture()}
          </IonCol>
          <div className="profileContent">{showInfoSegment()}</div>
          {token ? (
            <>
              <div>
                {" "}
                <IonButton
                  onClick={logout}
                  fill="outline"
                  color="tertiary"
                  class="button-size"
                >
                  Logout
                </IonButton>
              </div>

            </>
          ) : (
            <Redirect to="/onboarding" />
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
