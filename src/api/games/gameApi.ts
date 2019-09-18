import { IHttpClient } from '../httpClient';
import { IConfig } from '../../actions/game/gameActions';
import { IGamesResponse } from '../../model/game/game';

export default class GameApi {
    httpClient: IHttpClient;
    hostName: string;

    constructor(httpClient: IHttpClient, hostName: string) {
        this.httpClient = httpClient;
        this.hostName = hostName;
    }

    public fetchGames = async (user_id: string, config: IConfig): Promise<IGamesResponse> => {
        try {
            const response = await this.httpClient.get(`${this.hostName}/api/v1/user/${user_id}`, config);
            return response.data.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }
}