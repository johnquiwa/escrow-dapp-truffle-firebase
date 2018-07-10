import React from 'react';
import { Field, reduxForm } from 'redux-form';
import fields from '../../../common/fields/fields';

const { renderClientAddressField, renderEthPriceField } = fields;

const ContractCreateForm = props => {
  return (
    <form id="contract-form" name="contract-form" className="contract-form">
      <Field name="clientAddress" component={ renderClientAddressField } />
      <Field name="ethPrice" component={ renderEthPriceField } />
    </form>
  );
};

export default reduxForm({
  form: 'ContractCreateForm', // a unique identifier for this form
})(ContractCreateForm);
