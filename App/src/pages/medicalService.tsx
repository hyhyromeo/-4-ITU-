import { IonContent, IonHeader, IonPage, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonButton } from '@ionic/react'
import React from 'react'
import { useHistory } from 'react-router'
import { settings } from 'ionicons/icons'
import MedicalServiceCard from '../components/medicalServiceComponent'
import { useSelector } from 'react-redux'
import { IRootState } from '../redux/store'
import './medicalService.scss'

const MedicalPage: React.FC = () => {
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
                  <h5>Medical Service</h5>
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <div style={{ margin: '10px' }}>
                  <IonButton
                    onClick={() => history.push('/admin/AdminAddMedicalService')}
                    size='default'
                    color='primary'
                  >
                    + Add New Service
                  </IonButton>
                </div>
              </div>
            ) : (
              ''
            )}
          </IonRow>

          <MedicalServiceCard />
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default MedicalPage
