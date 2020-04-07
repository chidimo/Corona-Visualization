import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import { bgColors, borderColors } from '../../colors';

import {
  getCountryInViewCases,
  cleanActiveCountryCases,
} from './redux/countActions';

import { DatePicker } from '../DatePicker';
import LineChartWrapper from '../LineChartWrapper';
import { useDatePicker } from '../useCustomHooks';
import { CountryPageTitle } from './CountryPageTitle';

const CountryChartsMulti = (props) => {
  const dispatch = useDispatch();

  const { _id, name, short_name } = props;

  const { [name]: inViewCountryCases, gettingCountryInView } = useSelector(
    (state) => state.cont
  );

  const [ data, dataDispatch ] = useDatePicker();

  const newCases = useRef([]);
  const newDeaths = useRef([]);
  const totalCases = useRef([]);
  const totalDeaths = useRef([]);

  // clear state
  useEffect(() => {
    getCountryInViewCases({
      _id,
      name,
      toDate: data.toDate,
      fromDate: data.fromDate,
    })(dispatch);
    return () => {
      newCases.current = [];
      newDeaths.current = [];
      totalCases.current = [];
      totalDeaths.current = [];
      cleanActiveCountryCases()(dispatch);
    };
  }, [ _id, name, data, dispatch ]);

  useEffect(() => {
    if (inViewCountryCases?.length > 0) {
      inViewCountryCases.forEach((c) => {
        const {
          recordDate,
          new_cases,
          new_deaths,
          total_cases,
          total_deaths,
        } = c;
        newCases.current.push({ qut: new_cases, recordDate });
        newDeaths.current.push({ qut: new_deaths, recordDate });
        totalCases.current.push({ qut: total_cases, recordDate });
        totalDeaths.current.push({ qut: total_deaths, recordDate });
      });
    }
  }, [ inViewCountryCases ]);

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
      <CountryPageTitle name={name} short_name={short_name} />
      <DatePicker data={data} dispatch={dataDispatch} />

      <LineChartWrapper
        dataSets={[
          totalCasesData,
          newCasesData,
          totalDeathsData,
          newDeathsData,
        ]}
        tooltipLabel={'Cases'}
        graphLabel={'Combined charts'}
        dataPoints={totalCases.current}
        legendContainerId={'total-cases'}
        borderColor={borderColors.warning}
        spinner={gettingCountryInView}
        legendLabel={'Total cases of Covid19'}
        yAxisLabel={'Total number of Covid19 cases'}
      />
    </Container>
  );
};

CountryChartsMulti.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  short_name: PropTypes.string,
};

export default CountryChartsMulti;
