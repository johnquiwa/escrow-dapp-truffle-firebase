import React from 'react';

const Stage = (props) => {
  const stages = {
    0: 'Funding',
    1: 'Set Preview Url'
  };

  return (
    <div>
      <h3>Stage</h3>
      <p>{stages[props.stage]}</p>
    </div>
  )
};

export default Stage;