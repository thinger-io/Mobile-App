import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../store/rootSaga';
import { reducer as devices } from '../store/devices';
import { reducer as resources } from '../store/resources';
import { reducer as auth } from '../store/auth';
import { reducer as orientation } from '../store/orientation';

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['devices', 'auth', 'resources'],
};

function configureStore() {
  const reducer = persistCombineReducers(config, {
    auth,
    devices,
    orientation,
    resources,
  });

  // Saga middleware
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [thunkMiddleware, sagaMiddleware];

  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));

  // Kick off root saga
  store.sagaTask = sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  // For purge the Store
  // persistor.purge();

  return { store, persistor };
}

export default configureStore;
