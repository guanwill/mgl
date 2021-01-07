import React from "react";
import { cleanup, fireEvent,waitFor } from "@testing-library/react";
import Games from "./index";
import { renderWithState } from "../../testHelpers/renderWithState";
import isTokenExpired from "../../helpers/isTokenExpired";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("hihihi", () => {
    // let isTokenExpired = jest.fn();

    let mockGame = [{
        'comments': "",
        'genre': "",
        'platform': "XBOX",
        'rating': 0,
        'release_date': null,
        'review': "",
        'status': "On Hold",
        'title': "111",
        'user': "5fba59cc753aa1c58857eea1",
        '__v': 0,
        '_id': "5ff418ff4e00773f190af5e0",
    }]

    let initData = {
        userGames: mockGame,
        callFetchGamesApi: jest.fn().mockResolvedValue(mockGame),
        executeClearSearchedGame: jest.fn()
    }

  beforeEach(() => {
    // callFetchGamesApi.mockResolvedValue(mockGame);
  });
  test("test", async () => {
    const foo = renderWithState(<Games {...initData} />);
    await waitFor(() => expect(initData.callFetchGamesApi).toHaveBeenCalledTimes(1))
    console.log(foo.debug())
    expect(initData.callFetchGamesApi).toBeCalledTimes(1)
  });
});
