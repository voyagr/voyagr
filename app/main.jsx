'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import CanvasContainer from './containers/CanvasContainer'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={CanvasContainer} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
