import React from 'react';

const ContractInfoPreviewUrl = (props) => {
  const previewUrl = props.previewUrl ?
    `https://gateway.ipfs.io/ipfs/${props.previewUrl}` :
    null;

  return (
    <div>
      <h3>Preview Url</h3>
      <p>
        <a href={previewUrl}>
          {props.previewUrl}
        </a>
      </p>
    </div>
  )
};

export default ContractInfoPreviewUrl;