import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Login from './components/auth/Login';
import Register from './components/auth/Register';

const Main = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <main>
        <Switch>
          {/* <Route exact path='/' component={Home}/> */}
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </main>
    </Provider>

  )
}

export default Main