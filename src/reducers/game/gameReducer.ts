import { initialState, IUserGamesStore } from "../../store";
import { IGameAction, GameActionType } from "../../actions/game/gameActions";

export default function gameReducer(
  state: IUserGamesStore = initialState.userGames,
  action: IGameAction
) {
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
        const games = state.games.filter((game) => game._id !== action.payload.game);
        return {
          ...state,
          games: games
        }
    default:
      return state;
  }
}
