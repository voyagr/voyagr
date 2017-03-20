'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import Canvas from './components/Canvas'
import store from './store'
import axios from 'axios'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Canvas} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
