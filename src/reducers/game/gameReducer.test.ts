import { callFetchGamesApi, loadedGames, deleteGameSuccess } from '../../actions/game/gameActions';
import gameReducer from './gameReducer';
import { initialState } from '../../store';
import { IGamesApiResponse, IUserGamesStore } from '../../model/game/game';

describe('authReducer', () => {
    it('should load user games', async () => {
        const mockGamesResponse: Partial<IGamesApiResponse> = {
            games: [{ title: 'game1' }] as any,
            username: 'user1'
        };

        const action = loadedGames(mockGamesResponse.games as any);
        const expectedGames = { ...initialState.userGames, games: action.payload };
        const actualGames = gameReducer(initialState.userGames, action);
        expect(actualGames).toEqual(expectedGames);
    });

    it('should update user games when a game is deleted', async () => {
        const payload: Partial<IUserGamesStore> = {
            games: [{ _id: '1234', title: 'game1' }] as any,
            message: 'message'
        };

        const action = deleteGameSuccess(payload as any);

        const state = initialState.userGames;
        const expectedGames = { ...state, games: state.games.filter(game => game._id !== action.payload.game) };
        const actualGames = gameReducer(initialState.userGames, action);
        expect(actualGames).toEqual(expectedGames);
    });
});
