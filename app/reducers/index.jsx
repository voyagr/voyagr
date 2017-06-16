import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  elements: require('./elements').default,
})

export default rootReducer
