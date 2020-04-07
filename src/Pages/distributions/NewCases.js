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

  const newCases = useRef([]);
  const newCasesLabels = useRef([]);

  useEffect(() => {
    getCasesForADay()(dispatch);
    return () => {
      newCases.current = [];
      newCasesLabels.current = [];
      cleanGetCasesForDay()(dispatch);
    };
  }, [ dispatch ]);

  useEffect(() => {
    casesForDay
      .sort((a, b) => b.new_cases - a.new_cases)
      .forEach((c) => {
        const { country_name, new_cases } = c;
        newCases.current.push(new_cases);
        newCasesLabels.current.push(country_name);
      });
  }, [ casesForDay ]);

  return (
    <Container>
      <h1 className="text-danger">New cases</h1>
      {gettingCasesForDay ? (
        <BorderSpinner />
      ) : (
        <Container>
          <PieChart
            title={'New cases'}
            labels={newCasesLabels.current}
            yAxesData={newCases.current}
          />
        </Container>
      )}
    </Container>
  );
};

export default NewCases;
