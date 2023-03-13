import { profileAndPoints, Profile, Agent } from "./state";


export function gotProfilesAction(profiles: profileAndPoints) {
  return {
    type: "@@profile/gotProfileAction" as const,
    profiles,
  };
}
export function profileFailAction(msg: string) {
  return {
    type: "@@profile/getProfileFail" as const,
    msg,
  };
}
export function scanQrFailedAction(msg: string) {
  return {
    type: "@@Qr/scanQrFailed" as const,
    msg,
  };
}

export function scanQrSuccessAction(profile: Profile) {
  return {
    type: "@@Qr/scanQrSuccess" as const,
    profile,
  };
}

export function genQrCodeSuccessAction(qrCode: string, timeDiff:number) {
  return {
    type: "@@Qr/genQrSuccess" as const,
    qrCode,
    timeDiff
  };
}

export function genQrCodeFailedAction(msg: string) {
  return {
    type: "@@Qr/genQrFailed" as const,
    msg,
  };
}
export function gotAgentAction(agent : Agent) {
  return {
    type: "@@profile/gotAgentAction" as const,
    agent
  };
}
export function getAgentFailAction(msg: string) {
  return {
    type: "@@profile/getAgentFailAction" as const,
    msg,
  };
}
export type profileLookUpAction =
  | ReturnType<typeof gotProfilesAction>
  | ReturnType<typeof profileFailAction>
  | ReturnType<typeof scanQrFailedAction>
  | ReturnType<typeof scanQrSuccessAction>
  | ReturnType<typeof genQrCodeSuccessAction>
  | ReturnType<typeof genQrCodeFailedAction>
  | ReturnType<typeof gotAgentAction>
  | ReturnType<typeof getAgentFailAction>


