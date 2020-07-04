import { IHttpClient } from '../httpClient';

export default class GameApi {
    httpClient: IHttpClient;
    hostName: string;

    constructor(httpClient: IHttpClient, hostName: string) {
        this.httpClient = httpClient;
        this.hostName = hostName;
    }

    // obsolete due to grpahql endpoint below
    public fetchLatestGames = async (): Promise<any> => {
        try {
            const response = await this.httpClient.get(`${this.hostName}/game_info/latest_games`);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    // new graphql endpoint
    public fetchLatestGamesV2 = async (): Promise<any> => {
        try {
            const query = {
                "query": `{ 
                    latestGames {
                        id
                        name,
                        image {
                            icon_url
                            medium_url
                            screen_url
                        }
                        site_detail_url,
                        original_release_date,
                        platforms {
                            name
                        },
                        deck
                      }
                 }`
            }
            const response = await this.httpClient.post(`${this.hostName}/mgl_graphql`, query);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    // obsolete due to grpahql endpoint below
    public searchGame = async (query: string): Promise<any> => {
        try {
            const response = await this.httpClient.post(`${this.hostName}/game_info/search_games/${query}`, {});
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }

    // new graphql endpoint
    public searchGameV2 = async (userQuery: string): Promise<any> => {
        try {
            const query = {
                "query": `{ 
                    searchGames(query: "${userQuery}") {
                        id
                        name,
                        image {
                            icon_url
                            medium_url
                            screen_url
                        }
                        site_detail_url,
                        original_release_date,
                        platforms {
                            name
                        }
                        deck
                    }
                }`
            }
            const response = await this.httpClient.post(`${this.hostName}/mgl_graphql`, query);
            return response.data
        } catch (err) {
            console.log('ERR ', err);
            throw (err);
        }
    }
}