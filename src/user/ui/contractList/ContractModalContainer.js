import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ContractModal from './ContractModal'
import { openModal, closeModal } from '../../../ducks/contractModal';

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.contractModal.open,
    web3Instance: state.web3.web3Instance
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openModal,
      closeModal
    },
    dispatch
  )

const ContractModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractModal)

export default ContractModalContainer
