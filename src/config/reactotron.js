/* eslint-disable no-console */
import Reactotron, { asyncStorage } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import apisaucePlugin from 'reactotron-apisauce';
import sagaPlugin from 'reactotron-redux-saga';

import Config from '.';

Reactotron.configure({
  name: 'Thinger.io',
  host: '192.168.31.161',
})
  .useReactNative()
  .use(asyncStorage())
  .use(apisaucePlugin())
  .use(reactotronRedux())
  .use(sagaPlugin());

if (Config.useReactotron) {
  Reactotron.connect().clear();
  console.tron = Reactotron;
} else {
  console.tron = console.log;
}
