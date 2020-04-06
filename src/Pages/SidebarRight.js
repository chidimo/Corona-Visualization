import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

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
    activeCountry,
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
      <Container>
        <h3 style={{ wordBreak: 'break-all' }} className="text-primary">
          {activeCountry.name}
        </h3>
      </Container>

      <Container className="right-sidebar-child">
        {[
          {
            bg: 'primary',
            data: mostRecentCase,
            title: 'Current status',
            spinner: gettingMostRecentCase,
          },
          {
            bg: 'danger',
            data: firstDeath,
            title: 'Day of first death',
            spinner: gettingFirstDeath,
          },
          {
            bg: 'secondary',
            data: firstCase,
            title: 'Day of first case',
            spinner: gettingFirstCase,
          },
        ].map((m, i) => {
          const { title, bg, data, spinner } = m;

          return (
            <Card key={i} className="mb-5" bg={bg} text={'white'}>
              <Card.Header>{title}</Card.Header>
              {spinner ? (
                <BorderSpinner />
              ) : (
                <Card.Body>
                  <Card.Title>
                    {localeFromTSOrdinal(data.recordDate)}
                  </Card.Title>
                  <Card.Text>{data.total_cases} total cases</Card.Text>
                  <Card.Text>{data.new_cases} new cases</Card.Text>
                  <Card.Text>{data.total_deaths} total deaths</Card.Text>
                  <Card.Text>{data.new_deaths} new deaths</Card.Text>
                </Card.Body>
              )}
            </Card>
          );
        })}
      </Container>
    </Container>
  );
};

export default SidebarRight;
