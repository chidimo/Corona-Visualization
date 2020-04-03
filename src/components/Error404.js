import React from 'react';
import propTypes from 'prop-types';

export const Error404 = ({ location }) => (
  <div className="container-404" id="error404">
    <h1>Error: 404</h1>
    <p>
      The requested url <span id="pathname">{location.pathname}</span> was not
      found on the server.
    </p>
  </div>
);

Error404.propTypes = {
  location: propTypes.shape({
    pathname: propTypes.string.isRequired,
  }),
};
