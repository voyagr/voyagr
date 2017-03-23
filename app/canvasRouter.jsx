import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import CanvasContainer from './components/CanvasContainer'
import store from './store'


const canvasRoutes = (
  <Provider store={store}>
    <Route path="/canvas/:tripId" component={CanvasContainer} />
  </Provider>
)

export default canvasRoutes
