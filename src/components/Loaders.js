import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

export const Oval = () => {
  return (
    <Spinner
      style={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      animation="border"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
