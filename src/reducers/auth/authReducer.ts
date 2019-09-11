import { initialState } from "../../store";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { AuthActionType, IAuthAction } from "../../actions/auth/authActions";

export default function authReducer(
  state: IAuthenticatedDetails = initialState.userInformation,
  action: IAuthAction
) {
  switch (action.type) {
    case AuthActionType.LOGIN_USER:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionType.LOGOUT_USER:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionType.REGISTER_USER:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionType.VERIFY_USER:
        return {
          ...state,
          ...action.payload
        };
    case AuthActionType.RESEND_VERIFICATION:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionType.RESET_PASSWORD:
        return {
          ...state,
          ...action.payload
        };
    default:
      return state;
  }
}
