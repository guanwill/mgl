import AuthApi from './auth/authApi';
import httpClient from './httpClient';

export interface IApi {
    authApi: AuthApi
}

export default {
    authApi: new AuthApi(httpClient, 'http://localhost:3001'),
} as IApi;