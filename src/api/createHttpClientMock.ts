import { IHttpClient } from './httpClient';

export const createHttpClientMock = (response: object): IHttpClient => ({
    get: jest.fn().mockResolvedValue(response),
    post: jest.fn().mockResolvedValue(response),
    delete: jest.fn().mockResolvedValue(response)
});
