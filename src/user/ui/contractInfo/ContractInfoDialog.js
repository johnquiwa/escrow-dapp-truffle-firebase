import React from 'react';
import Dialog from 'material-ui/Dialog';
import TransactionLink from './common/TransactionLink';
import Stage from './common/Stage';
import { CancelButton, ContributeFundingButton, SetPreviewUrlButton } from '../../../common/buttons/buttons';
import FundingFields from './ContractInfoFundingFields';
import PreviewUrlFields from './PreviewUrlFields';

const ContractModalDialog = (props) => {
  const {
    contributeFunding,
    handleCloseModal,
    handleContributionChange,
    contributionAmount,
    setPreviewUrl,
    captureFile,
    contract
  } = props;

  const {
    agreementPrice,
    contractAddress,
    bigNumStage,
    bigNumFundingAmount,
    previewUrl
  } = contract;

  const assembleActions = (stage) => {
    const defaultActions = [
      <CancelButton handleCancel={handleCloseModal} />,
    ];
    const contributeActions = [
      <ContributeFundingButton handleContributeFunding={contributeFunding} />
    ].concat(defaultActions);

    const setUrlActions = [
      <SetPreviewUrlButton handleSetPreviewUrl={setPreviewUrl} />
    ].concat(defaultActions);

    switch(stage) {
      case 0:
        return contributeActions;
      case 1:
        return setUrlActions;
      default:
        return defaultActions;
    }
  };

  const stage = Number(bigNumStage);

  console.log(assembleActions());

  return (
    <Dialog
      title="Contract Information"
      actions={assembleActions(stage)}
      modal={true}
      open={props.open}
      contentStyle={{width : '50%'}}
      >
      <div>
        <TransactionLink contractAddress={contractAddress}/>
        <Stage stage={stage}/>
        <FundingFields
          agreementPrice={agreementPrice}
          bigNumFundingAmount={bigNumFundingAmount}
          stage={stage}
          handleContributionChange={handleContributionChange}
          contributionAmount={contributionAmount}
        />
        <PreviewUrlFields
          stage={stage}
          previewUrl={previewUrl}
          captureFile={captureFile}
        />
      </div>
    </Dialog>
  );
};

export default ContractModalDialog;

