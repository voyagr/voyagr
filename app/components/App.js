import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as firebase from 'firebase'
import config from '../../firebaseConfig'

import Navbar from './Navbar'

import auth from 'APP/db/firebase'

//AppInstance.unsubscribe

class App extends Component {
  constructor(props) {
    super(props)

      this.state = {
        user: null,
      }
  }

  componentDidMount () {
    this.unsubscribe = auth.onAuthStateChanged(function(user) {
      if (!user) auth.signInAnonymously()
      .then( user => this.setState({user}))
      .catch(error => {
        console.log('ERROR', error.code, error.message)
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  render() {
    return (
      <div>
        <Navbar />
        <div>{ this.props.children }</div>
      </div>
    )
  }
}

export default connect(
  null
)(App)
