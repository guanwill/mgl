import { IHttpClient } from '../httpClient';
import { IConfig } from '../../actions/game/gameActions';
import { IGamesApiResponse, IGameApiResponse } from '../../model/game/game';

export default class GameApi {
    httpClient: IHttpClient;
    hostName: string;

    constructor(httpClient: IHttpClient, hostName: string) {
        this.httpClient = httpClient;
        this.hostName = hostName;
    }

    public fetchGames = async (user_id: string, config: IConfig): Promise<IGamesApiResponse> => {
        try {
            const response = await this.httpClient.get(`${this.hostName}/api/v1/user/${user_id}`, config);
            return response.data.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    public fetchPublicGamesListForUser = async (user_id: string): Promise<IGamesApiResponse> => {
        try {
            const response = await this.httpClient.get(`${this.hostName}/api/v1/public/games/user/${user_id}`);
            return response.data.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    public addGame = async (title: string, genre: string, platform: string, release_date: string, status: string, rating: number, review: string, comments: string, user_id: string, config: IConfig): Promise<IGamesApiResponse> => {
        try {
            const payload = {
                title,
                genre,
                platform,
                release_date,
                status,
                rating,
                review,
                comments
            }
            const response = await this.httpClient.post(`${this.hostName}/api/v1/games/user/${user_id}`, payload, config);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    public deleteGame = async (user_id: string, game_id: string, config: IConfig): Promise<IGamesApiResponse> => {
        try {
            const response = await this.httpClient.delete(`${this.hostName}/api/v1/games/${game_id}/user/${user_id}`, config);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    public updateGame = async (title: string, genre: string, platform: string, release_date: string, status: string, rating: number, review: string, comments: string, user_id: string, game_id: string, config: IConfig): Promise<IGameApiResponse> => {
        try {
            const payload = {
                title,
                genre,
                platform,
                release_date,
                status,
                rating,
                review,
                comments
            }
            const response = await this.httpClient.post(`${this.hostName}/api/v1/games/${game_id}/user/${user_id}`, payload, config);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }
}