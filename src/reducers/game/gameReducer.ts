import { initialState } from '../../store';
import { IGameAction, GameActionType } from '../../actions/game/gameActions';
import { IUserGamesStore } from '../../model/game/game';

export default function gameReducer(state: IUserGamesStore = initialState.userGames, action: IGameAction) {
    switch (action.type) {
        case GameActionType.LOAD_GAMES:
            return {
                ...state,
                games: action.payload
            };
        case GameActionType.ADD_GAME:
            return {
                ...state,
                ...action.payload
            };
        case GameActionType.DELETE_GAME:
            const games = state.games.filter(game => game._id !== action.payload.game);
            return {
                ...state,
                games: games
            };
        case GameActionType.UPDATE_GAME:
            return {
                ...state,
                message: action.payload.message,
                games: state.games.map(game => {
                    if (game._id === action.payload.game._id) {
                        // Return a new object
                        return {
                            ...game, // copy the existing item
                            ...action.payload.game // replace with updated item
                        };
                    }
                    return game; // Leave every other item unchanged
                })
            };
        default:
            return state;
    }
}
