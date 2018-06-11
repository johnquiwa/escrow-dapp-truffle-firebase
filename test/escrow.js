const Escrow = artifacts.require('./Escrow.sol');

contract('Escrow', ([owner]) => {
  let agreementPrice = web3.toWei(1, 'ether');
  let clientAddress = '0x12491bB3983dE026A6770Fd0CA967CC58FF56777';

  it('should have an owner', async function () {
    const escrow = await Escrow.new(agreementPrice, clientAddress);
    const agreement = await escrow.agreement();
    const mappedAgreement = {
      agreementPrice: agreement[0].toNumber(2),
      clientAddress: agreement[1],
      providerAddress: agreement[2],
      previewMessage: web3.toUtf8(agreement[3]),
      finalMessage: web3.toUtf8(agreement[4]),
      approved: agreement[5]
    };

    assert.equal(mappedAgreement.providerAddress, owner);
    assert.equal(mappedAgreement.agreementPrice, agreementPrice);
    assert.equal(mappedAgreement.clientAddress, clientAddress.toLowerCase());
  });

  contract('contributeFunding', () => {
    let escrow;
    let escrowContributeEvent;
    beforeEach('setup contract for each test', async function () {
      escrow = await Escrow.new(agreementPrice, clientAddress);
      escrowContributeEvent = escrow.Contribute();
    });

    it('should fire event when contributeFunding is called', async function () {
      await escrow
        .contributeFunding
        .sendTransaction({from: owner, value: agreementPrice});

      const eventData = await escrowContributeEvent.get();

      assert.equal(eventData[0].args._contributor, owner);
      assert.equal(eventData[0].args._value.toNumber(2), agreementPrice);
    });

    it('should be in stage[0] until agreementPrice is met', async function () {
      const halfAgreementPrice = web3.toWei(.5, 'ether');
      const initialStage = await escrow.stage();

      // First Contribution
      await escrow
        .contributeFunding
        .sendTransaction({from: owner, value: halfAgreementPrice});

      const fundingAmountFirstContribution = await escrow.getFundingAmount();
      const stageAfterFirstContribution = await escrow.stage();

      // Second Contribution
      await escrow
        .contributeFunding
        .sendTransaction({from: owner, value: halfAgreementPrice});
      const fundingAmountSecondContribution = await escrow.getFundingAmount();
      const stageAfterSecondContribution = await escrow.stage();

      assert.equal(initialStage.toNumber(2), 0);
      assert.equal(stageAfterFirstContribution.toNumber(2), 0);
      assert.equal(stageAfterSecondContribution.toNumber(2), 1);
      assert.equal(fundingAmountFirstContribution.toNumber(2), halfAgreementPrice);
      assert.equal(fundingAmountSecondContribution.toNumber(2), agreementPrice);
    });
  });

  //it('should be able to setPreviewMessage', async function () {
  //  const eventData = await escrowContributeEvent.get();
  //  assert.equal(eventData[0].args._contributor, owner);
  //  assert.equal(eventData[0].args._value, agreementPrice);
  //});
});