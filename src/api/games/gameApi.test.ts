import { createHttpClientMock } from '../createHttpClientMock';
import { IHttpClient } from '../httpClient';
import GameApi, { IGameApi } from './gameApi';
import { IGamesApiResponse, IGame } from '../../model/game/game';
import { IConfig } from '../../actions/game/gameActions';

describe('authApi', () => {
    let hostName = 'http://localhost:8000';
    let userId = 'Bob123';
    let username = 'Bob';
    let gameId = 'Game123';
    let httpClientMock: IHttpClient;
    let gameApi: IGameApi;

    let game = {
        title: 'game123',
        genre: 'action',
        platform: 'ps4',
        release_date: '01/01/21',
        status: 'playing',
        rating: '10',
        review: 'good',
        comments: 'good'
    };

    let config: IConfig = {
        headers: {
            Authorization: 'test'
        }
    };

    let games: Partial<IGame> = {
        title: game.title
    };

    let mockGameResponse = {
        data: {
            games,
            message: 'game response'
        }
    };

    let mockGamesResponse = {
        data: {
            data: {
                games,
                username,
                message: 'games response'
            }
        }
    };

    it('should fetch games', async () => {
        httpClientMock = createHttpClientMock(mockGamesResponse);
        gameApi = new GameApi(httpClientMock, hostName);

        const actualResponse = await gameApi.fetchGames(userId, config);
        const expectedResponse = mockGamesResponse.data.data;
        expect(actualResponse).toEqual(expectedResponse);
        expect(httpClientMock.get).toBeCalledWith(`${hostName}/api/v1/user/${userId}`, config);
    });

    it('should fetch games for public view', async () => {
        httpClientMock = createHttpClientMock(mockGamesResponse);
        gameApi = new GameApi(httpClientMock, hostName);

        const actualResponse = await gameApi.fetchPublicGamesListForUser(userId);
        const expectedResponse = mockGamesResponse.data.data;
        expect(actualResponse).toEqual(expectedResponse);
        expect(httpClientMock.get).toBeCalledWith(`${hostName}/api/v1/public/games/user/${userId}`);
    });

    it('should add game for user', async () => {
        httpClientMock = createHttpClientMock(mockGamesResponse);
        gameApi = new GameApi(httpClientMock, hostName);

        const actualResponse = await gameApi.addGame(userId, games, config);
        const expectedResponse = mockGamesResponse.data;
        expect(actualResponse).toEqual(expectedResponse);
        expect(httpClientMock.post).toBeCalledWith(`${hostName}/api/v1/games/user/${userId}`, games, config);
    });

    it('should update game for user', async () => {
        httpClientMock = createHttpClientMock(mockGameResponse);
        gameApi = new GameApi(httpClientMock, hostName);

        const actualResponse = await gameApi.updateGame(games, userId, gameId, config);
        const expectedResponse = mockGameResponse.data;
        expect(actualResponse).toEqual(expectedResponse);
        expect(httpClientMock.post).toBeCalledWith(`${hostName}/api/v1/games/${gameId}/user/${userId}`, games, config);
    });

    it('should delete game for user', async () => {
        httpClientMock = createHttpClientMock(mockGamesResponse);
        gameApi = new GameApi(httpClientMock, hostName);

        const actualResponse = await gameApi.deleteGame(userId, gameId, config);
        const expectedResponse = mockGamesResponse.data;
        expect(actualResponse).toEqual(expectedResponse);
        expect(httpClientMock.delete).toBeCalledWith(`${hostName}/api/v1/games/${gameId}/user/${userId}`, config);
    });
});
