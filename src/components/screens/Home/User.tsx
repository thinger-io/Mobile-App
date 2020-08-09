import { connect } from 'react-redux';
import React from 'react';
import Login from './Login';
import Devices from './Devices';
import { AppState } from '../../../store/types';
import { RouteProp } from '@react-navigation/native';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type OwnProps = {
  user?: string;
  navigation: BottomTabNavigationProp<HomeBottomTabsParamList, 'UserDevices'>;
  route: RouteProp<HomeBottomTabsParamList, 'UserDevices'>;
};

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: AppState) => ({
  user: state.auth.username,
});

function UserScreen({ user, navigation, route }: Props) {
  if (user) {
    return <Devices isUserDevices navigation={navigation} route={route} />;
  } else {
    return <Login />;
  }
}

export default connect(mapStateToProps)(UserScreen);
