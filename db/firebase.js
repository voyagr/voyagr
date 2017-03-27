import * as firebase from 'firebase'
import config from '../firebaseConfig'

export const initialize = firebase.initializeApp(config)

export const database = firebase.database()

export const auth = firebase.auth()

export const ref = database.ref()

export const storage = firebase.storage()

export const storageRef = storage.ref()

export const provider = new firebase.auth.GoogleAuthProvider();