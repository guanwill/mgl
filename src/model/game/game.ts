export interface IUserGamesStore {
    games: IGame[];
    message?: string;
}

export interface IGameToAdd {
    title: string;
    release_date: string;
}

export interface IGameLocal {
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

export interface IGame extends IGameLocal {
    _id: string
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

export interface IGameAddedOrUpdatedResponse {
    message: string;
}

export enum GameStatus {
    PLAYING = "Playing",
    FINISHED = "Finished",
    ON_HOLD = "On Hold",
    WISHLIST = "Wishlist",
    MAYBE = "Maybe"
}