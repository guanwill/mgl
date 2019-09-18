import { initialState, IUserGames } from "../../store";
import { IGameAction, GameActionType } from "../../actions/game/gameActions";

export default function gameReducer(
  state: IUserGames = initialState.userGames,
  action: IGameAction
) {
  switch (action.type) {
    case GameActionType.LOAD_GAMES:
      return {
        ...state,
        games: action.payload
      };
    default:
      return state;
  }
}
