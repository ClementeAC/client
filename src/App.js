import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Layout/Main'
import Home from './components/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import store from './store';
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { logoutUser, getCurrentUser, setCurrentUser } from './actions/authActions'
import setAuthHeader from './utils/setAuthHeader'

if (localStorage.getItem('jwtToken')) {
  const currentTime = Date.now()
  const decode = jwt_decode(localStorage.getItem('jwtToken'))
  if (currentTime > decode.exp){
    store.dispatch(logoutUser())
  } else {
    setAuthHeader(localStorage.getItem('jwtToken'))
    store.dispatch(getCurrentUser)
  }
}

class App extends Component {
  render() {
    return(
      <Provider store = {store}>
        <div>
          <BrowserRouter>
          <Main>
            <Switch>
              <Route exact path ="/" component = {Home} />
              <Route path = "/register" component = {Register}/>
              <Route path = "/login" component = {Login}/>
            </Switch>
            </Main>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
