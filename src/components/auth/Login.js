import React, { Component } from 'react'
import axios  from 'axios'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state= {
            email: "",
            password: "", 
            loginErrors: ""
        }
        
    }

    handleSubmit = (event) =>{

        const {
            email, 
            password, 
        } = this.state

        axios.post("http://localhost:3001/sessions", {
            user: {
                email: email, 
                password: password, 
             
            }
        }, 
        {withCredentials: true}
        ).then(response => {
            console.log("res from  login", response)
            // if(response.data.status === "created"){
            //     console.log(this.props)
            //     // debugger
            //     this.props.handleSucessfulAuth(response.data)
            // }
        }).catch(error => {
            console.log("login errors", error)
        })

        event.preventDefault()
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}


