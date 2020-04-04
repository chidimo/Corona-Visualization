import axios from 'axios';

import { countAT } from './countAT';

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

export const getCountryCases = (_id) => async (dispatch) => {
  dispatch({ type: countAT.GETTING_COUNTRY_CASES, true_or_false: true });
  try {
    const { data } = await axios.get(`/cases?country=${_id}&skip=0&limit=100`);
    const { metadata, results } = data;
    dispatch({ type: countAT.GET_COUNTRY_CASES, cases: results, metadata });
    dispatch({ type: countAT.GETTING_COUNTRY_CASES, true_or_false: false });
    return { success: true };
  } catch (e) {
    const { response } = e;
    const data = response && response.data;
    dispatch({ type: countAT.GETTING_COUNTRY_CASES, true_or_false: false });
    return data;
  }
};

export const getCasesByCountryName = (name) => async (dispatch) => {
  dispatch({
    type: countAT.GETTING_CASES_BY_COUNTRY_NAME,
    true_or_false: true,
  });
  try {
    const { data } = await axios.get(
      `/cases?countryName=${name}&skip=0&limit=100`
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
