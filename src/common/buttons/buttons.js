import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

const CancelButton = ({ handleCancel }) => {
  return(
    <FlatButton label="Cancel" secondary={true} onClick={() => handleCancel()} />
  )
};

const ContributeFundingButton = ({ handleContributeFunding }) => {
  return(
    <FlatButton label="Contribute Funding" primary={true} onClick={() => handleContributeFunding()} />
  )
};

const SetPreviewUrlButton = ({ handleSetPreviewUrl }) => {
  return(
    <FlatButton label="Set Preview Url" primary={true} onClick={() => handleSetPreviewUrl()} />
  )
};

export {
  CancelButton,
  ContributeFundingButton,
  SetPreviewUrlButton
}