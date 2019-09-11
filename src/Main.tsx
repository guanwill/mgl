import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Verify from './components/auth/Verify';
import Resend from './components/auth/Resend';
import Navbar from './components/navbar';

const Main = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <Navbar />
      <main>
        <Switch>          
          {/* <Route exact path='/' component={Home}/> */}
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/verify/:id' component={Verify}/>
          <Route path='/resend' component={Resend}/>
        </Switch>
      </main>      
    </Provider>

  )
}

export default Main