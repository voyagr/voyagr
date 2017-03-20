export const movePhoto = newCoordinates => ({
	type: 'MOVE PHOTO',
	newCoordinates: newCoordinates
});

export const resizePhoto = newSize => ({
	type: 'RESIZE PHOTO',
	newSize: newSize
})

export const rotatePhoto = angle => ({
	type: 'ROTATE PHOTO',
	newOrientation: angle
})

export const changeLayer = layer => ({
	type: 'CHANGE LAYER',
	newLayer: layer
})

export default function (state = {}, action) {
	switch (action.type) {
		case 'MOVE PHOTO':
			return Object.assign({}, state, action.newCoordinates)

		default:
			return state;
	}
}
