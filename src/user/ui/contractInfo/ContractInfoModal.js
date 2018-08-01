import * as React from 'react'
import ContractInfoDialog from './ContractInfoDialog';

class ContractInfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contributionAmount: 0,
      previewUrl: '',
      buffer: ''
    }
  }

  convertToBuffer = async(reader) => {
    const buffer = await Buffer.from(reader.result);
    console.log(buffer);
    this.setState({buffer});
  };

  render() {
    const contributeFunding = () => {
      console.log(this.state.contributionAmount);
      this.props.handleContributeFunding(this.state.contributionAmount);
    };

    const setPreviewUrl = () => {
      this.props.handleSetPreviewUrl(this.state.buffer);
    };

    const handleContributionChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      })
    };

    const captureFile = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      console.log('here', file);
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.convertToBuffer(reader);
    };

    return (
      <ContractInfoDialog
        contributeFunding={contributeFunding}
        setPreviewUrl={setPreviewUrl}
        captureFile={captureFile}
        handleContributionChange={handleContributionChange}
        contributionAmount={this.state.contributionAmount}
        {...this.props}
      />
    )
  };
}

export default ContractInfoModal;