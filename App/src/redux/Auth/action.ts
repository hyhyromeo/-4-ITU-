export function loginFailedAction(msg: string) {
  return {
    type: "@@Auth/loginFailed" as const,
    msg,
  };
}

export function loginLoadTokenAction(token: string) {
  return {
    type: "@@Auth/load_token" as const,
    token,
  };
}

export function logoutAction() {
  return {
    type: "@@Auth/logout" as const,
  };
}

export function signUpFailedAction(msg: string) {
  return {
    type: "@@Auth/signUpFailed" as const,
    msg,
  };
}

export function signUpSuccessAction(user: string) {
  return {
    type: "@@Auth/signUpSuccess" as const,
    user,
  };
}

export function failedAction(msg: string) {
  return {
    type: '@@Auth/failed' as const,
    msg,
  }
}

export function setDraftProfilePictureAction(file: File) {
  return {
    type: '@@Auth/set_draft_profile_picture' as const,
    file,
  }
}

export function uploadedIconAction(file: File, icon: string) {
  return {
    type: '@@Auth/uploaded_icon' as const,
    file,
    icon,
  }
}

export type AuthAction =
  | ReturnType<typeof logoutAction>
  | ReturnType<typeof loginFailedAction>
  | ReturnType<typeof failedAction>
  | ReturnType<typeof setDraftProfilePictureAction>
  | ReturnType<typeof uploadedIconAction>
  | ReturnType<typeof loginLoadTokenAction>
  | ReturnType<typeof signUpFailedAction>
  | ReturnType<typeof signUpSuccessAction>;
