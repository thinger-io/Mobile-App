/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 */
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import configureStore from './config/store';
import RootStack from './components/navigation/RootStack';
import { OrientationActions } from './store/orientation';
import { AppState } from './store/types';
import AppStatusBar from './components/AppStatusBar';
import { DARK_BLUE } from './constants/ThingerColors';

const _XHR = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
XMLHttpRequest = _XHR;

const { store, persistor } = configureStore();

const App = () => {
  const onChangeOrientation = (event: any) => {
    const { width, height } = event.window;
    const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
    if ((store.getState() as AppState).orientation !== orientation) {
      store.dispatch(OrientationActions.set({ orientation }));
    }
  };

  useEffect(() => {
    onChangeOrientation({ window: Dimensions.get('window') });
    Dimensions.addEventListener('change', onChangeOrientation);

    () => {
      Dimensions.removeEventListener('change', onChangeOrientation);
    };
  }, []);

  const [routeName, setRouteName] = useState<string>();
  const navigationRef = useRef<NavigationContainerRef>(null);

  const handleNavigationReady = useCallback(() => {
    setRouteName(navigationRef.current?.getCurrentRoute()?.name);
  }, [navigationRef]);

  const handleNavigationStateChange = useCallback(() => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
    if (currentRouteName && routeName !== currentRouteName) {
      // TODO: log event route change: currentRouteName
      // https://rnfirebase.io/analytics/usage
    }

    setRouteName(currentRouteName);
  }, [routeName, navigationRef]);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppStatusBar backgroundColor={DARK_BLUE} barStyle="light-content" />
        <NavigationContainer
          ref={navigationRef}
          onReady={handleNavigationReady}
          onStateChange={handleNavigationStateChange}
        >
          <RootStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
