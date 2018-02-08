import storage from "redux-persist/es/storage";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/reducers";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistCombineReducers } from "redux-persist";

const config = {
  key: "root",
  storage,
  whitelist: ["devices"]
};

function configureStore() {
  const reducer = persistCombineReducers(config, rootReducer);
  const store = createStore(reducer, applyMiddleware(thunkMiddleware));
  const persistor = persistStore(store);

  // For purge the Store
  // persistor.purge();

  return { store, persistor };
}

export default configureStore;
