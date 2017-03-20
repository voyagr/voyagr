
const initialState = {
  pageInfo: {}
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case "RECEIVE_PAGE_INFO":
      newState.pageInfo = action.pageInfo
      break;

    default: return state;
  }

  return newState
}

export const receivePageInfo = (pageInfo) => {
  return {
    type: "RECEIVE_PAGE_INFO",
    pageInfo
  }
}


export default reducer
