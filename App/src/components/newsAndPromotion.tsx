import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react'
import React, { useState } from 'react'
import {
  // updateNewsAndPromotion,
  deleteNewsAndPromotion as deleteNewsAndPromotionThunk,
} from '../redux/NewsAndProduction/thunk'
import { useDispatch, useSelector } from 'react-redux'
import { NewsAndPromotions } from '../redux/NewsAndProduction/state'
import { IRootState } from '../redux/store'

type Props = {
  newsAndPromotion: NewsAndPromotions[number]
}

export function NewsAndPromotion(props: Props) {
  let { newsAndPromotion } = props
  let { id } = newsAndPromotion
  const adminChecking = useSelector((state: IRootState) => state.auth.user?.is_admin)
  const [cancelAlert, setShowcancelAlert] = useState(false)
  const dispatch = useDispatch()

  // function editNewsAndPromotion() {
  //   dispatch(updateNewsAndPromotion(id))
  // }

  function deleteNewsAndPromotion() {
    dispatch(deleteNewsAndPromotionThunk(id))
  }

  return (
    <>
      <IonCard key={newsAndPromotion.id}>
        {newsAndPromotion.image && (
          <div className='newsAndImageContainer'>
            <img
              alt='newsimage'
              src={`${newsAndPromotion.image}`}
              style={{ margin: '1em', justifyContent: 'center' }}
            />
          </div>
        )}
        <IonCardHeader style={{ justifyContent: 'center' }}>
          <IonCardTitle>{newsAndPromotion.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{newsAndPromotion.description}</IonCardContent>
        {adminChecking === true ? (
          <>
            <div className='ion-text-end'>
              <div className='contolButton'>
                {/* <IonButton style={{ marginRight: '1em' }} onClick={() => editNewsAndPromotion()}>
                  Edit
                </IonButton> */}
                <IonButton color='tertiary' className='cancelIonButton' onClick={() => setShowcancelAlert(true)}>
                  Delete
                </IonButton>
              </div>
            </div>
            <IonAlert
              isOpen={cancelAlert}
              onDidDismiss={() => setShowcancelAlert(false)}
              cssClass='my-custom-class'
              header={'Are you sure?'}
              message={`<strong>You won't be able to revert!</strong>`}
              buttons={[
                {
                  text: 'Delete',
                  cssClass: 'permDeleteButton',
                  handler: () => {
                    deleteNewsAndPromotion()
                  },
                },
                {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    return
                  },
                },
              ]}
            />
          </>
        ) : null}
      </IonCard>
    </>
  )
}
