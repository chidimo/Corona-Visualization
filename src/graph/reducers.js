export const assessRed = (state, action) => {
  switch (action.type) {
  case 'SET_FROM_DATE':
    return { ...state, fromDate: action.fromDate };
  case 'SET_TO_DATE':
    return { ...state, toDate: action.toDate };
  case 'SET_FOCUSED_INPUT':
    return { ...state, focusedInput: action.focusedInput };
  default:
    return state;
  }
};
