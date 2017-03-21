import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as firebase from 'firebase'
import config from '../../firebaseConfig'

class App extends Component {
  constructor(props) {
    super(props)

  }

componentDidMount() {
  firebase.initializeApp(config);
}

  render() {
    return(
      <div>
        <div>APP CONTAINER</div>
        <div>{ this.props.children }</div>
      </div>
    )
  }
}

export default connect(
  null
)(App)
