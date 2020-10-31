import React, { Component } from 'react'
import Login from './auth/Login';
import Registration from './auth/Registration'
import axios from 'axios'

export default class Home extends Component {

    constructor(props){
        super(props);
        
    }

    handleSucessfulAuth = (data) =>{
        //Todo update parent component
        this.props.handleLogin(data);
        this.props.history.push("./dashboard")
    }

    handleLogoutClick = () =>{
        axios.delete("http://localhost:3001/logout", {withCredentials: true})
        .then(response => {
            console.log("Worked")
        })
        .catch(errors =>{
            console.log("logout error", error)
        })
        this.props.handleLogout()
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <button onClick={this.handleLogoutClick}>Logout</button>
                <Registration handleSucessfulAuth={this.handleSucessfulAuth}/>
                <Login handleSucessfulAuth={this.handleSucessfulAuth}/>
            </div>
        )
    }
}
