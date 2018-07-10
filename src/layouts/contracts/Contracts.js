import React, { Component } from 'react'
import ContractListContainer from '../../user/ui/contractList/ContractListContainer'
import EscrowButtonContainer from '../../user/ui/escrowContract/EscrowButtonContainer'
import ContractCreateModalContainer from '../../user/ui/contractList/ContractCreateModalContainer'

class ContractList extends Component {
  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Contracts</h1>
            <ContractListContainer />
            <ContractCreateModalContainer actions={[<EscrowButtonContainer />]}/>
          </div>
        </div>
      </main>
    )
  }
}

export default ContractList
