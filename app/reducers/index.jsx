import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  page: require('./page').default
})

export default rootReducer
