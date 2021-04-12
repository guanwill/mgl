import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store';
import { IApi } from '../../api';
import { IAuthenticatedDetails, IAuthenticatedUserDetails } from '../../model/auth/auth';
import axios from 'axios';
import _ from 'lodash';

export enum AuthActionType {
    LOGIN_USER = 'LOGIN_USER',
    LOGOUT_USER = 'LOGOUT_USER',
    REGISTER_USER = 'REGISTER_USER',
    VERIFY_USER = 'VERIFY_USER',
    RESEND_VERIFICATION = "RESEND_VERIFICATION",
    RESET_PASSWORD = "RESET_PASSWORD"
    // LOGIN_ERROR = 'LOGIN_ERROR',
    // REGISTER_ERROR = 'REGISTER_ERROR',
}

export interface IAuthAction {
    type: AuthActionType,
    payload?: any;
}

export class AuthAction implements IAuthAction {
    public type: AuthActionType;
    public payload?: any;

    constructor(type: AuthActionType, payload: object) {
        this.type = type;
        this.payload = payload;
    }
}

// export const setLoginError = (loginError: any): IAuthAction => {
//     return {
//         type: AuthActionType.LOGIN_ERROR,
//         payload: loginError,
//     }
// }

export const setLoginSuccess = (loginResponse: IAuthenticatedDetails): IAuthAction => {
    return {
        type: AuthActionType.LOGIN_USER,
        payload: loginResponse,
    }
}

export const callLoginApi = (username: string, password: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const { user, accesstoken, message } = await api.authApi.login(username, password);

        if (user) {
            const userDetails: IAuthenticatedUserDetails = _.pick(user, 'verified', '_id', 'username', 'name');
            const payload: IAuthenticatedDetails = { user: userDetails, accesstoken, message };
            localStorage.setItem('accessToken', accesstoken);
            // axios.defaults.headers.common['Authorization'] = payload.accesstoken;

            console.log('AUTHACTION SET HEADER ', axios.defaults.headers.common['Authorization']);
            return dispatch(setLoginSuccess(payload));
        }
        
        const pendingVerificationUser = { user: {verified: false, _id:'', username: '', name: ''}, accesstoken: '', message: message };
        return dispatch(setLoginSuccess(pendingVerificationUser));

    } catch (e) {
        // delete axios.defaults.headers.common['Authorization'];
        // return dispatch(setLoginError(e));
        return e
    }    
}

export const logoutUser = (logoutPayload: IAuthenticatedDetails) => {
    return {
        type: AuthActionType.LOGOUT_USER,
        payload: logoutPayload,
    }
}

// export const setRegisterError = (registerError: any): IAuthAction => {
//     return {
//         type: AuthActionType.REGISTER_ERROR,
//         payload: registerError,
//     }
// }

export const setRegisterSuccess = (registerResponse: Partial<IAuthenticatedDetails>): IAuthAction => {
    return {
        type: AuthActionType.REGISTER_USER,
        payload: registerResponse,
    }
}

export const callRegisterApi = (username: string, password: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const { message } = await api.authApi.register(username, password);
        return dispatch(setRegisterSuccess({ message }));
    } catch (e) {
        // return dispatch(setRegisterError(e));
        return e
    }    
}

export const setVerifySuccess = (verifyResponse: IAuthenticatedDetails): IAuthAction => {
    return {
        type: AuthActionType.VERIFY_USER,
        payload: verifyResponse,
    }
}

export const callVerifyApi = (token: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const verificationResponse = await api.authApi.verify(token);
        const payload: IAuthenticatedDetails = { user: {verified: false, _id:'', username: '', name: ''}, accesstoken: '', message: verificationResponse.message };
        return dispatch(setVerifySuccess(payload));
    } catch (e) {
        // return dispatch(setRegisterError(e));
        return e
    }    
}

export const setResendVerificationSuccess = (verifyResponse: IAuthenticatedDetails): IAuthAction => {
    return {
        type: AuthActionType.RESEND_VERIFICATION,
        payload: verifyResponse,
    }
}

export const callResendVerificationApi = (email: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const verificationResponse = await api.authApi.resendVerificationToken(email);
        const payload: IAuthenticatedDetails = { user: {verified: false, _id:'', username: '', name: ''}, accesstoken: '', message: verificationResponse.message };
        return dispatch(setResendVerificationSuccess(payload));
    } catch (e) {
        // return dispatch(setRegisterError(e));
        return e
    }    
}

export const setResetPasswordSuccess = (verifyResponse: IAuthenticatedDetails): IAuthAction => {
    return {
        type: AuthActionType.RESET_PASSWORD,
        payload: verifyResponse,
    }
}

export const callResetPasswordApi = (email: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IAuthAction>,
    state: AppState,
    api: IApi
) => {
    try {
        const forgotPasswordResponse = await api.authApi.resetPassword(email);
        const payload: IAuthenticatedDetails = { user: {verified: false, _id:'', username: '', name: ''}, accesstoken: '', message: forgotPasswordResponse.message };
        return dispatch(setResetPasswordSuccess(payload));
    } catch (e) {
        // return dispatch(setRegisterError(e));
        return e
    }    
}
