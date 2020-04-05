import { ISOStringWithDashFull } from '../../dateUtils';

export const datesRed = (state, action) => {
  switch (action.type) {
  case 'SET_FROM_DATE':
    return { ...state, fromDate: ISOStringWithDashFull(action.fromDate) };
  case 'SET_TO_DATE':
    return { ...state, toDate: ISOStringWithDashFull(action.toDate) };
  default:
    return state;
  }
};
