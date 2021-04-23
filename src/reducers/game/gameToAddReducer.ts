import { initialState } from '../../store';
import { IGameAction, GameActionType } from '../../actions/game/gameActions';
import { IGameToAdd } from '../../model/game/game';

export default function gameReducer(state: IGameToAdd = initialState.gameToAdd, action: IGameAction) {
    switch (action.type) {
        case GameActionType.ADD_SEARCHED_GAME:
            return {
                ...state,
                ...action.payload
            };
        case GameActionType.CLEAR_SEARCHED_GAME:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}
