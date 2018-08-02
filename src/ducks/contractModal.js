const initialState = {
  open: false
};

const MODAL_OPENED = 'MODAL_OPENED';
const MODAL_CLOSED = 'MODAL_CLOSED';

const contractModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPENED:
      return Object.assign({}, state, {
        open: true
      });
    case MODAL_CLOSED:
      return Object.assign({}, state, {
        open: false
      });
    default:
      return state;
  }
};

export function openModal() {
  return dispatch => {
    dispatch({type: MODAL_OPENED})
  }
}

export function closeModal() {
  return (dispatch) => {
    dispatch({type: MODAL_CLOSED})
  }
}

export default contractModalReducer
