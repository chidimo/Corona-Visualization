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
      <h1 className="text-danger">Total deaths</h1>
      {gettingCasesForDay ? (
        <BorderSpinner />
      ) : (
        <Container>
          <PieChart
            title={'Total deaths'}
            labels={totalDeathsLabels.current}
            yAxesData={totalDeaths.current}
          />
        </Container>
      )}
    </Container>
  );
};

export default NewCases;
