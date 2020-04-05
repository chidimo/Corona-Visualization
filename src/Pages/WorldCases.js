import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';

import {
  getCasesByCountryName,
  cleanActiveCountryCases,
} from './countries/redux/countActions';

import { bgColors, borderColors } from './colors';

import { CountryPageTitle } from './countries/CountryPageTitle';
import LineChartWrapper from './countries/LineChartWrapper';

import { DatePicker } from './DatePicker';

import { useDatePicker } from './countries/useCustomHooks';

const WorldCases = () => {
  const dispatch = useDispatch();

  const { activeCountryCases, gettingCasesByCountryName } = useSelector(
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
      cleanActiveCountryCases()(dispatch);
    };
  }, [ data, dispatch ]);

  useEffect(() => {
    activeCountryCases.forEach((c) => {
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
  }, [ activeCountryCases ]);

  const totalCasesData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    label: 'Total cases',
    borderColor: borderColors.warning,
    backgroundColor: bgColors.warning,
    data: totalCases.current.map((e) => window.Number(e['qut'])),
  };

  const newCasesData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    label: 'New cases',
    borderColor: borderColors.success,
    backgroundColor: bgColors.success,
    data: newCases.current.map((e) => window.Number(e['qut'])),
  };

  const totalDeathsData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    label: 'Total deaths',
    borderColor: borderColors.danger,
    backgroundColor: bgColors.danger,
    data: totalDeaths.current.map((e) => window.Number(e['qut'])),
  };

  const newDeathsData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    label: 'New deaths',
    borderColor: borderColors.info,
    backgroundColor: bgColors.info,
    data: newDeaths.current.map((e) => window.Number(e['qut'])),
  };

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={'World'} short_name={''} />
      <DatePicker data={data} dispatch={dataDispatch} />

      <LineChartWrapper
        dataSets={[ totalCasesData ]}
        tooltipLabel={'Cases'}
        graphLabel={'Total cases'}
        dataPoints={totalCases.current}
        legendContainerId={'total-cases'}
        borderColor={borderColors.warning}
        spinner={gettingCasesByCountryName}
        legendLabel={'Total cases of Covid19'}
        yAxisLabel={'Total number of Covid19 cases'}
      />

      <LineChartWrapper
        dataSets={[ newCasesData ]}
        tooltipLabel={'Cases'}
        graphLabel={'New cases'}
        dataPoints={newCases.current}
        legendContainerId={'new-cases'}
        borderColor={borderColors.success}
        spinner={gettingCasesByCountryName}
        legendLabel={'New cases of Covid19'}
        yAxisLabel={'Number of new Covid19 cases'}
      />

      <LineChartWrapper
        dataSets={[ totalDeathsData ]}
        tooltipLabel={'Deaths'}
        graphLabel={'Total deaths'}
        dataPoints={totalDeaths.current}
        borderColor={borderColors.danger}
        legendContainerId={'total-deaths'}
        spinner={gettingCasesByCountryName}
        legendLabel={'Total deaths from Covid19'}
        yAxisLabel={'Total number of Covid19 deaths'}
      />

      <LineChartWrapper
        dataSets={[ newDeathsData ]}
        tooltipLabel={'Deaths'}
        graphLabel={'New deaths'}
        dataPoints={newDeaths.current}
        borderColor={borderColors.info}
        legendContainerId={'new-deaths'}
        spinner={gettingCasesByCountryName}
        legendLabel={'New deaths from Covid19'}
        yAxisLabel={'Number of new Covid19 deaths'}
      />
    </Container>
  );
};

export default WorldCases;
