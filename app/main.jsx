'use strict'
// LIBRARIES
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'

// COMPONENTS
import CanvasContainer from './components/CanvasContainer'
import App from './components/App'
import LandingPage from './components/LandingPage'
import Timeline from './components/Timeline'
import Suitcase from './components/Suitcase'
import EmailActions from 'APP/app/components/EmailActions'

render (
  <Router history={browserHistory}>
    <Route path="/" component={App} landing={LandingPage}>
      <IndexRedirect to="/landing" />
      <Route path="/landing" component={LandingPage} />
        <Route path="/canvas/:tripId" component={CanvasContainer} />
      <Route path="/timeline" component={Timeline} />
      <Route path="/suitcase" component={Suitcase} />
      <Route path="/validate-email" component={EmailActions} />
    </Route>
  </Router>,
  document.getElementById('main')
)
