import storage from "redux-persist/es/storage";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";
import devices from "../reducers/devices";
import selectedDevice from "../reducers/selectedDevice";
import resources from "../reducers/resources";
import selectedResource from "../reducers/selectedResource";
import selectedAttributes from "../reducers/selectedAttributes";
import lockedAttributes from "../reducers/lockedAttributes";
import orientation from "../reducers/orientation";
import nav from "../reducers/nav";
import streaming from "../reducers/streaming";
import screenTracking from "../middlewares/screenTracking";

const config = {
  key: "root",
  storage,
  whitelist: ["devices"]
};

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

function configureStore() {
  const reducer = persistCombineReducers(config, {
    devices,
    selectedDevice,
    resources,
    selectedResource,
    selectedAttributes,
    lockedAttributes,
    streaming,
    orientation,
    nav
  });
  const middleware = [thunkMiddleware, navMiddleware, screenTracking];
  const store = createStore(reducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  // For purge the Store
  // persistor.purge();

  return { store, persistor };
}

export default configureStore;
