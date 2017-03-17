'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'

import { receivePageInfo } from './reducers/page'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import RenderPageInfo from './components/Render'

const loadPageInfo = (nextState, replace, done) => {
  axios.get('/api/render')
  .then(pageInfo => store.dispatch(receivePageInfo(pageInfo.data)))
  .then(() => done())
  .catch(console.error)
}

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRedirect to="/jokes" />
        <Route path="/jokes" component={Jokes} />
        <Route path="/render" component={RenderPageInfo} onEnter={loadPageInfo}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
