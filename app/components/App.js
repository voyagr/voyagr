import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as firebase from 'firebase'
import config from '../../firebaseConfig'

import Navbar from './Navbar'

class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return(
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
