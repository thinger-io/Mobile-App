import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useLayoutEffect } from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ScannedDevices from '../screens/Home/ScannedDeviceList';
import UserDevices from '../screens/Home/UserDeviceList';
import { COLOR_TAB_BAR_ACTIVE, COLOR_TAB_BAR_INACTIVE } from '../../constants/ThingerColors';
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStack';
import Icon from '../buttons/Icon';
import { AppState } from '../../store/types';
import { connect } from 'react-redux';

export type HomeBottomTabsParamList = {
  UserDevices: undefined;
  ScannedDevices: undefined;
};

type OwnProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Device'>;
};
type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: AppState) => ({
  isLogged: !!state.auth.username,
});

const BottomTabs = createBottomTabNavigator<HomeBottomTabsParamList>();

const HomeBottomTabs = ({ navigation, route, isLogged }: Props) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'UserDevices' && isLogged) {
      navigation.setOptions({
        headerRight: () => <Icon icon="cog" onPress={() => navigation.navigate('UserSettings')} />,
      });
    } else {
      navigation.setOptions({
        headerRight: undefined,
      });
    }
  }, [route, navigation, isLogged]);

  return (
    <BottomTabs.Navigator
      initialRouteName="UserDevices"
      tabBarOptions={{ activeTintColor: COLOR_TAB_BAR_ACTIVE, inactiveTintColor: COLOR_TAB_BAR_INACTIVE }}
      screenOptions={{ title: 'thinger.io' }}
    >
      <BottomTabs.Screen
        name="UserDevices"
        component={UserDevices}
        options={{
          title: 'My devices',
          tabBarIcon: ({ color }) => <MaterialIcon name="person" size={22} style={{ color }} />,
        }}
      />
      <BottomTabs.Screen
        name="ScannedDevices"
        component={ScannedDevices}
        options={{
          title: 'Scanned',
          tabBarIcon: ({ color }) => <MaterialIcon name="devices-other" size={22} style={{ color }} />,
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default connect(mapStateToProps)(HomeBottomTabs);
