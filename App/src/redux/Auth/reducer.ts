import { AuthState, AuthUser, initialState } from "./state";
import { AuthAction } from "./action";
import decodeJWT from "jwt-decode";

export let authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "@@Auth/logout":
      return {
        token: null,
        user: null,
        error: null,
        draftProfileFile: null,
      };
    case "@@Auth/loginFailed": {
      return {
        error: action.msg,
        user: null,
        token: null,
        draftProfileFile: null,
      };
    }
    case "@@Auth/signUpFailed": {
      return {
        error: action.msg,
        user: null,
        token: null,
        draftProfileFile: null,
      };
    }
    case '@@Auth/failed':
      return {
        error: action.msg,
        user: null,
        token: null,
        draftProfileFile: null,
      }
    case '@@Auth/set_draft_profile_picture': {
      return {
        ...state,
        draftProfileFile: action.file,
      }
    }
    case '@@Auth/uploaded_icon': {
      if (action.file !== state.draftProfileFile) {
        return state
      }
      if (!state.user) {
        return state
      }
      return {
        ...state,
        user: {
          ...state.user,
          icon: action.icon,
        },
        draftProfileFile: null,
      }
    }
    case "@@Auth/signUpSuccess": {
      return {
        ...state,
      };
    }
    case "@@Auth/load_token": {
      try {
        localStorage.setItem("token", action.token);
        const user: AuthUser = decodeJWT(action.token);
        console.log("user:", user);

        return {
          ...state,
          error: null,
          user,
          token: action.token,
        };
      } catch (error) {
        return {
          ...state,
          error: "invalid Token",
          user: null,
          token: null,
        };
      }
    }
    default:
      return state;
  }
};
