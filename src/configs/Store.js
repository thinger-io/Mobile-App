import storage from "redux-persist/es/storage";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/reducers";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";
import { createReactNavigationReduxMiddleware } from "react-navigation-redux-helpers";

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
  const reducer = persistCombineReducers(config, rootReducer);
  const middleware = [thunkMiddleware, navMiddleware];
  const store = createStore(reducer, applyMiddleware(...middleware));
  const persistor = persistStore(store);

  // For purge the Store
  // persistor.purge();

  return { store, persistor };
}

export default configureStore;
