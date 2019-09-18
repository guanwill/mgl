import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../store';
import { IApi } from '../../api';
import axios from 'axios';
import _ from 'lodash';
import { IGame } from '../../model/game/game';

export interface IConfig {
    headers: {
        Authorization: string
    }
}

export enum GameActionType {
    LOAD_GAMES = 'LOAD_GAMES',
}

export interface IGameAction {
    type: GameActionType,
    payload?: any;
}

export class GameAction implements IGameAction {
    public type: GameActionType;
    public payload?: any;

    constructor(type: GameActionType, payload: object) {
        this.type = type;
        this.payload = payload;
    }
}

export const loadedGames = (payload: IGame[]): IGameAction => {
    return {
        type: GameActionType.LOAD_GAMES,
        payload: payload,
    }
}

export const callFetchGamesApi = (user_id: string): Function => async (
    dispatch: ThunkDispatch<AppState, void, IGameAction>,
    state: AppState,
    api: IApi
) => {
    try {
        let config: IConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        }
        const gamesResponse = await api.gameApi.fetchGames(user_id, config);
        return dispatch(loadedGames(gamesResponse.games));

    } catch (e) {
        return e
    }    
}