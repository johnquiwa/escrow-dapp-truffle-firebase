import React, {Component} from 'react'

class ContractListItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul>
        {
          this.props.contractList.map(contract => {
            return <li key={contract.contract}
                       onClick={() => this.props.handleClickContract(contract.contract)}>{contract.contract}
                   </li>
          })
        }
      </ul>
    )
  }
}

export default ContractListItem
