import { IHttpClient } from '../httpClient';

export default class GameApi {
    httpClient: IHttpClient;
    hostName: string;

    constructor(httpClient: IHttpClient, hostName: string) {
        this.httpClient = httpClient;
        this.hostName = hostName;
    }

    public fetchLatestGames = async (): Promise<any> => {
        try {
            const response = await this.httpClient.get(`${this.hostName}/game_info/latest_games`);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

}