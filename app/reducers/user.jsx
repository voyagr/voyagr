import { database, auth } from '../../db/firebase'
import { browserHistory } from 'react-router'

/* --------- Initial State ---------*/
const initialState = {
}

/* ---------- Reducer -----------*/
const reducer = (state=initialState, action) => {
  switch(action.type) {
    case AUTHENTICATED:
        return action.user
  }
  return state
}

/* ------- Action Creators-------*/
const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

/*--------Async Stuff ----------*/
//only email and pw are used for auth, name is stored in db
export const create = (name, email, password) =>
  dispatch => {
    // let user
    auth
    //create user
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      auth.onAuthStateChanged(function(user) {
        if (user) {
          user.updateProfile({
            displayName: name,
          })
          .then(() => user.sendEmailVerification())
          .then(() => {
            database
            .ref(`users/${user.uid}`)
            .set({
              name: name,
              email: email,
            })
          })
          .catch(error => {
            console.log('NESTED ERROR', error.code, error.message)
          })
        } else console.log('NO USER')
      })
    })
    .catch(function(error) {
      var errorCode = error.code
      var errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(errorMessage)
        }
        console.log('ERROR', errorCode, errorMessage)
    })
  }

export const login = (email, password) =>
  dispatch =>
  auth
  //login
  .signInWithEmailAndPassword(email, password)
  .then(() => browserHistory.push("/timeline"))
  .catch(function(error) {
    let errorCode = error.code
    let errorMessage = error.message
      console.log('ERROR', errorCode, errorMessage)
  })

export const logout = () =>
  dispatch =>
  auth
  //logout
  .signOut()
  .catch(function(error) {
    let errorCode = error.code
    let errorMessage = error.message
      console.log('ERROR', errorCode, errorMessage)
  })

export default reducer
