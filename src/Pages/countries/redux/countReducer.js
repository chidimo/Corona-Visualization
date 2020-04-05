import { countAT } from './countAT';

const mostRecentCase = {
  _id: '',
  new_cases: 0,
  new_deaths: 0,
  total_cases: 0,
  total_deaths: 0,
};

const initialState = {
  countries: [],
  gettingCountries: true,

  activeCountryCases: [],
  gettingActiveCountryCases: true,

  mostRecentCase,
  gettingMostRecentCase: true,

  gettingCasesByCountryName: true,

  allCountriesCases: [],
};

export const cont = (state = initialState, action) => {
  switch (action.type) {
  case countAT.GET_COUNTRIES:
    return { ...state, countries: action.countries };
  case countAT.GETTING_COUNTRIES:
    return { ...state, gettingCountries: action.true_or_false };

  case countAT.GET_ACTIVE_COUNTRY_CASES:
    return { ...state, activeCountryCases: action.cases };
  case countAT.GETTING_ACTIVE_COUNTRY_CASES:
    return { ...state, gettingActiveCountryCases: action.true_or_false };
  case countAT.CLEAN_ACTIVE_COUNTRY_CASES:
    return { ...state, activeCountryCases: [] };

  case countAT.GETTING_CASES_BY_COUNTRY_NAME:
    return { ...state, gettingCasesByCountryName: action.true_or_false };
  case countAT.GET_CASES_BY_COUNTRY_NAME:
    return { ...state, activeCountryCases: action.cases };

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
