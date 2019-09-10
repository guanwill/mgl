import { initialState } from "../../store";
import { IAuthenticatedDetails } from "../../model/auth/auth";
import { AuthActionType, IAuthAction } from "../../actions/auth/authActions";

export default function authReducer(
  state: IAuthenticatedDetails = initialState.userInformation,
  action: IAuthAction
) {
  switch (action.type) {
    case AuthActionType.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionType.LOGOUT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case AuthActionType.REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };    
    default:
      return state;
  }
}
