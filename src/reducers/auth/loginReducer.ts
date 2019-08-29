import { initialState } from '../../store';
import { IAuthenticatedDetails } from '../../model/auth/auth'
import { LoginActionType, LoginAction } from '../../actions/auth/loginActions'

export default function loginReducer(
    state: IAuthenticatedDetails = initialState.userInformation,
    action: LoginAction
) {
    switch(action.type) {
        case LoginActionType.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}