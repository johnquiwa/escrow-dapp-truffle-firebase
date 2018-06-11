import React from 'react'
import EscrowButtonContainer from '../escrowContract/EscrowButtonContainer'
import ContractForm from './ContractForm'
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { CancelButton } from '../../../common/buttons/buttons';

const ContractModal = (props) => {
    return (
      <div>
        <RaisedButton label="Create Contract" onClick={props.openModal} />
        <Dialog
          title="Contract Information"
          actions={[<EscrowButtonContainer />, <CancelButton handleCancel={props.closeModal} />]}
          modal={true}
          open={props.open}
          contentStyle={{width: '50%'}}
        >
          <ContractForm />
        </Dialog>
      </div>
    );
}

export default ContractModal;