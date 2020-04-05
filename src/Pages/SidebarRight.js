import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { getMostRecentCase } from './countries/redux/countActions';
import { useDispatch, useSelector } from 'react-redux';
import { BorderSpinner } from './Spinners';
import { localeFromTSOrdinal } from '../dateUtils';

const SidebarRight = () => {
  const dispatch = useDispatch();
  const _id = window.location.href.match(/countries\/(.*)/)[1];

  const { mostRecentCase, gettingMostRecentCase } = useSelector(
    (state) => state.cont
  );

  const {
    new_cases,
    total_cases,
    new_deaths,
    total_deaths,
    recordDate,
  } = mostRecentCase;

  useEffect(() => {
    getMostRecentCase(_id)(dispatch);
  }, [ _id, dispatch ]);

  return (
    <Container fluid className="right-sidebar sidebar">
      <Container>
        <h4>Most recent case</h4>
      </Container>

      {gettingMostRecentCase ? (
        <BorderSpinner />
      ) : (
        <Container className="most-recent-case">
          <h4>{localeFromTSOrdinal(recordDate)}</h4>
          <p>{new_cases} new cases</p>
          <p>{total_cases} total cases</p>
          <p>{new_deaths} new deaths</p>
          <p>{total_deaths} total deaths</p>
        </Container>
      )}
    </Container>
  );
};

export default SidebarRight;
