export interface ILoginResponse {
    user: ILoggedInUserResponse;
    accesstoken: string;
    message: string;
}

interface ILoggedInUserResponse {
    // address: [],
    // games: [],
    verified: boolean,
    _id: string,
    username: string,
    // salt: string,
    // hash: string,
    // __v: Number,
    // verification_token: string,
    // verification_token_created_at: Date,
    name: string,
}

export interface IAuthenticatedDetails {
    user: IAuthenticatedUserDetails;
    accesstoken: string;
    message: string;
}

export interface IAuthenticatedUserDetails {
    verified: boolean,
    _id: string,
    username: string,
}