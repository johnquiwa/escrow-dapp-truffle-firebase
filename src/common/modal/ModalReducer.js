const initialState = {
  open: false
}

const modalReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'MODAL_OPEN':
      return Object.assign({}, state, {
        open: true
      })
    case 'MODAL_CLOSED':
      return Object.assign({}, state, {
        open: false
      })
    default:
      return state
  }
}

export default modalReducer
