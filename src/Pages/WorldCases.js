import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import {
  getCasesByCountryName,
  cleanGetCountryCases,
} from './countries/redux/countActions';

import { bgColors, borderColors } from './colors';

import { CountryPageTitle } from './countries/CountryPageTitle';
import CovidLineChart from './countries/CovidLineChart';

import { DatePicker } from './DatePicker';

import { useDatePicker } from './countries/useCustomHooks';

const WorldCases = () => {
  const dispatch = useDispatch();

  const { countryCases, gettingCasesByCountryName } = useSelector(
    (state) => state.cont
  );

  const [ data, dataDispatch ] = useDatePicker();

  const newCases = useRef([]);
  const newDeaths = useRef([]);
  const totalCases = useRef([]);
  const totalDeaths = useRef([]);

  useEffect(() => {
    getCasesByCountryName({
      countryName: 'World',
      fromDate: data.fromDate,
      toDate: data.toDate,
    })(dispatch);
    return () => {
      newCases.current = [];
      newDeaths.current = [];
      totalCases.current = [];
      totalDeaths.current = [];
      cleanGetCountryCases()(dispatch);
    };
  }, [ data, dispatch ]);

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
      <CountryPageTitle name={'World'} short_name={''} />
      <DatePicker data={data} dispatch={dataDispatch} />

      <CovidLineChart
        tooltipLabel={'Cases'}
        graphLabel={'Total cases'}
        dataPoints={totalCases.current}
        legendContainerId={'total-cases'}
        borderColor={borderColors.warning}
        backgroundColor={bgColors.warning}
        spinner={gettingCasesByCountryName}
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
        spinner={gettingCasesByCountryName}
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
        spinner={gettingCasesByCountryName}
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
        spinner={gettingCasesByCountryName}
        legendLabel={'New deaths from Covid19'}
        yAxisLabel={'Number of new Covid19 deaths'}
      />
    </Container>
  );
};

export default WorldCases;
