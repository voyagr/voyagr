// actions/firebaseRef.js
export const setFirebaseRef = function (ref) {
  return {
    type: 'FIREBASE_REF_SET',
    value: ref
  }
}

// reducers/firebaseRef.js
const initialState = null;

export default function firebaseRef (state = initialState, action) {
  switch (action.type) {
  case 'FIREBASE_REF_SET':
    return action.value;
  default:
    return state;
  }
}

