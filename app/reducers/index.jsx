import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  photo: require('./photo').default
})

export default rootReducer
