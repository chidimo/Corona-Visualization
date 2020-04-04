import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from '@reach/router';
import Container from 'react-bootstrap/Container';

import { getCountryCases } from './redux/countActions';

import { BorderSpinner } from '../Spinners';

const Country = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();

  const { countryCases, gettingCountryCases } = useSelector(
    (state) => state.cont
  );

  useEffect(() => {
    getCountryCases(_id)(dispatch);
  }, [ _id, dispatch ]);

  return (
    <Container className="country-graph-page">
      {gettingCountryCases ? (
        <BorderSpinner />
      ) : (
        <div>{JSON.stringify(countryCases)}</div>
      )}
    </Container>
  );
};

export default Country;
