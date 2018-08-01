import React from 'react';

const TransactionLink = (props) => {
  const { contractAddress } = props;
  return (
    <div>
      <h3>TX:</h3>
      <p>
        <a href={`https://etherscan.io/address/${contractAddress}`}>
          {contractAddress}
        </a>
      </p>
    </div>
  )
};

export default TransactionLink;