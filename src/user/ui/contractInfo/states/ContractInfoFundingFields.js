import React from 'react';
import FundingAmount from '../components/FundingAmount';
import ContributionTextField from '../components/ContributionTextField';

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