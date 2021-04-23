import { setLoginSuccess, logoutUser, setRegisterSuccess } from '../../actions/auth/authActions';
import { initialState } from '../../store';
import authReducer from './authReducer';

describe('authReducer', () => {
    const username = 'firstname';
    const mockUserResponse = {
        user: { username: username },
        accesstoken: 'token',
        message: 'success'
    };

    it('should update user information with login details', async () => {
        const action = setLoginSuccess(mockUserResponse as any);
        const expectedUpdatedUserInformation = { ...initialState.userInformation, ...action.payload };
        const actualUpdatedUserInformation = authReducer(initialState.userInformation, action);
        expect(actualUpdatedUserInformation).toEqual(expectedUpdatedUserInformation);
    });

    it('should clear user information to initialstate', async () => {
        const action = logoutUser(initialState.userInformation);
        const actualUpdatedUserInformation = authReducer(initialState.userInformation, action);
        expect(actualUpdatedUserInformation).toEqual(initialState.userInformation);
    });

    it('should update user information with registration details', async () => {
        const action = setRegisterSuccess(mockUserResponse as any);
        const expectedUpdatedUserInformation = { ...initialState.userInformation, message: action.payload.message };
        const actualUpdatedUserInformation = authReducer(initialState.userInformation, action);
        expect(actualUpdatedUserInformation).toEqual(expectedUpdatedUserInformation);
    });
});
