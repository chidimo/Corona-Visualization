/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import CountryChartsMulti from './CountryChartsMulti';

const AllCountries = () => {
  const { countries, gettingCountries } = useSelector((state) => state.cont);

  return (
    <Container>
      {countries.slice(0, 10).map((c) => {
        const { _id, name, short_name } = c;
        return (
          <Container key={_id}>
            <CountryChartsMulti _id={_id} name={name} short_name={short_name} />
          </Container>
        );
      })}
    </Container>
  );
};

export default AllCountries;
