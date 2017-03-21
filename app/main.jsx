'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'
import store from './store'
//COMPONENTS
import Signup from './components/Signup'
import Canvas from './components/Canvas'
import App from './components/App'
import LandingPage from './components/LandingPage'


render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/landing" component={LandingPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/canvas" component={Canvas} />
{/*        <IndexRedirect to="/" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
