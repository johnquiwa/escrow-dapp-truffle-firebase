const Escrow = artifacts.require('./Escrow.sol');

contract('Escrow', function ([owner]) {
  let escrow;
  let agreementPrice = 100000;
  let clientAddress = '0x12491bB3983dE026A6770Fd0CA967CC58FF56777';

  beforeEach('setup contract for each test', async function () {
    escrow = await Escrow.new(agreementPrice, clientAddress);
  });

  it('should have an owner', async function () {
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

  it('should fire event when contributeFunding is called', async function () {
    const escrowContributeEvent = escrow.Contribute();
    await escrow
      .contributeFunding
      .sendTransaction({from: owner, value: agreementPrice});

    const eventData = await escrowContributeEvent.get();
    assert.equal(eventData[0].args._contributor, owner);
    assert.equal(eventData[0].args._value, agreementPrice);
  });
});