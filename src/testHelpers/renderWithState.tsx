import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { initialState } from "../store";
import { ReactNode } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";

const middlewares = [thunk.withExtraArgument({})];
const mockStore = configureStore(middlewares);

export const renderWithState = (component: ReactNode, state = initialState) => {
  return render(
    <MemoryRouter>
      <Provider store={mockStore(state)}>{component}</Provider>
    </MemoryRouter>
  );
};
