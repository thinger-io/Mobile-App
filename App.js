import "babel-polyfill";

import { Provider } from "react-redux";
import Navigator from "./src/components/navigators/Navigator";
import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import createStore from "./src/configs/Store";

const { store, persistor } = createStore();

const ThingerioApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Navigator />
    </PersistGate>
  </Provider>
);

export default ThingerioApp;
