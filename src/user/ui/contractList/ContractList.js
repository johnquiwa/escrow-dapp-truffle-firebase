import React, { Component } from 'react'
import firebase  from 'firebase'
import ContractListItem  from './ContractListItem'

class ContractList extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      contractList: []
    }
  }
  
  componentDidMount() {
    const rootRef = firebase.database().ref().child('contracts')
    rootRef.on('child_added', snapshot => {
      const newContract = {
        contract: snapshot.key
      };
      this.setState(previousState => {
        return { contractList: [ ...previousState.contractList, newContract] }
      })
    })
  }


  render() {
    return(
      <ContractListItem contractList={this.state.contractList} web3Instance={this.props.web3Instance}/>
    )
  }
}

export default ContractList
