import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import { getCasesByCountryName } from './countries/redux/countActions';

import { BorderSpinner } from './Spinners';

import { CountryPageTitle } from '../components/CountryPageTitle';

const WorldCases = () => {
  const dispatch = useDispatch();

  const { countryCases, gettingCasesByCountryName } = useSelector(
    (state) => state.cont
  );

  useEffect(() => {
    getCasesByCountryName('World')(dispatch);
  }, [ dispatch ]);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={'the World'} short_name={''} />

      {gettingCasesByCountryName ? (
        <BorderSpinner />
      ) : (
        <div>{JSON.stringify(countryCases)}</div>
      )}
    </Container>
  );
};

export default WorldCases;
