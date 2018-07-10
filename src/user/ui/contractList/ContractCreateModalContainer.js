import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import ContractCreateModal from './ContractCreateModal';
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

const ContractCreateModalContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractCreateModal)

export default ContractCreateModalContainer
