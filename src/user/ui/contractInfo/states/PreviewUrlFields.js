import React from 'react';
import ContractInfoPreviewUrl from '../components/ContractInfoPreviewUrl.js';
import CaptureFileInput from '../components/CaptureFileInput.js';
import UploadButton from '../components/UploadButton.js'

const PreviewUrlFields = (props) => {
  const {
    stage,
    captureFile,
    previewUrl,
  } = props;

  const renderContractInfoPreviewUrl = () => (
    <ContractInfoPreviewUrl stage={stage} previewUrl={previewUrl} />
  );

  const renderUploadFields = () => (
    <div>
      <CaptureFileInput captureFile={captureFile} />
      <UploadButton />
    </div>
  );

  return (
    <div>
      { stage >= 1 ? renderContractInfoPreviewUrl() : null}
      { stage === 1 ? renderUploadFields() : null }
    </div>
  )
};

export default PreviewUrlFields;