import React from 'react';
import TextField from 'material-ui/TextField';

const ContributionTextField = (props) => {
  return (
    <TextField
      id="text-field-controlled"
      name="contributionAmount"
      value={props.contributionAmount}
      onChange={props.handleContributionChange.bind(this)}
      type="number"
    />
  )
};

export default ContributionTextField;