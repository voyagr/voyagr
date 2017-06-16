import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {ref} from 'APP/db/firebase'
import rootReducer from './reducers'

const store = ref => createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware,
      /*receives the store, then original dispatch, the action attached to the original dispatch*/
      store => dispatch => {
        ref.on('child_added', snap => dispatch(snap.val()))
        return action => action.doNotSync ? dispatch(action) : ref.push(action)
      }
    )
  )
)

export default store
