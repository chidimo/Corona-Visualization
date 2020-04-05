import axios from 'axios';

import { countAT } from './countAT';

export const getMostRecentCase = (key, urlType) => async (dispatch) => {
  dispatch({ type: countAT.GETTING_MOST_RECENT_CASE, true_or_false: true });
  const url =
    urlType === 'name'
      ? `/most-recent-case-by-name?countryName=${key}`
      : `/most-recent-case-by-id?country=${key}`;
  try {
    const { data } = await axios.get(url);
    const { result } = data;

    dispatch({ type: countAT.GET_MOST_RECENT_CASE, result });
    dispatch({ type: countAT.GETTING_MOST_RECENT_CASE, true_or_false: false });
    return { success: true };
  } catch (e) {
    const { response } = e;
    const data = response && response.data;
    dispatch({ type: countAT.GETTING_MOST_RECENT_CASE, true_or_false: false });
    return data;
  }
};

export const cleanMostRecentCase = () => async (dispatch) => {
  dispatch({ type: countAT.CLEAN_ACTIVE_COUNTRY_CASES });
};

export const getCountries = () => async (dispatch) => {
  dispatch({ type: countAT.GETTING_COUNTRIES, true_or_false: true });
  try {
    const { data } = await axios.get('/all-countries');
    const { metadata, results } = data;

    dispatch({ type: countAT.GET_COUNTRIES, countries: results, metadata });
    dispatch({ type: countAT.GETTING_COUNTRIES, true_or_false: false });
    return { success: true };
  } catch (e) {
    const { response } = e;
    const data = response && response.data;
    dispatch({ type: countAT.GETTING_COUNTRIES, true_or_false: false });
    return data;
  }
};

export const getActiveCountryCases = (info) => async (dispatch) => {
  const { _id, fromDate, toDate } = info;
  dispatch({ type: countAT.GETTING_ACTIVE_COUNTRY_CASES, true_or_false: true });
  try {
    const { data } = await axios.get(
      `/cases?country=${_id}&fromDate=${fromDate}&toDate=${toDate}&skip=0&limit=100`
    );
    const { metadata, results } = data;
    dispatch({
      type: countAT.GET_ACTIVE_COUNTRY_CASES,
      cases: results,
      metadata,
    });
    dispatch({ type: countAT.GETTING_ACTIVE_COUNTRY_CASES, true_or_false: false });
    return { success: true };
  } catch (e) {
    const { response } = e;
    const data = response && response.data;
    dispatch({ type: countAT.GETTING_ACTIVE_COUNTRY_CASES, true_or_false: false });
    return data;
  }
};

export const cleanActiveCountryCases = () => async (dispatch) => {
  dispatch({ type: countAT.CLEAN_ACTIVE_COUNTRY_CASES });
};

export const getCasesByCountryName = (info) => async (dispatch) => {
  const { countryName, fromDate, toDate } = info;
  dispatch({
    type: countAT.GETTING_CASES_BY_COUNTRY_NAME,
    true_or_false: true,
  });
  try {
    const { data } = await axios.get(
      `/cases?countryName=${countryName}&fromDate=${fromDate}&toDate=${toDate}&skip=0&limit=100`
    );
    const { metadata, results } = data;
    dispatch({
      type: countAT.GET_CASES_BY_COUNTRY_NAME,
      cases: results,
      metadata,
    });
    dispatch({
      type: countAT.GETTING_CASES_BY_COUNTRY_NAME,
      true_or_false: false,
    });
    return { success: true };
  } catch (e) {
    const { response } = e;
    const data = response && response.data;
    dispatch({
      type: countAT.GETTING_CASES_BY_COUNTRY_NAME,
      true_or_false: false,
    });
    return data;
  }
};
