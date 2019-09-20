export interface IGame {
    _id: string,
    title: string,
    user: string,
}

export interface IGamesApiResponse {
    address?: [],
    games: IGame[],
    verified: string,
    _id: string,
    username: string,
    verification_token: string,
    verification_token_created_at: string,
    message?: string
}

export interface IGameApiResponse {
    games: IGame,
    message?: string
}