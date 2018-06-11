import React from 'react'

const EscrowButton = ({ onContributeFundingClick }) => {
  return(
    <li className="pure-menu-item">
      <a href="#" className="pure-menu-link" onClick={(event) => onContributeFundingClick(event)}>Contribute Funding</a>
    </li>
  )
}

export default EscrowButton
