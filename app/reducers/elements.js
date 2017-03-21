
const initialState = {
  textBox: {
    1: { top: 20, left: 80, size: 'small', text: 'My vacay memories' },
    2: { top: 100, left: 120, size: 'small', text: 'note to self'} },
  photo: {
    1: {top: 200, left: 20, size: 'small', text: 'Pretty Photo' }}
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case 'SET_ELEMENT_XY':
      newState[action.elementUpdate.type][action.elementUpdate.id].left = action.elementUpdate.left
      newState[action.elementUpdate.type][action.elementUpdate.id].top = action.elementUpdate.top
      break

    default: return state;
  }

  return newState
}

export const setElementXY = (elementUpdate) => {
  return {
    type: 'SET_ELEMENT_XY',
    elementUpdate // { id: 1, type: textBox, x: 101, y: 302 }
  }
}

export default reducer
