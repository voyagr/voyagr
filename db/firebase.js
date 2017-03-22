import * as firebase from 'firebase'
import config from '../firebaseConfig'

export const initialize = firebase.initializeApp(config)

export const database = firebase.database()

export const auth = firebase.auth()
