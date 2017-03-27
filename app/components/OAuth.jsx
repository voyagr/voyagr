import React, { Component } from 'react'
import { Col, Button } from 'react-bootstrap'
import { auth } from 'APP/db/firebase'
import { browserHistory } from 'react-router'
import { provider } from '../../db/firebase'

class OAuth extends Component {

    constructor () {
        super()
        this.googleLogin = this.googleLogin.bind(this)
    }
    
    googleLogin () {
        auth
        .signInWithRedirect(provider)
        .then((result) => {
            // This gives you a Google Access Token. 
            let token = result.credential.accessToken
            let user = result.user
            browserHistory.push('/timeline')
        }).catch(function(error) {
            console.error(error.code, error.message, error.email, error.credential)
        });
    }
    /*----- WILL THIS GET THE RESULT OF THE REDIRECT ELSEWHERE?? -----*/
    // firebase.auth().getRedirectResult().then(function(result) {
    //     if (result.credential) {
    //         var token = result.credential.accessToken;
    //     }
    //     var user = result.user;
    // }
    render () {
        return (
            <div>
                <Button type="submit" value="Login with Google" onClick={this.googleLogin}>
                    Log In with Google
                </Button>
            </div>
        )
   }
}

export default OAuth;
