import React from 'react';

const CaptureFileInput = (props) => {
  return (
    <input
      accept="image/*"
      id="raised-button-file"
      style={{display: 'none'}}
      onChange={props.captureFile}
      multiple
      type="file"
    />
  )
};

export default CaptureFileInput;