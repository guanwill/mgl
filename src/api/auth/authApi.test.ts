import { createHttpClientMock } from "../createHttpClientMock";
import { IHttpClient } from "../httpClient";
import AuthApi, { IAuthApi } from "./authApi";

describe("authApi", () => {
  let hostName = "http://localhost:8000";
  let username = "Bob";
  let password = "password";
  let httpClientMock: IHttpClient;
  let authApi: IAuthApi;

  let mockResponse = { data: { name: "Bob", message: "success" } };

  beforeEach(() => {
    httpClientMock = createHttpClientMock(mockResponse);
    authApi = new AuthApi(httpClientMock, hostName);
  });

  it("should login successfully and return user data", async () => {
    const actualResponse = await authApi.login(username, password);
    const expectedResponse = mockResponse.data;
    expect(actualResponse).toEqual(expectedResponse);
    expect(httpClientMock.post).toBeCalledWith(
      `${hostName}/api/v1/auth/login`,
      { password, username }
    );
  });

  it("should register new user successfully and return user data", async () => {
    const actualResponse = await authApi.register(username, password);
    const expectedResponse = mockResponse.data;
    expect(actualResponse).toEqual(expectedResponse);
    expect(httpClientMock.post).toBeCalledWith(
      `${hostName}/api/v1/auth/register`,
      { password, username }
    );
  });
});
