import React from 'react';

const FundingAmount = (props) => {
  const { agreementPrice, bigNumFundingAmount } = props;
  const fundingAmount = bigNumFundingAmount ?
    bigNumFundingAmount.toString() :
    null;

  const agreementPriceStr = agreementPrice ?
    agreementPrice.toString() :
    null;

  return (
    <div>
      <h3>Funding Amount</h3>
      <p>{fundingAmount} (of {agreementPriceStr})</p>
    </div>
  )
};

export default FundingAmount;