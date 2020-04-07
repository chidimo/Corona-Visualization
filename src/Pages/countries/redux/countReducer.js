import { countAT } from './countAT';

const mostRecentCase = {
  _id: '',
  new_cases: 0,
  new_deaths: 0,
  total_cases: 0,
  total_deaths: 0,
};

const firstCase = {
  _id: '',
  new_cases: 0,
  new_deaths: 0,
  total_cases: 0,
  total_deaths: 0,
};

const firstDeath = {
  _id: '',
  new_cases: 0,
  new_deaths: 0,
  total_cases: 0,
  total_deaths: 0,
};

const initialState = {
  activeCountry: { _id: '' },
  gettingCountry: true,

  countries: [],
  gettingCountries: true,

  activeCountryCases: [],
  gettingActiveCountryCases: true,

  mostRecentCase,
  gettingMostRecentCase: true,

  firstCase,
  gettingFirstCase: true,

  firstDeath,
  gettingFirstDeath: true,

  gettingCasesByCountryName: true,

  allCountriesCases: [],
  gettingCountryInView: true,

  casesForDay: [],
  gettingCasesForDay: true,
};

export const cont = (state = initialState, action) => {
  switch (action.type) {
  case countAT.GET_COUNTRY_BY_ID:
    return {
      ...state,
      activeCountry:
          action.country.length > 0 ? action.country[0] : state.activeCountry,
    };
  case countAT.GETTING_COUNTRY_BY_ID:
    return { ...state, gettingCountry: action.true_or_false };
  case countAT.CLEAN_GET_COUNTRY_BY_ID:
    return { ...state, activeCountry: { _id: '' } };

  case countAT.GET_COUNTRY_BY_NAME:
    return {
      ...state,
      activeCountry:
          action.country.length > 0 ? action.country[0] : state.activeCountry,
    };
  case countAT.GETTING_COUNTRY_BY_NAME:
    return { ...state, gettingCountry: action.true_or_false };

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

  case countAT.CLEAN_FIRST_CASE:
    return { ...state, firstCase };
  case countAT.GET_FIRST_CASE:
    return {
      ...state,
      firstCase:
          action.result.length > 0 ? action.result[0] : state.firstCase,
    };
  case countAT.GETTING_FIRST_CASE:
    return { ...state, gettingFirstCase: action.true_or_false };

  case countAT.CLEAN_FIRST_DEATH:
    return { ...state, firstDeath };
  case countAT.GET_FIRST_DEATH:
    return {
      ...state,
      firstDeath:
          action.result.length > 0 ? action.result[0] : state.firstDeath,
    };
  case countAT.GETTING_FIRST_DEATH:
    return { ...state, gettingFirstDeath: action.true_or_false };

  case countAT.GET_COUNTRY_IN_VIEW_CASE:
    return { ...state, [action.name]: action.cases };
  case countAT.GETTING_COUNTRY_IN_VIEW_CASE:
    return { ...state, gettingCountryInView: action.true_or_false };

  case countAT.GET_CASES_FOR_A_DAY:
    return { ...state, casesForDay: action.cases, metadata: action.metadata };
  case countAT.GETTING_CASES_FOR_A_DAY:
    return { ...state, gettingCasesForDay: action.true_or_false };
  case countAT.CLEAN_GET_CASES_FOR_DAY:
    return { ...state, casesForDay: [] };
  default:
    return state;
  }
};
