import { useReducer, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { datesRed } from './countries/reducers';
import { bgColors, borderColors } from '../colors';
import { ISOStringWithDashFull, localeFromTSMonthShort } from '../dateUtils';

import {
  getActiveCountryCases,
  cleanActiveCountryCases,
} from './countries/redux/countActions';

export const useDatePicker = () => {
  const initState = {
    toDate: ISOStringWithDashFull(new Date()),
    fromDate: ISOStringWithDashFull(new Date('2019-12-01')),
  };

  return useReducer(datesRed, initState);
};

export const useCreateDataset = (data, _id) => {
  const dispatch = useDispatch();

  const newCases = useRef([]);
  const newDeaths = useRef([]);
  const totalCases = useRef([]);
  const totalDeaths = useRef([]);

  const { activeCountryCases } = useSelector((state) => state.cont);

  useEffect(() => {
    if (_id) {
      getActiveCountryCases({
        _id,
        toDate: data.toDate,
        fromDate: data.fromDate,
      })(dispatch);
    }
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
        recordDate,
        new_cases,
        new_deaths,
        total_cases,
        total_deaths,
      } = c;
      newCases.current.push({ new_cases, recordDate });
      newDeaths.current.push({ new_deaths, recordDate });
      totalCases.current.push({ total_cases, recordDate });
      totalDeaths.current.push({ total_deaths, recordDate });
    });
  }, [ activeCountryCases ]);

  const totalCasesXAxis = totalCases.current.map((e) =>
    localeFromTSMonthShort(e.recordDate)
  );
  const newCasesXAxis = newCases.current.map((e) =>
    localeFromTSMonthShort(e.recordDate)
  );
  const totalDeathsXAxis = totalDeaths.current.map((e) =>
    localeFromTSMonthShort(e.recordDate)
  );
  const newDeathsXAxis = newDeaths.current.map((e) =>
    localeFromTSMonthShort(e.recordDate)
  );

  const totalCasesData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    pointHitRadius: 15,
    label: 'Total cases',
    borderColor: borderColors.warning,
    backgroundColor: bgColors.warning,
    data: totalCases.current.map((e) => window.Number(e['total_cases'])),
  };

  const newCasesData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    pointHitRadius: 15,
    label: 'New cases',
    borderColor: borderColors.success,
    backgroundColor: bgColors.success,
    data: newCases.current.map((e) => window.Number(e['new_cases'])),
  };

  const totalDeathsData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    pointHitRadius: 15,
    label: 'Total deaths',
    borderColor: borderColors.danger,
    backgroundColor: bgColors.danger,
    data: totalDeaths.current.map((e) => window.Number(e['total_deaths'])),
  };

  const newDeathsData = {
    fill: true,
    lineTension: 0,
    pointRadius: 0,
    pointHitRadius: 15,
    label: 'New deaths',
    borderColor: borderColors.primary,
    backgroundColor: bgColors.primary,
    data: newDeaths.current.map((e) => window.Number(e['new_deaths'])),
  };

  return [
    { newCasesData, newCasesXAxis, newCasesFC: newCasesData.borderColor },
    { newDeathsData, newDeathsXAxis, newDeathsFC: newDeathsData.borderColor },
    {
      totalCasesData,
      totalCasesXAxis,
      totalCasesFC: totalCasesData.borderColor,
    },
    {
      totalDeathsData,
      totalDeathsXAxis,
      totalDeathsFC: totalDeathsData.borderColor,
    },
  ];
};
