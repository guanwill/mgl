import React from "react";
import Games, { Props as GameProps } from "./index";
import { act } from "react-dom/test-utils";

import { mountWithState } from "./test-utils";
import { isTokenExpired } from "../../helpers/isTokenExpired";

jest.mock("../../helpers/isTokenExpired");

describe("GameIndex", () => {
  let userGames = {
    games: [
      {
        comments: "",
        genre: "",
        platform: "XBOX",
        rating: 0,
        release_date: null,
        review: "",
        status: "On Hold",
        title: "111",
        user: "5fba59cc753aa1c58857eea1",
        __v: 0,
        _id: "5ff418ff4e00773f190af5e0",
      },
    ],
  };
  let props: GameProps;

  beforeEach(() => {
    props = {
      userGames,
      callFetchGamesApi: jest.fn().mockImplementation(() => Promise.resolve(userGames)),
      executeClearSearchedGame: jest.fn(),
    };
  });

  it("should render", async () => {
    await act(async() => {
      let component = await mountWithState(<Games {...props} />);
      console.log(component.debug());
    });

    expect(props.callFetchGamesApi).toBeCalledTimes(1);
  });
});
