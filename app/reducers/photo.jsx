// const initialState = {
// 	photo: {}
// }


// const reducer = (state = initialState, action) => {
// 	let newState = Object.assign({}, state)
// 	let id;

// 	switch (action.type) {
// 		case 'ADD_A_PHOTO':
// 			id = Object.keys(action.photo)[0]
// 			console.log("NEW STATE", newState)
// 			newState.photo[id] = action.photo[id]
// 			// console.log("INSIDE REDUCER", id)
// 		break;

// 		default: return state;
// 	}
// 	return newState
// }

// export const addAPhoto = photo => ({
// 	type: 'ADD_A_PHOTO',
// 	photo
// })

// export default reducer
