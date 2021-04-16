import React from "react";
import Games from "./index";

import { initialState } from "../../store";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { rootReducer } from "../../store/index";
import { render, act } from "@testing-library/react";

let history = createMemoryHistory();

it("Renders the connected app with initialState", () => {
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

  let callFetchGamesApi = jest.fn().mockResolvedValue(userGames);
  let executeClearSearchedGame = jest.fn();
  let props = {
    userGames,
    callFetchGamesApi,
    executeClearSearchedGame,
  };

  //   render(<Games {...props} />, { initialState  })

  act(() => {
    /* fire events that update state */
    render(
      <Provider store={createStore(rootReducer, initialState)}>
        <Router history={history}>
          <Games {...props} />
        </Router>
      </Provider>
    );
  });

  expect(callFetchGamesApi).toHaveBeenCalledTimes(1);
});
