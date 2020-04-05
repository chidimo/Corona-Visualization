import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import {
  getMostRecentCase,
  cleanMostRecentCase,
} from './countries/redux/countActions';
import { useDispatch, useSelector } from 'react-redux';
import { BorderSpinner } from './Spinners';
import { localeFromTSOrdinal } from '../dateUtils';

const SidebarRight = () => {
  const dispatch = useDispatch();
  const match = window.location.href.match(/countries\/(.*)/);
  const _id = match ? match[1] : '';

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
    if (_id) {
      getMostRecentCase(_id)(dispatch);
    } else {
      getMostRecentCase('World', 'name')(dispatch);
    }
    return () => {
      cleanMostRecentCase()(dispatch);
    };
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
          <p>{total_cases} total cases</p>
          <p>{new_cases} new cases</p>
          <p>{total_deaths} total deaths</p>
          <p>{new_deaths} new deaths</p>
        </Container>
      )}
    </Container>
  );
};

export default SidebarRight;
