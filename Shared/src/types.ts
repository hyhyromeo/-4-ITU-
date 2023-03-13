export type JWTPayload = {
  id: number
  email: string
  icon: string
  name: string
  birthday: Date
  is_admin: boolean
  is_agent: boolean
}

export type ResponseJSON<T> =
  | {
      ok: true
      data: T
    }
  | {
      ok: false
      error: string
    }

export type UpdateProfilePictureResult = {
  icon: string
  token: string
}

export type addNewsAndPromotionForm = {
  id:number
  image: string
  title: string
  description: string
};
