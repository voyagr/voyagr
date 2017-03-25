'use strict'
// LIBRARIES
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import { Provider} from 'react-redux'
import axios from 'axios'
import { initialize, testFunction, ref } from '../db/firebase'
import {setFirebaseRef} from './reducers/firebaseRef'

// COMPONENTS
import Signup from './components/Signup'
import CanvasContainer from './components/CanvasContainer'
import App from './components/App'
import LandingPage from './components/LandingPage'
import Timeline from './components/Timeline'
import Suitcase from './components/Suitcase'
import ViewContainer from './components/ViewContainer'

// function testingFirebase () {
//   const { firebaseRef } = store.getState()
//   firebaseRef.child('users').on('value', (snapshot) => {
//     console.log(snapshot.val())
//   })
// }

render (
  <Router history={browserHistory}>
    <Route path="/" component={App} landing={LandingPage}>
      <IndexRedirect to="/landing" />
      <Route path="/landing" component={LandingPage} />
        <Route path="/canvas/:tripId" component={CanvasContainer} />
        <Route path="/view/:tripId" component={ViewContainer} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/suitcase" component={Suitcase} />
    </Route>
  </Router>,
  document.getElementById('main')
)
