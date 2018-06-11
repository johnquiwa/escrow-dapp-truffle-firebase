import React from 'react';
import { Field, reduxForm } from 'redux-form';
import fields from '../../../common/fields/fields';

const { renderContractAddressField, renderEthPriceField } = fields; 

const ContractForm = props => {
  return (
    <form id="contract-form" name="contract-form" className="contract-form">
      <Field name="clientAddress" component={ renderContractAddressField } label="Email" />
      <Field name="ethPrice" component={ renderEthPriceField } />
    </form>
  );
};

export default reduxForm({
  form: 'ContractForm', // a unique identifier for this form
})(ContractForm);
