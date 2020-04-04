import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from '@reach/router';
import Container from 'react-bootstrap/Container';

import { getCountryCases, cleanGetCountryCases } from './redux/countActions';

import { bgColors, borderColors } from '../colors';
import { CountryPageTitle } from '../../components/CountryPageTitle';
import CovidLineChart from './CovidLineChart';

const Country = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const {
    state: { name, short_name },
  } = useLocation();

  const { countryCases, gettingCountryCases } = useSelector(
    (state) => state.cont
  );

  const newCases = useRef([]);
  const newDeaths = useRef([]);
  const totalCases = useRef([]);
  const totalDeaths = useRef([]);

  // clear state
  useEffect(() => {
    getCountryCases(_id)(dispatch);
    return () => {
      newCases.current = [];
      newDeaths.current = [];
      totalCases.current = [];
      totalDeaths.current = [];
      cleanGetCountryCases()(dispatch);
    };
  }, [ _id, dispatch ]);

  useEffect(() => {
    countryCases.forEach((c) => {
      const {
        new_cases,
        new_deaths,
        total_cases,
        total_deaths,
        recordDate,
      } = c;
      newCases.current.push({ qut: new_cases, recordDate });
      newDeaths.current.push({ qut: new_deaths, recordDate });
      totalCases.current.push({ qut: total_cases, recordDate });
      totalDeaths.current.push({ qut: total_deaths, recordDate });
    });
  }, [ countryCases ]);

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={name} short_name={short_name} />

      <CovidLineChart
        tooltipLabel={'Cases'}
        graphLabel={'Total cases'}
        dataPoints={totalCases.current}
        legendContainerId={'total-cases'}
        borderColor={borderColors.warning}
        backgroundColor={bgColors.warning}
        spinner={gettingCountryCases}
        legendLabel={'Total cases of Covid19'}
        yAxisLabel={'Total number of Covid19 cases'}
      />

      <CovidLineChart
        tooltipLabel={'Cases'}
        graphLabel={'New cases'}
        dataPoints={newCases.current}
        legendContainerId={'new-cases'}
        borderColor={borderColors.success}
        backgroundColor={bgColors.success}
        spinner={gettingCountryCases}
        legendLabel={'New cases of Covid19'}
        yAxisLabel={'Number of new Covid19 cases'}
      />

      <CovidLineChart
        tooltipLabel={'Deaths'}
        graphLabel={'Total deaths'}
        dataPoints={totalDeaths.current}
        borderColor={borderColors.danger}
        backgroundColor={bgColors.danger}
        legendContainerId={'total-deaths'}
        spinner={gettingCountryCases}
        legendLabel={'Total deaths from Covid19'}
        yAxisLabel={'Total number of Covid19 deaths'}
      />

      <CovidLineChart
        tooltipLabel={'Deaths'}
        graphLabel={'New deaths'}
        dataPoints={newDeaths.current}
        borderColor={borderColors.info}
        backgroundColor={bgColors.info}
        legendContainerId={'new-deaths'}
        spinner={gettingCountryCases}
        legendLabel={'New deaths from Covid19'}
        yAxisLabel={'Number of new Covid19 deaths'}
      />
    </Container>
  );
};

export default Country;
