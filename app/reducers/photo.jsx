// export const movePhoto = newCoordinates => ({
// 	type: 'MOVE PHOTO',
// 	newCoordinates: newCoordinates
// });

// export const resizePhoto = newSize => ({
// 	type: 'RESIZE PHOTO',
// 	newSize: newSize
// })

// export const rotatePhoto = angle => ({
// 	type: 'ROTATE PHOTO',
// 	newOrientation: angle
// })

// export const changeLayer = layer => ({
// 	type: 'CHANGE LAYER',
// 	newLayer: layer
// })
const initialState = {}


const reducer = (state = initialState, action) => {
	let newState = Object.assign({}, state)
	let id;

	switch (action.type) {
		case 'ADD_PHOTO':
			// id = Object.keys(action.photo)[0]
			// newState.
		break;

		default: return state;
	}
}

export const addPhoto = photo => ({
	type: 'ADD_PHOTO',
	photo
})

export default reducer
