import { countAT } from './countAT';

const initialState = {
  countries: [],
  gettingCountries: true,

  countryCases: [],
  gettingCountryCases: true,
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
  default:
    return state;
  }
};
