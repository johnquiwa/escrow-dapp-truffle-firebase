import { connect } from 'react-redux'
import ContractList from './ContractList'
// import { updateUser } from './ProfileFormActions'

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.user.data.name,
    web3Instance: state.web3.web3Instance
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onProfileFormSubmit: (name) => {
      event.preventDefault();

    //   dispatch(updateUser(name))
    }
  }
};

const ContractListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContractList);

export default ContractListContainer
