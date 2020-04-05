import { countAT } from './countAT';

const initialState = {
  countries: [],
  gettingCountries: true,

  countryCases: [],
  gettingCountryCases: true,

  mostRecentCase: { _id: '' },
  gettingMostRecentCase: true,

  gettingCasesByCountryName: true,
};

export const cont = (state = initialState, action) => {
  switch (action.type) {
  case countAT.GET_COUNTRIES:
    return { ...state, countries: action.countries };
  case countAT.GETTING_COUNTRIES:
    return { ...state, gettingCountries: action.true_or_false };

  case countAT.GET_COUNTRY_CASES:
    return { ...state, countryCases: action.cases };
  case countAT.GETTING_COUNTRY_CASES:
    return { ...state, gettingCountryCases: action.true_or_false };
  case countAT.CLEAN_GET_COUNTRY_CASES:
    return { ...state, countryCases: [] };

  case countAT.GETTING_CASES_BY_COUNTRY_NAME:
    return { ...state, gettingCasesByCountryName: action.true_or_false };
  case countAT.GET_CASES_BY_COUNTRY_NAME:
    return { ...state, countryCases: action.cases };

  case countAT.GET_MOST_RECENT_CASE:
    return { ...state, mostRecentCase: action.result && action.result[0] };
  case countAT.GETTING_MOST_RECENT_CASE:
    return { ...state, gettingMostRecentCase: action.true_or_false };
  default:
    return state;
  }
};
