/* eslint-disable no-console */
import storage from 'redux-persist/es/storage';
import Reactotron from 'reactotron-react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { toastReducer as toast } from 'react-native-redux-toast';
import createSagaMiddleware from 'redux-saga';
import Config from '.';
import rootSaga from '../store/sagas';
import { reducer as devices } from '../store/redux/devices';
import { reducer as resources } from '../store/redux/resources';
import selectedDevice from '../reducers/selectedDevice';
import selectedResource from '../reducers/selectedResource';
import selectedAttributes from '../reducers/selectedAttributes';
import lockedAttributes from '../reducers/lockedAttributes';
import streaming from '../reducers/streaming';
import orientation from '../reducers/orientation';
// import screenTracking from '../middlewares/screenTracking';
import login from '../reducers/login';
import userDevices from '../reducers/userDevices';
import vibrate from '../middlewares/vibrate';

const config = {
  key: 'root',
  storage,
  whitelist: ['devices', 'login'],
};

function configureStore() {
  const reducer = persistCombineReducers(config, {
    devices,
    lockedAttributes,
    login,
    orientation,
    resources,
    selectedAttributes,
    selectedDevice,
    selectedResource,
    streaming,
    toast,
    userDevices,
  });

  // Saga middleware
  const sagaMonitor = Config.useReactotron ? Reactotron.createSagaMonitor() : null;
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

  const middleware = [thunkMiddleware, vibrate, sagaMiddleware];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // If Reactotron is enabled (default for dev), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? Reactotron.createStore : createStore;
  const store = createAppropriateStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

  // Kick off root saga
  store.sagaTask = sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  // For purge the Store
  // persistor.purge();

  return { store, persistor };
}

export default configureStore;
