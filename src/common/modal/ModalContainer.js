import { connect } from 'react-redux'
import Modal from './Modal'
// import { createContract } from './EscrowButtonActions'

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.modal.open,
    actions: ownProps.actions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)

export default ModalContainer
