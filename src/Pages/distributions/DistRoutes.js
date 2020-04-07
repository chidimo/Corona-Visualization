import React from 'react';
import PropTypes from 'prop-types';
export const DistRoutes = ({ children }) => {
  return <div>{children}</div>;
};

DistRoutes.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
};
