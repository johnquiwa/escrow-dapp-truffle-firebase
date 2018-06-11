import React from 'react';
import TextField from 'material-ui/TextField';

const renderContractAddressField = ({input}) => (
  <div>
    <TextField
      hintText="Contract Address"
      floatingLabelText="Contract Address"
      floatingLabelFixed={true}
      fullWidth={true}
      {...input}
    />
  </div>
);

const renderEthPriceField = ({input}) => (
  <div>
    <TextField
      hintText="Ethereum Amount"
      floatingLabelText="Ethereum Amount"
      floatingLabelFixed={true}
      {...input}
    />
  </div>
);

export default {
  renderContractAddressField,
  renderEthPriceField
}