import React from 'react';
import Dialog from 'material-ui/Dialog';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
const Modal = (props) => {
    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={props.actions}
          modal={true}
          open={props.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    );
  }

export default Modal;