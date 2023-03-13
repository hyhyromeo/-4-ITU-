import { AdminAuthState, initialState } from "./state";
import { AdminAuthAction } from "./action";

export let adminAuthReducer = (
  state: AdminAuthState = initialState,
  action: AdminAuthAction
): AdminAuthState => {
  switch (action.type) {
    case "@@Admin/signUpFailed": {
      return {
        error: action.msg,
        email: null,
        password: null,
        cpassword: null,
        admin: null,
      };
    }
    case "@@Admin/signUpSuccess": {
      return {
        ...state,
      };
    }
    
    default:
      return state;
  }
};
