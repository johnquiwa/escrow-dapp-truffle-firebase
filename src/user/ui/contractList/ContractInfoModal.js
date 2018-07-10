import * as React from 'react'
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import { CancelButton, ContributeFundingButton, SetPreviewUrlButton } from '../../../common/buttons/buttons';

class ContractInfoModal extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      contributionAmount: 0,
      previewUrl: ''
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

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
      this.props.handleSetPreviewUrl(this.state.previewUrl);
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
          <p>{this.props.contract.previewUrl || null}</p>
          <TextField
            id="text-field-controlled"
            name="previewUrl"
            value={this.state.previewUrl}
            onChange={this.handleChange.bind(this)}
            type="string"
          />
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