import React from 'react';
import TextField from 'material-ui/TextField';

const renderClientAddressField = ({input}) => (
  <div>
    <TextField
      hintText="Client Address"
      floatingLabelText="Client Address"
      floatingLabelFixed={true}
      fullWidth={true}
      autoComplete='off'
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
      autoComplete='off'
      {...input}
    />
  </div>
);

export default {
  renderClientAddressField,
  renderEthPriceField
}