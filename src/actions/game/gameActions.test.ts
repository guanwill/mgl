import { IGamesApiResponse, IGameLocal, IUserGamesStore, IGameToAdd } from '../../model/game/game';
import {
    callFetchGamesApi,
    GameActionType,
    IGameAction,
    IConfig,
    loadedGames,
    clearSearchedGame,
    callAddGameApi,
    callDeleteGameApi,
    deleteGameSuccess,
    callUpdateGameApi,
    addSearchedGame
} from './gameActions';

const createExpectedAction = (type: GameActionType, payload: any): IGameAction => {
    return { type, payload };
};

const createApi = (method, mockResponse) => {
    return {
        gameApi: {
            [`${method}`]: jest.fn(() => Promise.resolve(mockResponse))
        }
    };
};

describe('gameActions', () => {
    const dispatch = jest.fn();
    const state = jest.fn();
    const config: IConfig = {
        headers: {
            Authorization: 'Bearer null'
        }
    };

    describe('Fetch Games', () => {
        const mockGamesResponse: Partial<IGamesApiResponse> = {
            games: [{ title: 'game1' }] as any,
            username: 'user1'
        };

        it('should call api and return array of games', async () => {
            const userId = 'userid1';
            const api = createApi('fetchGames', mockGamesResponse);

            const expectedAction = createExpectedAction(GameActionType.LOAD_GAMES, mockGamesResponse.games);
            await callFetchGamesApi(userId)(dispatch, state, api);

            expect(api.gameApi.fetchGames).toBeCalledWith(userId, config);
            expect(dispatch).toBeCalledWith(expectedAction);
        });

        it('should create LOAD_GAMES action', () => {
            const expectedAction = createExpectedAction(GameActionType.LOAD_GAMES, mockGamesResponse.games);
            const action = loadedGames(mockGamesResponse.games as any);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Add Game', () => {
        const mockGameResponse: Partial<IGamesApiResponse> = {
            games: [{ title: 'game1' }] as any,
            username: 'user1'
        };

        const gameArgs: Partial<IGameLocal> = {
            title: 'title'
        };

        it('should call addGame api and reset gameToAdd state', async () => {
            const userId = 'userid1';
            const api = createApi('addGame', mockGameResponse);

            const response = await callAddGameApi(userId, gameArgs)(dispatch, state, api);
            expect(response).toEqual(mockGameResponse);
            expect(api.gameApi.addGame).toBeCalledWith(userId, gameArgs, config);
            expect(dispatch).toBeCalledWith(clearSearchedGame());
        });

        it('should create CLEAR_SEARCHED_GAME action', () => {
            const expectedAction = createExpectedAction(GameActionType.CLEAR_SEARCHED_GAME, {
                title: '',
                release_date: ''
            });
            const action = clearSearchedGame();
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Delete Game', () => {
        const mockGameResponse: Partial<IGamesApiResponse> = {
            games: [{ title: 'game1' }] as any,
            username: 'user1'
        };

        it('should call deleteGame api and dispatch deleteGameSuccess', async () => {
            const userId = 'userid1';
            const gameId = 'gameid1';
            const api = createApi('deleteGame', mockGameResponse);

            const expectedAction = createExpectedAction(GameActionType.DELETE_GAME, mockGameResponse);

            await callDeleteGameApi(userId, gameId)(dispatch, state, api);
            expect(api.gameApi.deleteGame).toBeCalledWith(userId, gameId, config);
            expect(dispatch).toBeCalledWith(expectedAction);
        });

        it('should create DELETE_GAME action', () => {
            const mockGameResponse: IUserGamesStore = {
                games: [{ title: 'game1' }] as any,
                message: 'message'
            };
            const expectedAction = createExpectedAction(GameActionType.DELETE_GAME, mockGameResponse);
            const action = deleteGameSuccess(mockGameResponse);
            expect(action).toEqual(expectedAction);
        });
    });

    describe('Update Game', () => {
        const gameArgs: Partial<IGameLocal> = {
            title: 'title'
        };

        const mockGameResponse: Partial<IGamesApiResponse> = {
            games: [{ title: 'game1' }] as any,
            username: 'user1'
        };

        it('should call updateGame api', async () => {
            const userId = 'userid1';
            const gameId = 'gameid1';
            const api = createApi('updateGame', mockGameResponse);

            await callUpdateGameApi(gameArgs, userId, gameId)(dispatch, state, api);
            expect(api.gameApi.updateGame).toBeCalledWith(gameArgs, userId, gameId, config);
        });
    });

    describe('Add Sarched Game', () => {
        it('should create ADD_SEARCHED_GAME action', () => {
            const payload: IGameToAdd = {
                title: 'title',
                release_date: '1/1/2021'
            };
            const expectedAction = createExpectedAction(GameActionType.ADD_SEARCHED_GAME, payload);
            const action = addSearchedGame(payload);
            expect(action).toEqual(expectedAction);
        });
    });
});
