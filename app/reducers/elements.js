//the comments below in the initialState are what the data will look like once pushed in.
const initialState = {
  textBox: {
    uniqueId: { top: 20, left: 80, size: 'large', text: 'My vacay memories', background: '#51b6ea', color: '#000000', zIndex: 6 }
  },
  photo: {
    /*
    uniqueId: {top: 200, left: 200, size: "small", source: "http://placehold.it/300/09f/fff.png"}
    */
  },
  video: {
    /*
    uniqueId: {top: 300, left: 300, size: "small", source: ""}
    */
  }
}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  let id;

  switch (action.type) {
    case 'SET_ELEMENT_XY':
      newState[action.elementUpdate.type][action.elementUpdate.id].left = action.elementUpdate.left
      newState[action.elementUpdate.type][action.elementUpdate.id].top = action.elementUpdate.top
      break;

    case 'SET_Z_INDEX':
      newState[action.element.type][action.element.id].zIndex = action.element.zIndex
      break;

    case 'SET_SIZE':
      newState[action.elementUpdateSize.type][action.elementUpdateSize.id].size = action.elementUpdateSize.size
      break;

    case 'CREATE_TEXT_BOX':
      id = Object.keys(action.newTextBox)[0]
      newState.textBox[id] = action.newTextBox[id]
      break;

    case 'ADD_A_PHOTO':
      id = Object.keys(action.photo)[0]
      newState.photo[id] = action.photo[id]
      break;

    case 'ADD_A_VIDEO':
      id = Object.keys(action.video)[0]
      newState.video[id] = action.video[id]
      break;

    case 'EDIT_TEXT':
      id = Object.keys(action.updatedText)[0]
      newState.textBox[id].text = action.updatedText[id].text
      break;

    case 'EDIT_BACKGROUND_COLOR':
      newState.textBox[action.elementUpdate.id].background = action.elementUpdate.background
      break;

    case 'EDIT_TEXT_COLOR':
      newState.textBox[action.elementUpdate.id].color = action.elementUpdate.color
      break;

    case 'DELETE_ELEMENT':
      delete newState[action.elementToDelete.type][action.elementToDelete.id]
      break;


    default: return state;
  }

  return newState
}

export const setElementXY = (elementUpdate) => {
  return {
    type: 'SET_ELEMENT_XY',
    elementUpdate, // { id: 1, type: textBox, x: 101, y: 302 }
  }
}

export const setElementZIndex = (element) => {
  return {
    type: 'SET_Z_INDEX',
    element
  }
}

export const setSize = (elementUpdateSize) => {
  return {
    type: "SET_SIZE",
    elementUpdateSize,
  }
}

export const createTextBox = (newTextBox) => {
  return {
    type: 'CREATE_TEXT_BOX',
    newTextBox,
  }
}

export const editText = (updatedText) => {
  return {
    type: 'EDIT_TEXT',
    updatedText,
  }
}

export const editBackgroundColor = (elementUpdate) => {
  return {
    type: 'EDIT_BACKGROUND_COLOR',
    elementUpdate
  }
}

export const editTextColor = (elementUpdate) => {
  return {
    type: 'EDIT_TEXT_COLOR',
    elementUpdate
  }
}

export const addAPhoto = photo => ({
  type: 'ADD_A_PHOTO',
  photo
})

export const deleteElement = (elementToDelete) => {
  return {
    type: 'DELETE_ELEMENT',
    elementToDelete,
  }
}

export const addAVideo = video => ({
  type: "ADD_A_VIDEO",
  video
})

export default reducer
