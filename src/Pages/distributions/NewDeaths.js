import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import {
  getCasesForADay,
  cleanGetCasesForDay,
} from '../countries/redux/countActions';

import { BorderSpinner } from '../Spinners';

import { PieChart } from '../../graph/PieChart';

const NewCases = () => {
  const dispatch = useDispatch();
  const { casesForDay, gettingCasesForDay } = useSelector(
    (state) => state.cont
  );

  const newDeaths = useRef([]);
  const newDeathsLabels = useRef([]);

  useEffect(() => {
    getCasesForADay()(dispatch);
    return () => {
      newDeaths.current = [];
      newDeathsLabels.current = [];
      cleanGetCasesForDay()(dispatch);
    };
  }, [ dispatch ]);

  useEffect(() => {
    casesForDay
      .sort((a, b) => b.new_deaths - a.new_deaths)
      .forEach((c) => {
        const { country_name, new_deaths } = c;
        newDeaths.current.push(new_deaths);
        newDeathsLabels.current.push(country_name);
      });
  }, [ casesForDay ]);

  return (
    <Container>
      <Container style={{ paddingLeft: '3.5rem' }}>
        <h2>New deaths</h2>
      </Container>
      {gettingCasesForDay ? (
        <BorderSpinner />
      ) : (
        <PieChart
          title={'New deaths'}
          labels={newDeathsLabels.current}
          yAxesData={newDeaths.current}
        />
      )}
    </Container>
  );
};

export default NewCases;
