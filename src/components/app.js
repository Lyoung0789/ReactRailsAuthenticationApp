import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import axios from 'axios'
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

  handleLogout = () =>{
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  checkLoginStatus =() =>{
    axios.get("http://localhost:3001/logged_in", {withCredentials: true}).then(response => {
      console.log("Logged In?", response)
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if(!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN"){
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        })
      }
    })
    .catch(error => {
      console.log("Login Error: ", error)
    })
  }

  componentDidMount(){
    this.checkLoginStatus()
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
        <Switch>
          <Route exact path={"/"} render={props => (
            <Home {...props} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
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
