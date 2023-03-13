import { claimed, profileAndPoints } from "./state";

export function profileGetAction(profileAct: profileAndPoints) {
  return {
    type: "@@profile/profileGetAction" as const,
    profileAct,
  };
}

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

export function profileEditAction(profiles: profileAndPoints) {
  return {
    type: "@@profile/profileEditAction" as const,
    profiles,
  };
}
export function getClaimedAction(claims: claimed[]) {
  return {
    type: "@@claimed/getClaimedAction" as const,
    claims,
  };
}

export type profileAction = ReturnType<
  | typeof profileGetAction
  | typeof gotProfilesAction
  | typeof profileFailAction
  | typeof profileEditAction
  | typeof getClaimedAction
>;
