import * as firebase from 'firebase'

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
export const create = (email, password) =>
  dispatch => {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => console.log(user))
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log('ERROR', errorCode, errorMessage)
    })
  }

// export const login = (email, password) =>
//   dispatch =>
//     firebase.auth()
//     .signInWithEmailAndPassword(email, password)
//     .then(user => dispatch(authenticated(user)))
//     .catch(function(error) {
//         var errorCode = error.code;
//         var errorMessage = error.message;
// })

export default reducer
