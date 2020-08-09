import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import QRScanner from '../screens/QRScanner';
import Resources from '../screens/Resources';
import DeviceInfo from '../screens/DeviceInfo';
import ShowQR from '../screens/ShowQR';
import UserSettings from '../screens/UserSettings';
import { DARK_BLUE } from '../../constants/ThingerColors';
import HomeBottomTabs from './HomeBottomTabs';
import Icon from '../buttons/Icon';
import ChartsBottomTabs from './ChartsBottomTabs';

export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  UserSettings: undefined;
  Scanner: undefined;
  Device: { deviceId: string; title: string };
  DeviceInfo: { deviceId: string };
  Charts: { deviceId: string; resourceId: string };
  ShowQR: { deviceId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        backgroundColor: DARK_BLUE,
        borderBottomWidth: 0,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name="Home" component={HomeBottomTabs} options={{ title: 'thinger.io' }} />
    <Stack.Screen name="Scanner" component={QRScanner} />
    <Stack.Screen name="UserSettings" component={UserSettings} />
    <Stack.Screen
      name="Device"
      component={Resources}
      options={({ route, navigation }) => ({
        title: route.params.title,
        headerRight: () => (
          <Icon icon="cog" onPress={() => navigation.navigate('DeviceInfo', { deviceId: route.params.deviceId })} />
        ),
      })}
    />
    <Stack.Screen name="DeviceInfo" component={DeviceInfo} />
    <Stack.Screen name="Charts" component={ChartsBottomTabs} />
    <Stack.Screen name="ShowQR" component={ShowQR} />
  </Stack.Navigator>
);

export default RootStack;
