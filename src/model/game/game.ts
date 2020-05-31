export interface IUserGamesStore {
    games: IGame[];
    message?: string;
}

export interface IGameToAdd {
    title: string;
    release_date: string;
}

export interface IGame {
    _id: string,
    title: string,
    user: string,
    status: string;
    platform: string;
    release_date?: string | null;
    genre?: string | null;
    rating?: number | null;
    review?: string | null;
    comments?: string | null;
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

export enum GameStatus {
    PLAYING = "Playing",
    FINISHED = "Finished",
    ON_HOLD = "On Hold",
    WISHLIST = "Wishlist",
    MAYBE = "Maybe"
}