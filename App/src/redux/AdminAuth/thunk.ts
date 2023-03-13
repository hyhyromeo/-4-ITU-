import { IRootThunkDispatch } from "../store";
import { History } from "history";
import { showToast } from "stencil-lib/components/ion-toast/ion-toast";
import { AdminSignUpFailedAction } from "./action";

const { REACT_APP_API_SERVER } = process.env;

export function AdminSignUpThunk(registerData: object, history: History) {
  return async (dispatch: IRootThunkDispatch) => {
    const res = await fetch(`${REACT_APP_API_SERVER}/adminRegister`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      //formData no need header
      body: JSON.stringify(registerData),
    });
    const result = await res.json();
    if (!res.ok) {
      dispatch(AdminSignUpFailedAction(result.msg));
    } else {
      //notification of created user
      showToast({ message: "User Created", duration: 2000 });
      history.push("/home");
    }
  };
}
