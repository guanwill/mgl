import { ThunkDispatch } from 'redux-thunk';
import { AppState, IUserGamesStore } from '../../store';
import { IApi } from '../../api';
import _ from 'lodash';
import { IGame, IGamesApiResponse } from '../../model/game/game';

export interface IConfig {
    headers: {
        Authorization: string
    }
}

export enum GameActionType {
    LOAD_GAMES = 'LOAD_GAMES',
    ADD_GAME = "ADD_GAME",
    DELETE_GAME = "DELETE_GAME"
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
        const gamesResponse: IGamesApiResponse = await api.gameApi.fetchGames(user_id, config);
        return dispatch(loadedGames(gamesResponse.games));

    } catch (e) {
        return e
    }
}

export const addGameSuccess = (payload: IUserGamesStore): IGameAction => {
    return {
        type: GameActionType.ADD_GAME,
        payload: payload,
    }
}

export const callAddGameApi = (title: string, user_id: string): Function => async (
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
        const gamesResponse = await api.gameApi.addGame(title, user_id, config);

        console.log('gamesResponse ', gamesResponse);
        return dispatch(addGameSuccess(gamesResponse));

    } catch (e) {
        return e
    }    
}

export const deleteGameSuccess = (payload: IUserGamesStore): IGameAction => {
    return {
        type: GameActionType.DELETE_GAME,
        payload: payload,
    }
}

export const callDeleteGameApi = (user_id: string, game_id: string): Function => async (
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
        const gamesResponse = await api.gameApi.deleteGame(user_id, game_id, config);

        console.log('deleteGamesResponse ', gamesResponse);
        return dispatch(deleteGameSuccess(gamesResponse));

    } catch (e) {
        return e
    }    
}