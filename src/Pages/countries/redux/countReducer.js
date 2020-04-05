import { countAT } from './countAT';

const mostRecentCase = {
  _id: '',
  new_cases: 0,
  total_cases: 0,
  new_deaths: 0,
  total_deaths: 0,
};

const initialState = {
  countries: [],
  gettingCountries: true,

  countryCases: [],
  gettingCountryCases: true,

  mostRecentCase,
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

  case countAT.CLEAN_MOST_RECENT_CASE:
    return { ...state, mostRecentCase };
  case countAT.GET_MOST_RECENT_CASE:
    return {
      ...state,
      mostRecentCase:
          action.result.length > 0 ? action.result[0] : state.mostRecentCase,
    };
  case countAT.GETTING_MOST_RECENT_CASE:
    return { ...state, gettingMostRecentCase: action.true_or_false };
  default:
    return state;
  }
};
