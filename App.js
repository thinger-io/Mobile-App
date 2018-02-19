import "babel-polyfill";

import { Provider } from "react-redux";
import Navigator from "./src/components/navigators/Navigator";
import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import createStore from "./src/configs/Store";
import {StatusBar} from "react-native";

const { store, persistor } = createStore();

const ThingerioApp = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StatusBar barStyle="light-content"/>
      <Navigator />
    </PersistGate>
  </Provider>
);

export default ThingerioApp;
