'use strict'
// LIBRARIES
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'
import store from './store'
import { initialize, testFunction, ref } from '../db/firebase'
// import { bindActionCreators } from 'redux'
// COMPONENTS
import Signup from './components/Signup'
import Canvas from './components/Canvas'
import App from './components/App'
import LandingPage from './components/LandingPage'
import Timeline from './components/Timeline'
import {setFirebaseRef} from './reducers/firebaseRef'
import Suitcase from './components/Suitcase'

// import * as config from './reducers/config'
// import * as elements from './reducers/elements'
// import * as firebaseRef from './reducers/firebaseRef'
// import * as page from './reducers/page'
// import * as user from './reducers/user'
// import * as index from './reducers/index'


// var actions = bindActionCreators(index, dispatch)
// actions.setFirebaseRef(ref)
function startingFirebase () {
  store.dispatch(setFirebaseRef(ref))
}


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={startingFirebase}>
        <IndexRedirect to="/landing" />
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/canvas" component={Canvas} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/suitcase" component={Suitcase} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
