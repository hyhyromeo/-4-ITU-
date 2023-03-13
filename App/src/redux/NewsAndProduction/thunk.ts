import { api } from '../../helpers/api'
import { loadedNewsAndPromotions, failed, deletedNewsAndPromotions as deletedNewsAndPromotion } from './action'
import { IRootThunkDispatch } from '../store'
import { NewsAndPromotion } from './state'
import { addNewsAndPromotionForm } from '../../../../Shared/dist/types'
import Swal from 'sweetalert2'

export function loadNewsAndPromotions() {
  return async (dispatch: IRootThunkDispatch) => {
    let res = await api.get('/newsAndPromotion')
    if (res.status === 200) {
      let newsAndPromotions = await res.json()
      dispatch(loadedNewsAndPromotions(newsAndPromotions))
      // dispatch(loadNewsAndPromotions())
    } else {
      dispatch(failed(`failed to load newsAndPromotions: ` + res.statusText))
      
    }
  }
}

export function postNewsAndPromotion(form: addNewsAndPromotionForm) {
  let formData = new FormData()
  formData.set('newsImage', form.image!)
  formData.set('title', form.title!)
  formData.set('description', form.description!)
  return async (dispatch: IRootThunkDispatch) => {
    try {
      let res = await api.post('/newsAndPromotion', formData)
      let newsAndPromotion: NewsAndPromotion = await res.json()
      dispatch(loadedNewsAndPromotions([newsAndPromotion]))
    } catch (error) {
      Swal.showValidationMessage(error.message)
    }
  }
}

export function deleteNewsAndPromotion(id: number) {
  return async (dispatch: IRootThunkDispatch) => {
    try {
      let res = await api.delete('/newsAndPromotion/' + id)
      if (res.status === 202) {
        dispatch(deletedNewsAndPromotion(id))
      } else {
        throw new Error(await res.text())
      }
    } catch (error) {
      console.error('failed to delete newsAndPromotion:', error)
    }
  }
}

export function updateNewsAndPromotion(id: number) {
  return async (dispatch: IRootThunkDispatch) => {
    Swal.fire({
      title: 'Edit NewsAndPromotion',
      input: 'file',
      html:
      '<input placeholder="Title" id="updateTitle" class="updateTitle">' +
      '<input placeholder="Description" id="updateDescription" class="updateDescription">',
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: async (text) => {
        // console.log('send patch')
        // let res = await api.patch(`/newsAndPromotion/${id}`, {
        //   title: String,
        //   image: File,
        // })
        // console.log('received patch res', res.statusText)
        // let message = await res.text()
        // console.log('received patch msg', message)
        // if (res.status !== 202) {
        //   Swal.showValidationMessage(message)
        // } else {
        //   Swal.fire({ title: 'Saved NewsAndPromotion' })
        //   let newsAndPromotion: NewsAndPromotion = JSON.parse(message)
        //   dispatch(loadedNewsAndPromotions([newsAndPromotion]))
        // }
        return
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log('Swal result:', result)
    })
  }
}
