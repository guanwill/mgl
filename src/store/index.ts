import { combineReducers } from 'redux';
import userInformation from '../reducers/auth/loginReducer'
import { ILoginResponse } from '../model/auth/auth'

interface IStore {
    userInformation: ILoginResponse;
}

export const initialState: IStore = {
    userInformation: {
        user: {
            // address: [],
            // games: [],
            verified: false,
            _id: '',
            username: '',
            // salt: '',
            // hash: '',
            // __v: 0,
            // verification_token: '',
            // verification_token_created_at: new Date(),
            name: '',
        },
        accesstoken: '',
        message: '',
    }
}

export const rootReducer = combineReducers({
    userInformation
})

export type AppState = ReturnType<typeof rootReducer>;

