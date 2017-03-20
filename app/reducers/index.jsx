import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  photo: require('./photo').default,
  elements: require('./elements').default,
})

export default rootReducer
