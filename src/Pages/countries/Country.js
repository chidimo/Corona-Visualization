import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from '@reach/router';
import Container from 'react-bootstrap/Container';

import { getCountryCases } from './redux/countActions';

import { BorderSpinner } from '../Spinners';

import { CountryPageTitle } from '../../components/CountryPageTitle';

const Country = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const {
    state: { name, short_name },
  } = useLocation();

  const { countryCases, gettingCountryCases } = useSelector(
    (state) => state.cont
  );

  useEffect(() => {
    getCountryCases(_id)(dispatch);
  }, [ _id, dispatch ]);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={name} short_name={short_name} />
      {gettingCountryCases ? (
        <BorderSpinner />
      ) : (
        <div>{JSON.stringify(countryCases)}</div>
      )}
    </Container>
  );
};

export default Country;
