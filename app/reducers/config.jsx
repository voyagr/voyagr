// // reducers/config.js
// const initialState = {};

// function config (state = initialState, action) {
//   switch (action.type) {
//   case 'CONFIG_REPLACE':
//     return Object.assign({}, action.value); // note: we replace state entirely here
//   default:
//     return state;
//   }
// }


// // actions/config.js
// /**
//  * Called every time the firebase ref changes
//  */
// function replaceConfig(config) {
//   return {
//     type: 'CONFIG_REPLACE',
//     value: config
//   }
// }

// /**
//  * Start listening to changes when the app boots
//  */
// export const listenToConfigChanges = function () {
//   return (dispatch, getState) => {
//     const { firebaseRef } = getState()
//     firebaseRef.child('config').on('value', (snapshot) => {
//       dispatch(replaceConfig(snapshot.val()))
//     })
//   }
// }

// /*
//  * Save new config data
//  */
// export default function saveConfig (config) {
//   return (dispatch, getState) => {
//     const { firebaseRef } = getState()
//     firebaseRef.child('config').set(config)
//     // no need for dispatch, it will trigger Firebase 'value', which will dispatch `replaceConfig`
//   }
// }
