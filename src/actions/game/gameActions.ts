import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../store";
import { IApi } from "../../api";
// import _ from 'lodash';
import {
  IGame,
  IGamesApiResponse,
  IGameApiResponse,
  IUserGamesStore,
  IGameToAdd,
  IGameLocal,
} from "../../model/game/game";

export interface IConfig {
  headers: {
    Authorization: string;
  };
}

export enum GameActionType {
  LOAD_GAMES = "LOAD_GAMES",
  ADD_GAME = "ADD_GAME",
  DELETE_GAME = "DELETE_GAME",
  UPDATE_GAME = "UPDATE_GAME",
  ADD_SEARCHED_GAME = "ADD_SEARCHED_GAME",
  CLEAR_SEARCHED_GAME = "CLEAR_SEARCHED_GAME",
}

export interface IGameAction {
  type: GameActionType;
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
  };
};

export const callFetchGamesApi = (user_id: string): Function => async (
  dispatch: ThunkDispatch<AppState, void, IGameAction>,
  state: AppState,
  api: IApi
) => {
  console.log('callFetchGamesApi');
  let config: IConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const { games }: IGamesApiResponse = await api.gameApi.fetchGames(
    user_id,
    config
  );
  const sortedGames = games.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );

  console.log('finish calling...', games);
  dispatch(loadedGames(sortedGames));
};

export const callAddGameApi = (
  user_id: string,
  gameArgs: Partial<IGameLocal>
): Function => async (
  dispatch: ThunkDispatch<AppState, void, IGameAction>,
  state: AppState,
  api: IApi
) => {
  let config: IConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const gamesResponse = await api.gameApi.addGame(
    user_id,
    gameArgs,
    config
  );
  // dispatch(addGameSuccess(gamesResponse));
  dispatch(clearSearchedGame());
  return gamesResponse;
};

export const deleteGameSuccess = (payload: IUserGamesStore): IGameAction => {
  return {
    type: GameActionType.DELETE_GAME,
    payload: payload,
  };
};

export const callDeleteGameApi = (
  user_id: string,
  game_id: string
): Function => async (
  dispatch: ThunkDispatch<AppState, void, IGameAction>,
  state: AppState,
  api: IApi
) => {
  try {
    let config: IConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const gamesResponse = await api.gameApi.deleteGame(
      user_id,
      game_id,
      config
    );
    return dispatch(deleteGameSuccess(gamesResponse));
  } catch (e) {
    return e;
  }
};

export const callUpdateGameApi = (
  gameArgs: Partial<IGameLocal>,
  user_id: string,
  game_id: string
): Function => async (
  dispatch: ThunkDispatch<AppState, void, IGameAction>,
  state: AppState,
  api: IApi
) => {
  let config: IConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  return await api.gameApi.updateGame(
    gameArgs,
    user_id,
    game_id,
    config
  );
  // return dispatch(updateGameSuccess(gamesResponse));
};

export const addSearchedGame = (payload: IGameToAdd): IGameAction => {
  return {
    type: GameActionType.ADD_SEARCHED_GAME,
    payload: payload,
  };
};

export const clearSearchedGame = (): IGameAction => {
  const resetResults = {
    title: "",
    release_date: "",
  };

  return {
    type: GameActionType.CLEAR_SEARCHED_GAME,
    payload: resetResults,
  };
};

export const executeClearSearchedGame = (): Function => async (dispatch) => {
  dispatch(clearSearchedGame());
};

export const getPublicGamesListForUser = (user_id: string): Function => async (
  dispatch: ThunkDispatch<AppState, void, IGameAction>,
  state: AppState,
  api: IApi
) => {
  const gamesResponse: IGamesApiResponse = await api.gameApi.fetchPublicGamesListForUser(
    user_id
  );
  const sortedGames = gamesResponse.games.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
  return dispatch(loadedGames(sortedGames));
};
