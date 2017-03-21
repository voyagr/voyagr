import * as firebase from 'firebase'
import Signup from '../components/Signup';

/* --------- Initial State ---------*/
const initialState = {
    currentUser: null,   
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
export const signup = (email, password) =>
  dispatch =>
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => dispatch(authenticated(user)))
    .catch(function(error) {
        var errorMessage = error.message;
});

export const login = (email, password) =>
  dispatch =>
    firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => dispatch(authenticated(user)))    
    .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
});