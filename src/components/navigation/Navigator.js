// @flow

import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Devices from '../screens/Devices';
import QRScanner from '../screens/QRScanner';
import Resources from '../screens/Resources';
import DeviceInfo from '../screens/DeviceInfo';
import Chart from '../screens/Chart';
import ShowQR from '../screens/ShowQR';
import UserDevices from '../screens/User';
import UserSettings from '../screens/UserSettings';
import {
  DARK_BLUE,
  COLOR_TAB_BAR_ACTIVE,
  COLOR_TAB_BAR_INACTIVE,
} from '../../constants/ThingerColors';

const MainRoutes = createBottomTabNavigator(
  {
    UserDevices: {
      screen: UserDevices,
      navigationOptions: {
        title: 'User',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={22} style={{ color: tintColor }} />
        ),
      },
    },
    ScannedDevices: {
      screen: Devices,
      navigationOptions: {
        title: 'Scanned',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="devices-other" size={22} style={{ color: tintColor }} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLOR_TAB_BAR_ACTIVE,
      inactiveTintColor: COLOR_TAB_BAR_INACTIVE,
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    navigationOptions: {
      title: 'thinger.io',
    },
  },
);

const MainNavigator = createStackNavigator(
  {
    Main: { screen: MainRoutes, key: 'Main' },
    Scanner: { screen: QRScanner },
    Settings: { screen: UserSettings },
    Device: { screen: Resources },
    Info: { screen: DeviceInfo },
    Chart: { screen: Chart },
    ShowQR: { screen: ShowQR },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: DARK_BLUE,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const App = createAppContainer(MainNavigator);

export default App;

// type Props = {
//   isLogged: boolean,
//   dispatch: Dispatch,
//   nav: any,
// };

// class Navigator extends React.Component<Props> {
//   render() {
//     const { dispatch, nav } = this.props;
//     return <Routes />;
//   }
// }

// const mapStateToProps = state => ({
//   isLogged: state.login.isLogged,
//   nav: state.nav,
// });

// export default connect(mapStateToProps)(Navigator);
