import { profileLookUpAction } from "./action";
import { initialProfileLookUpState, profileLookUpState } from "./state";


export let profileLookUpReducer = (
  state: profileLookUpState = initialProfileLookUpState,
  action: profileLookUpAction
): profileLookUpState => {
  switch (action.type) {
    case "@@profile/gotProfileAction": {
      console.log('aprofilelookup ction  = ', action)
      return {
        ...state,
      };
    } case "@@profile/getProfileFail": {
      return {
        ...state,
        error:action.msg
      };
    } case "@@Qr/scanQrFailed": {
      return {
        ...state,
        error:action.msg
      };
    } case "@@Qr/scanQrSuccess": {
    let updatedState = {...state}
      updatedState.profiles.profile = action.profile
      console.log("scan success !! updatedState", updatedState);
      
      return JSON.parse(JSON.stringify(updatedState));
    } case "@@Qr/genQrSuccess": {
      return {
        ...state,
        qrCode: action.qrCode,
        timeDiff : action.timeDiff
      };
    } case "@@Qr/genQrFailed": {
      return {
        ...state,
        error:action.msg
      };
    } case "@@profile/gotAgentAction": {
      // profiles : {...state.profiles, addPoint: {agent:action.agent}}
      return {
        ...state,
        profiles : {...state.profiles, addPoint: {...state.profiles.addPoint , agent:action.agent}}
      };
    } 

    default:
      return state;
  }
};
