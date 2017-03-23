import React, { Component } from 'react'

import * as firebase from 'firebase'
import config from '../../firebaseConfig'

import Navbar from './Navbar'

import { auth } from 'APP/db/firebase'

//AppInstance.unsubscribe

export default class App extends Component {
  constructor(props) {
    super(props)

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
