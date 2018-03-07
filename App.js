//@flow

import "babel-polyfill";

import { Provider } from "react-redux";
import Navigator from "./src/components/navigation/Navigator";
import React from "react";
import { PersistGate } from "redux-persist/es/integration/react";
import createStore from "./src/configs/Store";
import { StatusBar, Dimensions } from "react-native";
import { setOrientation } from "./src/actions/orientation";

const { store, persistor } = createStore();

type Props = {};

export default class ThingerioApp extends React.Component<Props> {
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
