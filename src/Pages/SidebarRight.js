import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';

import {
  getFirstCase,
  getFirstDeath,
  cleanFirstCase,
  cleanFirstDeath,
  getMostRecentCase,
  cleanMostRecentCase,
} from './countries/redux/countActions';

import { BorderSpinner } from './Spinners';
import { localeFromTSOrdinal } from '../dateUtils';

const SidebarRight = () => {
  const dispatch = useDispatch();
  const match = window.location.href.match(/countries\/(.*)/);
  const _id = match ? match[1] : '';

  const {
    firstCase,
    firstDeath,
    mostRecentCase,
    gettingFirstCase,
    gettingFirstDeath,
    gettingMostRecentCase,
  } = useSelector((state) => state.cont);

  useEffect(() => {
    if (_id) {
      getFirstCase(_id)(dispatch);
      getFirstDeath(_id)(dispatch);
      getMostRecentCase(_id)(dispatch);
    } else {
      getFirstCase('World', 'name')(dispatch);
      getMostRecentCase('World', 'name')(dispatch);
      getFirstDeath('World', 'name')(dispatch);
    }
    return () => {
      cleanFirstCase()(dispatch);
      cleanFirstDeath()(dispatch);
      cleanMostRecentCase()(dispatch);
    };
  }, [ _id, dispatch ]);

  return (
    <Container fluid className="right-sidebar sidebar">
      <Container className="right-sidebar-child">
        <Container>
          <h5>Current status</h5>
        </Container>

        {gettingMostRecentCase ? (
          <BorderSpinner />
        ) : (
          <Container className="most-recent-case">
            <h6>{localeFromTSOrdinal(mostRecentCase.recordDate)}</h6>
            <p>{mostRecentCase.total_cases} total cases</p>
            <p>{mostRecentCase.new_cases} new cases</p>
            <p>{mostRecentCase.total_deaths} total deaths</p>
            <p>{mostRecentCase.new_deaths} new deaths</p>
          </Container>
        )}

        <Container>
          <h5>Status on day of first case</h5>
        </Container>

        {gettingFirstCase ? (
          <BorderSpinner />
        ) : (
          <Container className="most-recent-case">
            <h6>{localeFromTSOrdinal(firstCase.recordDate)}</h6>
            <p>{firstCase.total_cases} total cases</p>
            <p>{firstCase.new_cases} new cases</p>
            <p>{firstCase.total_deaths} total deaths</p>
            <p>{firstCase.new_deaths} new deaths</p>
          </Container>
        )}

        <Container>
          <h5>Status on day of first death</h5>
        </Container>

        {gettingFirstDeath ? (
          <BorderSpinner />
        ) : (
          <Container className="most-recent-case">
            <h6>{localeFromTSOrdinal(firstDeath.recordDate)}</h6>
            <p>{firstDeath.total_cases} total cases</p>
            <p>{firstDeath.new_cases} new cases</p>
            <p>{firstDeath.total_deaths} total deaths</p>
            <p>{firstDeath.new_deaths} new deaths</p>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default SidebarRight;
