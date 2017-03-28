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
        <div id="app">{ this.props.children }</div>
      </div>
    )
  }
}
