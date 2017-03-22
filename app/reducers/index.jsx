import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  photo: require('./photo').default,
  elements: require('./elements').default,
  firebase: require('./firebaseRef').default,
  config: require('./config').default,
})

export default rootReducer
