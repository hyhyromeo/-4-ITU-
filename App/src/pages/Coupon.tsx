import { IonContent, IonHeader, IonPage, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import { settings } from 'ionicons/icons'
import { useSelector } from 'react-redux'
import { IRootState } from '../redux/store'
import CouponApp1 from '../components/CouponComponent'

const CouponApp: React.FC = () => {
  const history = useHistory()
  const adminChecking = useSelector((state: IRootState) => state.auth.user?.is_admin)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol className='flex-container'>
                <div className='left-side'>
                  {/* <span style={{ color: "white" }}>For spacing, TODO </span> */}
                  <h5>Coupon</h5>
                </div>
                <div className='right-side'>
                  <div className='inbox-icon' onClick={() => history.push('/settings')}>
                    <IonIcon icon={settings}></IonIcon>
                  </div>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol className='profile-title'>{/* <h5>Offers </h5> */}</IonCol>

            {adminChecking === true ? (
              <div style={{ margin: '10px' }}>
                <IonButton onClick={() => history.push('/admin/addCoupon')} color='primary'>
                  + Add New Coupon
                </IonButton>
              </div>
            ) : (
              ''
            )}
          </IonRow>
          <CouponApp1 />
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default CouponApp
