import { combineReducers } from 'redux';
import userInformation from '../reducers/auth/authReducer';
import userGames from '../reducers/game/gameReducer';
import { IAuthenticatedDetails } from '../model/auth/auth'
import { IGame } from '../model/game/game';

interface IStore {
    userInformation: IAuthenticatedDetails;
    userGames: IUserGames
}

export interface IUserGames {
    games: IGame[];
    message?: string;
}

export const initialState: IStore = {
    userInformation: {
        user: {
            verified: false,
            _id: '',
            username: '',
            name: '',
        },
        accesstoken: '',
        message: '',
    },
    userGames: {
        games: [],
        message: ''
    }
}

export const rootReducer = combineReducers({
    userInformation,
    userGames
})

export type AppState = ReturnType<typeof rootReducer>;

