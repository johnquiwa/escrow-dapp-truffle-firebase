import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './user/userReducer'
import ModalReducer from './common/modal/ModalReducer'
import web3Reducer from './util/web3/web3Reducer'
import contractModalReducer from './ducks/contractModal';
import { reducer as reduxFormReducer } from 'redux-form'

const reducer = combineReducers({
  routing: routerReducer,
  contractModal: contractModalReducer,
  form: reduxFormReducer,
  user: userReducer,
  modal: ModalReducer,
  web3: web3Reducer
})

export default reducer
