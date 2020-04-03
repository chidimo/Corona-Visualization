import { loadingBarReducer } from 'react-redux-loading-bar';

// import ORG from './orgReducer';

export default (state = {}, action) => {
  if (action.type === 'LOGOUT_USER') {
    state = {};
  }

  return {
    // ORG: ORG(state.ORG, action, state),

    loadingBar: loadingBarReducer(state.loadingBar, action, state),
  };
};
