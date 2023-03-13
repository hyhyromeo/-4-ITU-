import { profileAction } from "./action";
import { initialProfileState, profileState } from "./state";

export let ProfileReducer = (
  state: profileState = initialProfileState,
  action: profileAction
): profileState => {
  switch (action.type) {
    case "@@profile/gotProfileAction": {
      return {
        ...state,
        profiles: action.profiles,
      };
    }
    case "@@profile/profileEditAction": {
      return {
        ...state,
        profiles: action.profiles,
      };
    }
    case "@@claimed/getClaimedAction": {
      return {
        ...state,
        claims: action.claims,
      };
    }

    default:
      return state;
  }
};
