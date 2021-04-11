import {
  callLoginApi,
  AuthActionType,
  IAuthAction,
  setLoginSuccess,
} from "./authActions";

describe("authActions", () => {
  const username = "firstname";
  const password = "password";

  const mockLoginResponse = {
    user: { username: username },
    accesstoken: "token",
    message: "success",
  };
  
  const createExpectedAction = (type: AuthActionType, payload: any): IAuthAction => {
    return {type, payload};
  };

  describe("Login", () => {
    it("should call login api and dispatch setLoginSuccess", async () => {
        const dispatch = jest.fn();
        const state = jest.fn();
        const api = {
          authApi: {
            login: jest.fn(() => Promise.resolve(mockLoginResponse)),
          },
        };
    
        const expectedAction = createExpectedAction(AuthActionType.LOGIN_USER, mockLoginResponse)
        await callLoginApi(username, password)(dispatch, state, api);
    
        expect(api.authApi.login).toBeCalledWith(username, password);
        expect(dispatch).toBeCalledWith(expectedAction);
      });
    
      it("should create LOGIN_USER action", () => {
        const expectedAction = createExpectedAction(AuthActionType.LOGIN_USER, mockLoginResponse)
        const action: IAuthAction = setLoginSuccess(mockLoginResponse as any);
        expect(action).toEqual(expectedAction)
      });
  })
});
