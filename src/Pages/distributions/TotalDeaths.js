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

  const totalDeaths = useRef([]);
  const totalDeathsLabels = useRef([]);

  useEffect(() => {
    getCasesForADay()(dispatch);
    return () => {
      totalDeaths.current = [];
      totalDeathsLabels.current = [];
      cleanGetCasesForDay()(dispatch);
    };
  }, [ dispatch ]);

  useEffect(() => {
    casesForDay
      .sort((a, b) => b.total_deaths - a.total_deaths)
      .forEach((c) => {
        const { country_name, total_deaths } = c;
        totalDeaths.current.push(total_deaths);
        totalDeathsLabels.current.push(country_name);
      });
  }, [ casesForDay ]);

  return (
    <Container>
      <Container style={{ paddingLeft: '3.5rem' }}>
        <h2>Total deaths</h2>
      </Container>
      {gettingCasesForDay ? (
        <BorderSpinner />
      ) : (
        <PieChart
          title={'Total deaths'}
          labels={totalDeathsLabels.current}
          yAxesData={totalDeaths.current}
        />
      )}
    </Container>
  );
};

export default NewCases;
