import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonButtons,
    IonBackButton,
  } from "@ionic/react";
  import React, { useState } from "react";
  import { useHistory } from "react-router";
  import { useSelector } from 'react-redux'
import { profileAndPoints } from "../redux/profileLookUp/state";
import { IRootState } from "../redux/store";
import AdminGetInfo from "../components/adminGetInfo";


  const AdminPanel: React.FC = () => {
    const history = useHistory();
    const profileDataObj: profileAndPoints = useSelector((state: IRootState) => state.profileLookUp.profiles)
    const profileData = useSelector((state: IRootState) => state.profileLookUp.profiles.profile)
    

    // useEffect(() => {
    //   dispatch(getProfile())
    // }, [dispatch])

  const [valueType] = useState('info')
    
    function showInfoSegment() {
      switch (valueType) {
        case 'info':
          if (!profileData) { 
            return <div className="infoUpdatedText">No profile</div>
          }
          return (
            <AdminGetInfo profile={profileData} points={profileDataObj.record} availablePts={profileData.availablePts} />
          )
        default:
          return null
      }
    }
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/medicalService" />
          </IonButtons>
            <IonGrid>
              <IonRow>
                <IonCol className="flex-container">
                  <div className="left-side">
                    {/* <span style={{ color: "white" }}>For spacing, TODO </span> */}
                    <h5>Admin Panel</h5>
                  </div>
                 
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow>
              <IonCol className="profile-title">{/* <h5>Offers </h5> */}</IonCol>
            </IonRow>
              <div style={{display:"grid"}}>
                <IonButton
                  onClick={() => history.push("/admin/addCouponForCustomer")}
                  size="default"
                  color="primary"
                >
                  + Add New Coupon For Customer
                </IonButton>
                <IonButton
                  onClick={() => history.push("/admin/pointAddition")}
                  size="default"
                  color="primary"
                >
                  + Add Point For Customer
                </IonButton>
              </div>

          <div>{showInfoSegment()}</div>

          </IonGrid>
        </IonContent>
      </IonPage>
    );
  };
  
  export default AdminPanel;

