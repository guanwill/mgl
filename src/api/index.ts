import AuthApi from './auth/authApi';
import GameApi from './games/gameApi'
import GiantBombApi from './games/giantBombApi';
import httpClient from './httpClient';

export interface IApi {
    authApi: AuthApi
    gameApi: GameApi
    giantBombApi: GiantBombApi
}

export default {
    authApi: new AuthApi(httpClient, 'https://abh-backend.herokuapp.com' || 'http://localhost:8000'),
    gameApi: new GameApi(httpClient, 'https://abh-backend.herokuapp.com' || 'http://localhost:8000'),
    giantBombApi: new GiantBombApi(httpClient, 'https://abh-backend.herokuapp.com' || 'http://localhost:8000')
} as IApi;