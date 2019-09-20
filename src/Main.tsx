import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Verify from './components/auth/Verify';
import Resend from './components/auth/Resend';
import Password from './components/auth/Password';
import Navbar from './components/navbar';

import Games from './components/games';
import AddGame from './components/games/addGame';
import EditGame from './components/games/editGame';

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
          <Route path='/forgot_password' component={Password}/>

          <Route exact path='/user/:user_id/games' component={Games}/>
          <Route exact path='/user/:user_id/games/add' component={AddGame}/>
          <Route exact path='/user/:user_id/games/:game_id/edit' component={EditGame}/>
        </Switch>
      </main>      
    </Provider>

  )
}

export default Main