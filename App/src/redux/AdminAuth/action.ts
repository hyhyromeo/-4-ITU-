export function AdminSignUpFailedAction(msg: string) {
  return {
    type: "@@Admin/signUpFailed" as const,
    msg,
  };
}

export function AdminSignUpSuccessAction(register: object) {
  return {
    type: "@@Admin/signUpSuccess" as const,
    register,
  };
}



export type AdminAuthAction =
  | ReturnType<typeof AdminSignUpFailedAction>
  | ReturnType<typeof AdminSignUpSuccessAction>

