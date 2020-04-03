import React from 'react';
import Loader from 'react-loader-spinner';

export const Oval = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Loader type="Oval" color={'#0077FF'} width={60} height={60} />
    </div>
  );
};
