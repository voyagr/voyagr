
const initialState = {

}

const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case "SET_ELEMENT_XY":
      newState = action.element
      break;

    default: return state;
  }

  return newState
}

export const setElementXY = (element) => {
  return {
    type: "SET_ELEMENT_XY",
    element
  }
}


export default reducer
