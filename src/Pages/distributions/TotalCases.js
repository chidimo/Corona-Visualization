import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import {
  getCasesForADay,
  cleanGetCasesForDay,
} from '../countries/redux/countActions';

import { BorderSpinner } from '../Spinners';

import { PieChart } from '../../graph/PieChart';

const TotalCases = () => {
  const dispatch = useDispatch();
  const { casesForDay, gettingCasesForDay } = useSelector(
    (state) => state.cont
  );
  const totalCases = useRef([]);
  const totalCasesLabels = useRef([]);

  useEffect(() => {
    getCasesForADay(new Date())(dispatch);
    return () => {
      totalCases.current = [];
      totalCasesLabels.current = [];
      cleanGetCasesForDay()(dispatch);
    };
  }, [ dispatch ]);

  useEffect(() => {
    casesForDay
      .sort((a, b) => b.total_cases - a.total_cases)
      .forEach((c) => {
        const { country_name, total_cases } = c;
        totalCases.current.push(total_cases);
        totalCasesLabels.current.push(country_name);
      });
  }, [ casesForDay ]);

  return (
    <Container>
      <Container style={{ paddingLeft: '3.5rem' }}>
        <h2>Total cases</h2>
      </Container>
      {gettingCasesForDay ? (
        <BorderSpinner />
      ) : (
        <PieChart
          title={'Total cases'}
          labels={totalCasesLabels.current}
          yAxesData={totalCases.current}
        />
      )}
    </Container>
  );
};

export default TotalCases;
