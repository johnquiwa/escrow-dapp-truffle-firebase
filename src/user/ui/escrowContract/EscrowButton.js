import React from 'react'
import FlatButton from 'material-ui/FlatButton';

const EscrowButton = ({ onCreateContractClick }) => {
  return(
    <FlatButton label="Create Contract" primary={true} onClick={(event) => onCreateContractClick(event)} />
  )
};

export default EscrowButton
