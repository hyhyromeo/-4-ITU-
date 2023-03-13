import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonCard,
  useIonViewDidEnter,
} from '@ionic/react'
import React from 'react'
import './Home.scss'
import addOutline from '../assets/icons/addOutline.svg'

import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useHistory } from 'react-router'
import { toImageSrc } from '../helpers/image'
import { IRootState } from '../redux/store'
import { loadNewsAndPromotions } from '../redux/NewsAndProduction/thunk'
import { NewsAndPromotion } from '../components/newsAndPromotion'
import { Link } from 'react-router-dom'
import IonPageFix from '../components/IonPageFix'

  const Home: React.FC = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(loadNewsAndPromotions())
  // }, [dispatch])


  useIonViewDidEnter(() => {
    dispatch(loadNewsAndPromotions())
  });
  const newsAndPromotions = useSelector((state: IRootState) => state.newsAndPromotion.newsAndPromotions)
  const newsAndPromotionStatus = useSelector((state: IRootState) => state.newsAndPromotion.status)
  const newsAndPromotionError = useSelector((state: IRootState) => state.newsAndPromotion.error)
  const history = useHistory()
  const user = useSelector((state: IRootState) => state.auth.user)
  const adminChecking = useSelector((state: IRootState) => state.auth.user?.is_admin)

  if (!user) {
    return <Redirect to='/onboarding' />
  }
  let icon = toImageSrc(user.icon)
  let name = user.name
  let today = new Date()
  let currentTime = today.getHours()
  let greet
  if (currentTime < 12) {
    greet = 'Good Morning,'
  } else if (currentTime < 18) {
    greet = 'Good Afternoon,'
  } else {
    greet = 'Good Evening,'
  }

  function NewsAndPromotions() {
    if (newsAndPromotionStatus === 'loading') {
      return <p>Loading News And Promotions...</p>
    }
    if (newsAndPromotionStatus === 'error') {
      return (
        <p>
          Failed to load newsAndPromotions: <code>{newsAndPromotionError}</code>
        </p>
      )
    }
    if (newsAndPromotions.size === 0) {
      return <p>No any newsAndPromotion yet</p>
    }
    return Array.from(newsAndPromotions.values()).map((newsAndPromotion) => {
      return (
        <div className='col' id={`newsAndPromotion-${newsAndPromotion.id}`} key={newsAndPromotion.id}>
          <NewsAndPromotion newsAndPromotion={newsAndPromotion} />
        </div>
      )
    })
  }

  return (
    <IonPageFix path="/home">
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol className='flex-container'>
                <div className='left-side'>
                  <span>{greet}</span>
                  <h5>{name}!</h5>
                </div>
                <div className='right-side'>

                    {/* <Link to="/myappointments" className="inbox-icon">
                    <IonIcon src={inbox}></IonIcon>
                    <IonBadge>1</IonBadge>
                    </Link> */}
                  <IonAvatar >
                    <Link to="/profile">
                    <img src={icon} alt='profileIcon' />
                    </Link>
                  </IonAvatar>
                </div>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <h5 style={{ display: 'flex', margin: '1em' }}>Latest News</h5>
          {adminChecking === true ? (
            <IonCard>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => history.push('/admin/addNewsDetail')}
              >
                <IonIcon className='addOutline' src={addOutline}></IonIcon>
              </div>
            </IonCard>
          ) : (
            ''
          )}

          {NewsAndPromotions()}
        </IonGrid>
      </IonContent>
    </IonPageFix>
  )
}

export default Home
