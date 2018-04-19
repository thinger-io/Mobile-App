import storage from "redux-persist/es/storage";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import devices from "../reducers/devices";
import selectedDevice from "../reducers/selectedDevice";
import resources from "../reducers/resources";
import selectedResource from "../reducers/selectedResource";
import selectedAttributes from "../reducers/selectedAttributes";
import lockedAttributes from "../reducers/lockedAttributes";
import streaming from "../reducers/streaming";
import orientation from "../reducers/orientation";
import nav from "../reducers/nav";
import screenTracking from "../middlewares/screenTracking";
import login from "../reducers/login";
import userDevices from "../reducers/userDevices";
import { toastReducer as toast } from "react-native-redux-toast";
import vibrate from "../middlewares/vibrate";

const config = {
  key: "root",
  storage,
  whitelist: ["devices", "login"]
};

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

function configureStore() {
  const reducer = persistCombineReducers(config, {
    login,
    devices,
    userDevices,
    selectedDevice,
    resources,
    selectedResource,
    selectedAttributes,
    lockedAttributes,
    streaming,
    orientation,
    toast,
    nav
  });
  const middleware = [thunkMiddleware, navMiddleware, screenTracking, vibrate];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(...middleware))
  );
  const persistor = persistStore(store);

  // For purge the Store
  // persistor.purge();

  return { store, persistor };
}

export default configureStore;
