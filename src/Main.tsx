import { Switch, Route, BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/navbar';

const Main = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      {/* <BrowserRouter> */}
      <Navbar />
      <main>
        <Switch>          
          {/* <Route exact path='/' component={Home}/> */}
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
        </Switch>
      </main>
      {/* </BrowserRouter> */}
      
    </Provider>

  )
}

export default Main