import {
  callLoginApi,
  AuthActionType,
  IAuthAction,
  setLoginSuccess,
  logoutUser,
  callRegisterApi,
  setRegisterSuccess,
} from "./authActions";

const createExpectedAction = (
  type: AuthActionType,
  payload: any
): IAuthAction => {
  return { type, payload };
};

describe("authActions", () => {
  const username = "firstname";
  const password = "password";

  const mockUserResponse = {
    user: { username: username },
    accesstoken: "token",
    message: "success",
  };

  describe("Login", () => {
    it("should call login api and dispatch setLoginSuccess", async () => {
      const dispatch = jest.fn();
      const state = jest.fn();
      const api = {
        authApi: {
          login: jest.fn(() => Promise.resolve(mockUserResponse)),
        },
      };

      const expectedAction = createExpectedAction(
        AuthActionType.LOGIN_USER,
        mockUserResponse
      );
      await callLoginApi(username, password)(dispatch, state, api);

      expect(api.authApi.login).toBeCalledWith(username, password);
      expect(dispatch).toBeCalledWith(expectedAction);
    });

    it("should create LOGIN_USER action", () => {
      const expectedAction = createExpectedAction(
        AuthActionType.LOGIN_USER,
        mockUserResponse
      );
      const action: IAuthAction = setLoginSuccess(mockUserResponse as any);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Logout", () => {
    it("should create LOGOUT_USER action", () => {
      const expectedAction = createExpectedAction(
        AuthActionType.LOGOUT_USER,
        mockUserResponse
      );
      const action: IAuthAction = logoutUser(mockUserResponse as any);
      expect(action).toEqual(expectedAction);
    });
  });

  describe("Register", () => {
    it("should call register api and dispatch setRegisterSuccess", async () => {
      const mockRegisterResponse = { ...mockUserResponse, message: "Pending" };
      const dispatch = jest.fn();
      const state = jest.fn();
      const api = {
        authApi: {
          register: jest.fn(() => Promise.resolve(mockRegisterResponse)),
        },
      };

      const expectedAction = createExpectedAction(
        AuthActionType.REGISTER_USER,
        { message: mockRegisterResponse.message }
      );
      await callRegisterApi(username, password)(dispatch, state, api);

      expect(api.authApi.register).toBeCalledWith(username, password);
      expect(dispatch).toBeCalledWith(expectedAction);
    });

    it("should create REGISTER_USER action", () => {
      const expectedAction = createExpectedAction(
        AuthActionType.REGISTER_USER,
        mockUserResponse
      );
      const action: IAuthAction = setRegisterSuccess(mockUserResponse as any);
      expect(action).toEqual(expectedAction);
    });
  });
});
