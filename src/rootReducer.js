import { loadingBarReducer } from 'react-redux-loading-bar';

import { cont } from './Pages/countries/redux/countReducer';

export default (state = {}, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = {};
  }

  return {
    cont: cont(state.cont, action, state),
    loadingBar: loadingBarReducer(state.loadingBar, action, state),
  };
};
