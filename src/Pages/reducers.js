export const filterCountRed = (state, action) => {
  switch (action.type) {
  case 'POPULATE_COUNTRIES':
    return { ...state, displayCountries: action.displayCountries };
  case 'FILTER_COUNTRIES':
    return {
      ...state,
      displayCountries: action.displayCountries,
    };
  default:
    return state;
  }
};
