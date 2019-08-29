import { initialState } from '../../store';
import { ILoginResponse } from '../../model/auth/auth'
import { LoginActionType, LoginAction } from '../../actions/auth/loginActions'

export default function loginReducer(
    state: ILoginResponse = initialState.userInformation,
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