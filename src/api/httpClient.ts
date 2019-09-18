import axios from 'axios';

export interface IHttpClient {
    get: Function;
    post: Function;
}

class AxiosHttpClient implements IHttpClient {
    get = async (uri: string, config?: object) => {

        console.log('httpclient ...', config);
        
        try {
            return await axios.get(uri, config);
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