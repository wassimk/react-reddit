import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

export function configureStore(initialState) {
  let enhancer;
  const middleware = applyMiddleware(thunk);

  if (process.env.NODE_ENV !== 'production') {
    let getDebugSessionKey = function() {
      const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
      return matches && matches.length ? matches[1] : null;
    };

    enhancer = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : require('./DevTools').default.instrument(),
      persistState(getDebugSessionKey())
    );
  } else {
    enhancer = compose(middleware);
  }

  const store = createStore(rootReducer, initialState, enhancer);

  return store;
}
