/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */
import React, { Component } from 'react';
import Reactotron from 'reactotron-react-native';
import { StatusBar, Dimensions, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Toast } from 'react-native-redux-toast';
import configureStore from './config/store';
import AppWithNavigation from './components/navigation/Navigator';
import { setOrientation } from './actions/orientation';
import { DARK_BLUE } from './constants/ThingerColors';
import './config/reactotron';
import Config from './config';

const { store, persistor } = configureStore();

type Props = {};
class App extends Component<Props> {
  onChangeOrientation = (event: any) => {
    const { width, height } = event.window;
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
    if (store.orientation !== orientation) store.dispatch(setOrientation(orientation));
  };

  render() {
    this.onChangeOrientation({ window: Dimensions.get('window') });
    Dimensions.addEventListener('change', this.onChangeOrientation);

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" />
          <AppWithNavigation persistenceKey="NavigationState" />
          <Toast messageStyle={{ color: 'white' }} />
        </PersistGate>
      </Provider>
    );
  }
}

const exportedApp = Config.useReactotron ? Reactotron.overlay(App) : App;
export default exportedApp;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: DARK_BLUE,
  },
});
