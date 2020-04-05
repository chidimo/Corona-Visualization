import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import { bgColors, borderColors } from '../colors';

import {
  getActiveCountryCases,
  cleanActiveCountryCases,
} from './redux/countActions';

import { DatePicker } from '../DatePicker';
import LineChartWrapper from './LineChartWrapper';
import { useDatePicker } from './useCustomHooks';
import { CountryPageTitle } from './CountryPageTitle';

const CountryChartsMulti = (props) => {
  const dispatch = useDispatch();

  const { _id, name, short_name } = props;

  const { activeCountryCases, gettingActiveCountryCases } = useSelector(
    (state) => state.cont
  );

  const [ data, dataDispatch ] = useDatePicker();

  const newCases = useRef([]);
  const newDeaths = useRef([]);
  const totalCases = useRef([]);
  const totalDeaths = useRef([]);

  // clear state
  useEffect(() => {
    getActiveCountryCases({
      _id,
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
  }, [ _id, data, dispatch ]);

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

  return (
    <Container className="country-graph-page">
      <CountryPageTitle name={name} short_name={short_name} />
      <DatePicker data={data} dispatch={dataDispatch} />

      <LineChartWrapper
        tooltipLabel={'Cases'}
        graphLabel={'Total cases'}
        dataPoints={totalCases.current}
        legendContainerId={'total-cases'}
        borderColor={borderColors.warning}
        backgroundColor={bgColors.warning}
        spinner={gettingActiveCountryCases}
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
