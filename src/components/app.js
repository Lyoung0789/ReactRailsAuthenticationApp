import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Dashboard from './Dashboard';
import Home from './Home';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      loggedInStatus: "NOT_LOGGED_IN",
      user:{}
    }
  }

  handleLogin = (data) =>{
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })

  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props => (
            <Home {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
          )}/>
          <Route exact path={"/dashboard"} render={props => (
            <Dashboard {...props} loggedInStatus={this.state.loggedInStatus} />
          )} />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
