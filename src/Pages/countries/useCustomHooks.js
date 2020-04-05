import { useReducer } from 'react';

import { ISOStringWithDashFull } from '../../dateUtils';

import { datesRed } from './reducers';

export const useDatePicker = () => {

  const initState = {
    toDate: ISOStringWithDashFull(new Date()),
    fromDate: ISOStringWithDashFull(new Date('2019-12-01')),
  };

  return useReducer(datesRed, initState);
};
