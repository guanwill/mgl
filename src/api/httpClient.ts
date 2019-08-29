import axios from 'axios';

export interface IHttpClient {
    get: Function;
    post: Function;
}

class AxiosHttpClient implements IHttpClient {
    get = async (uri: string) => {
        try {
            return await axios.get(uri);
        } catch (exception) {
            throw exception
        }
    }

    post = async (uri: string, payload: object) => {
        try {
            return await axios.post(uri, payload);
        } catch (exception) {
            throw exception;
        }
    }
}

const httpClient = new AxiosHttpClient();

export default httpClient;