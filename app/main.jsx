'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import DragAroundCustomDragLayer from './test/index'

import store from './store'
import Canvas from './components/Canvas'

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={DragAroundCustomDragLayer} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
