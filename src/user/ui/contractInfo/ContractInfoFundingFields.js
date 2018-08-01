import React from 'react';
import FundingAmount from './common/FundingAmount';
import ContributionTextField from './common/ContributionTextField';

const FundingFields = (props) => {
  const {
    stage,
    agreementPrice,
    bigNumFundingAmount,
    handleContributionChange,
    contributionAmount
  } = props;

  return (
    <div>
      <FundingAmount agreementPrice={agreementPrice} bigNumFundingAmount={bigNumFundingAmount}/>
      {
        stage === 0 ?
        <ContributionTextField
        stage={stage}
        handleContributionChange={handleContributionChange}
        contributionAmount={contributionAmount}/> :
        null
      }
    </div>
  )
};

export default FundingFields;