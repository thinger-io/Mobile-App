import { AppRegistry, LogBox } from 'react-native';
import App from './src/App.tsx';

LogBox.ignoreAllLogs();
AppRegistry.registerComponent('thingerio', () => App);
