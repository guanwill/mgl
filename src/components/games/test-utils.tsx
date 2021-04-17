import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, configure } from "enzyme";
configure({ adapter: new Adapter() });

import React from "react";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { initialState } from "../../store";

let history = createMemoryHistory();

const mockStore = configureStore([thunk.withExtraArgument({})]);

export const mountWithState = (component, state = initialState) => {

    console.log('state....', state);
    console.log('component.....', component);
  return mount(
    <Provider store={mockStore(state)}>
      <Router history={history}>{component}</Router>
    </Provider>
  );
};
