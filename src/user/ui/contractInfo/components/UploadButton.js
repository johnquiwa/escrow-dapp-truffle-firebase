import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const UploadButton = () => {
  return (
    <label htmlFor="raised-button-file">
      <Button color="primary" variant="raised" component="span">
        Upload
        <CloudUploadIcon style={{ marginLeft: '5px' }} />
      </Button>
    </label>
  )
};

export default UploadButton;