import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

const CancelButton = ({ handleCancel }) => {
  return(
    <FlatButton label="Cancel" secondary={true} onClick={() => handleCancel()} />
  )
}

export {
  CancelButton
}