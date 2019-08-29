export interface IAuthenticatedDetails {
    user: IAuthenticatedUserDetails;
    accesstoken: string;
    message: string;
}

export interface IAuthenticatedUserDetails {
    verified: boolean,
    _id: string,
    username: string,
    name: string,
}