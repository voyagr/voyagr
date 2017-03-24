import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  elements: require('./elements').default,
  firebaseRef: require('./firebaseRef').default,
})

export default rootReducer
