/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */

import React, { Component } from "react";
import { StatusBar, Dimensions } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./configs/Store";
import { PersistGate } from "redux-persist/es/integration/react";
import Navigator from "./components/navigation/Navigator";
import {setOrientation} from "./actions/orientation";

const { store, persistor } = configureStore();

type Props = {};
export default class App extends Component<Props> {

  onChangeOrientation = (event: any) => {
    const { width, height } = event.window;
    const orientation = width > height ? "LANDSCAPE" : "PORTRAIT";
    if (store.orientation !== orientation)
      store.dispatch(setOrientation(orientation));
    };

  render() {
    this.onChangeOrientation({ window: Dimensions.get("window") });
    Dimensions.addEventListener("change", this.onChangeOrientation);

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
