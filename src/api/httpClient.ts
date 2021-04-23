import axios from 'axios';

export interface IHttpClient {
    get(uri: string, config?: object): any;
    post(uri: string, payload: object, config?: object): any;
    delete(uri: string, config?: object): any;
}

class AxiosHttpClient implements IHttpClient {
    get = async (uri: string, config?: object) => {
        try {
            return await axios.get(uri, config);
        } catch (exception) {
            throw exception;
        }
    };

    post = async (uri: string, payload: object, config?: object) => {
        try {
            return await axios.post(uri, payload, config);
        } catch (exception) {
            throw exception;
        }
    };

    delete = async (uri: string, config?: object) => {
        try {
            return await axios.delete(uri, config);
        } catch (exception) {
            throw exception;
        }
    };
}

const httpClient = new AxiosHttpClient();

export default httpClient;
