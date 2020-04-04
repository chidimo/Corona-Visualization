import React from 'react';

import Container from 'react-bootstrap/Container';

export const CountryPageTitle = (props) => {
  const { name, short_name } = props;

  return (
    <Container className="country-page-flag-container">
      <div className="img64-container">
        <img
          src={`https://www.countryflags.io/${short_name}/shiny/64.png`}
          alt="Flag"
        />
      </div>
      <h2>Covid19 Cases in {name}</h2>
    </Container>
  );
};
