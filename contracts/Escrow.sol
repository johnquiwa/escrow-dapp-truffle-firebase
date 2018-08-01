pragma solidity 0.4.24;


contract Escrow {
    // Stage Management
    enum Stages {
        Funding,
        SetStrings,
        ApproveOrReject,
        PayoutAndReveal
    }

    Stages public stage = Stages.Funding;

    modifier isProvider() {
        assert(msg.sender == agreement.providerAddress);
        _;
    }

    modifier isClient() {
        assert(msg.sender == agreement.clientAddress);
        _;
    }

    modifier atStage(Stages _stage) {
        require(stage == _stage);
        _;
    }

    modifier transitionNext() {
        _;
        nextStage();
    }

    // Agreement
    struct Agreement {
        uint256 agreementPrice;
        address clientAddress;
        address providerAddress;
        bytes32 previewMessageOne;
        bytes32 previewMessageTwo;
        bytes32 finalMessage;
        bool approved;
        mapping(address => uint256) funders;
    }/**/

    Agreement public agreement;

    event Contribute (
        address _contributor,
        uint _value
    );

    event Stage (
        uint _value
    );

    event SetPreviewUrl (
        bytes32 _partOne,
        bytes32 _partTwo
    );

    constructor (uint256 _agreementPrice, address _clientAddress) public {
        agreement.agreementPrice = _agreementPrice;
        agreement.clientAddress = _clientAddress;
        agreement.providerAddress = msg.sender;
        agreement.approved = false;
    }

    function getAgreementPrice ()
    public
    view
    returns
    (uint256 agreementPrice)
    {
        return agreement.agreementPrice;
    }

    function getProviderAddress () public view returns (address) {

        return agreement.providerAddress;
    }

    function getClientAddress () public view returns (address) {
        return agreement.clientAddress;
    }

    // Funding
    function contributeFunding()
    public
    payable
    atStage(Stages.Funding)
    {
        agreement.funders[msg.sender] = msg.value;
        emit Contribute(msg.sender, msg.value);

        if (address(this).balance >= agreement.agreementPrice) {
            nextStage();
        }
    }

    // Provider
    // Make sure to set these uint256 _agreementPrice, address _clientAddress
    function setPreviewMessage(bytes32 _previewMessageOne, bytes32 _previewMessageTwo)
    public
    atStage(Stages.SetStrings)
    isProvider
    {
        agreement.previewMessageOne = _previewMessageOne;
        agreement.previewMessageTwo = _previewMessageTwo;
        emit SetPreviewUrl(_previewMessageOne, _previewMessageTwo);
    }

//    function setFinalMessage(bytes32 _finalMessage)
//    public
//    atStage(Stages.SetStrings)
//    isProvider
//    {
//        assert(agreement.previewMessage.length > 0);
//        agreement.finalMessage = _finalMessage;
//        nextStage();
//    }

    // Client
    function getPreviewMessage()
    public
    view
    atStage(Stages.ApproveOrReject)
    isClient
    returns (bytes32, bytes32)
    {
        return (agreement.previewMessageOne, agreement.previewMessageTwo);
    }

    function approvePreview()
    public
    atStage(Stages.ApproveOrReject)
    isClient
    {
        agreement.approved = true;
        agreement.providerAddress.transfer(address(this).balance);
        nextStage();
    }

    function getFinalMessage()
    public
    view
    atStage(Stages.PayoutAndReveal)
    isClient
    returns (bytes32)
    {
        return agreement.finalMessage;
    }

    function getFundingAmount() public view returns (uint) {
        return address(this).balance;
    }

    // Destroy Contract and send remaining balance to provider
    function kill() public isProvider {
        selfdestruct(agreement.providerAddress);
    }

    // Internal
    function nextStage() internal {
        stage = Stages(uint(stage) + 1);
        emit Stage(uint(stage));
    }
}