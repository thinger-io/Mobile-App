/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */

import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./configs/Store";
import { PersistGate } from "redux-persist/es/integration/react";
import Navigator from "./components/navigation/Navigator";

const { store, persistor } = configureStore();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
