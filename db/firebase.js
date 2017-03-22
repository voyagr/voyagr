import * as firebase from 'firebase'
import config from '../firebaseConfig'
// import { bindActionCreators } from 'redux'

export const initialize = firebase.initializeApp(config)

export const database = firebase.database()

export const auth = firebase.auth()

export const ref = database.ref()
// import * as index from '../app/reducers/index'


// var actions = bindActionCreators(index, dispatch)
// export const testFunction = actions.setFirebaseRef(initialize)
