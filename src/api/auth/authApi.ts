import { IHttpClient } from '../httpClient';

export default class AuthApi {
    httpClient: IHttpClient;
    hostName: string;

    constructor(httpClient: IHttpClient, hostName: string) {
        this.httpClient = httpClient;
        this.hostName = hostName;
    }

    public login = async (username: string, password: string): Promise<any> => {
        try {
            const payload = {
                username: username,
                password: password
            }
            const response = await this.httpClient.post(`${this.hostName}/api/v1/auth/login`, payload);
            return response.data
        } catch (err) {
            throw (err);
        }
    }

    public register = async (username: string, password: string): Promise<any> => {
        try {
            const payload = {
                username: username,
                password: password,
            }
            const response = await this.httpClient.post(`${this.hostName}/api/v1/auth/register`, payload);
            return response.data
        } catch (err) {
            throw (err);
        }
    }

    public verify = async (token: string): Promise<any> => {
        try {
            const response = await this.httpClient.get(`${this.hostName}/api/v1/auth/verify_account/${token}`);
            return response.data
        } catch (err) {
            throw (err);
        }
    }

    public resendVerificationToken = async (email: string): Promise<any> => {
        try {
            const payload = {
                username: email
            }
            const response = await this.httpClient.post(`${this.hostName}/api/v1/auth/resend_verification_email`, payload);
            return response.data
        } catch (err) {
            throw (err);
        }
    }
}