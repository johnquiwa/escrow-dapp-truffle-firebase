import * as React from 'react'
import TextField from 'material-ui/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from 'material-ui/Dialog';
import { CancelButton, ContributeFundingButton, SetPreviewUrlButton } from '../../../common/buttons/buttons';

class ContractInfoModal extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      contributionAmount: 0,
      previewUrl: '',
      buffer: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    console.log(buffer);
    this.setState({buffer});
  };

  renderContributeFundingStage() {
    const contributeFunding = () => {
      this.props.handleContributeFunding(this.state.contributionAmount);
    };
    return (
      <Dialog
        title="Contract Information"
        actions={[<ContributeFundingButton handleContributeFunding={contributeFunding} />,
          <CancelButton handleCancel={this.props.handleCloseModal} />]}
        modal={true}
        open={this.props.open}
        contentStyle={{width: '50%'}}
      >
        <div>
          <h3>Stage</h3>
          <p>Funding</p>
          <h3>Funding Amount</h3>
          <p>{this.props.contract.bigNumFundingAmount ? this.props.contract.bigNumFundingAmount.toString() : null}</p>
          <TextField
            id="text-field-controlled"
            name="contributionAmount"
            value={this.state.contributionAmount}
            onChange={this.handleChange.bind(this)}
            type="number"
          />
        </div>
      </Dialog>
    )
  }

  renderSetStringsStage() {
    const setPreviewUrl = () => {
      this.props.handleSetPreviewUrl(this.state.buffer);
    };
    return (
      <Dialog
        title="Contract Information"
        actions={[<SetPreviewUrlButton handleSetPreviewUrl={setPreviewUrl} />,
          <CancelButton handleCancel={this.props.handleCloseModal} />]}
        modal={true}
        open={this.props.open}
        contentStyle={{width: '50%'}}
      >
        <div>
          <h3>TX:</h3>
          <p>
            <a href={`https://etherscan.io/address/${this.props.contract.clickedContract.address}`}>
              {this.props.contract.clickedContract.address}
            </a>
          </p>
          <h3>Stage</h3>
          <p>Provide Preview</p>
          <h3>Funding Amount</h3>
          <p>{this.props.contract.bigNumFundingAmount ? this.props.contract.bigNumFundingAmount.toString() : null}</p>
          <h3>Preview Url</h3>
          <p>
            <a href={this.props.contract.previewUrl ? `https://gateway.ipfs.io/ipfs/${this.props.contract.previewUrl}` : null}>{this.props.contract.previewUrl || null}
            </a>
          </p>
          <input
            accept="image/*"
            id="raised-button-file"
            style={{display: 'none'}}
            onChange={this.captureFile}
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button color="primary" variant="raised" component="span">
              Upload
              <CloudUploadIcon style={{ marginLeft: '5px' }} />
            </Button>
          </label>
        </div>
      </Dialog>
    )
  }

  renderContractStageView(stage) {
    switch (stage) {
      case '0':
        return this.renderContributeFundingStage();
      case '1':
        return this.renderSetStringsStage();

      default:
        break;
    }
  }

  render() {
    return this.renderContractStageView(this.props.contract.bigNumStage.toString());
  };
}

export default ContractInfoModal;