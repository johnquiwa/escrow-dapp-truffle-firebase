import { connect } from 'react-redux'
import EscrowButton from './EscrowButton'
import { createContract } from './EscrowButtonActions'

const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  return {
    clientAddress: state.clientAddress
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateContractClick: (event) => {
      event.preventDefault();

      dispatch(createContract())
    }
  }
};

const EscrowButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EscrowButton);

export default EscrowButtonContainer;
