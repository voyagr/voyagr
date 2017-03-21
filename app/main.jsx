'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'
import Signup from './components/Signup'

import store from './store'

import Canvas from './components/Canvas'
import App from './components/App'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/signup" component={Signup} />
        <Route path="/canvas" component={Canvas} />
{/*        <IndexRedirect to="/" />*/}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
