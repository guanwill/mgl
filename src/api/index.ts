import AuthApi from './auth/authApi';
import GameApi from './games/gameApi'
import httpClient from './httpClient';

export interface IApi {
    authApi: AuthApi
    gameApi: GameApi
}

export default {
    authApi: new AuthApi(httpClient, 'http://localhost:3001'),
    gameApi: new GameApi(httpClient, 'http://localhost:3001'),
} as IApi;