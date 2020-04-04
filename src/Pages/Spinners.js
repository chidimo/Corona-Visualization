import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

export const BorderSpinner = () => {
  return (
    <Spinner
      size="lg"
      animation="border"
      role="status"
      className="border-spinner"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
