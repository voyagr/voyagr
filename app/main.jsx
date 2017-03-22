'use strict'
// LIBRARIES
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'
import store from './store'
import { initialize } from '../db/firebase'
// COMPONENTS
import Signup from './components/Signup'
import Canvas from './components/Canvas'
import App from './components/App'
import LandingPage from './components/LandingPage'
import Timeline from './components/Timeline'
import Suitcase from './components/Suitcase'



render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/canvas" component={Canvas} />
        <Route path="/timeline" component={Timeline} />
        <Route path="/suitcase" component={Suitcase} />

        
{/*        <IndexRedirect to="/" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
