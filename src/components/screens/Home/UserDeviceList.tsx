import { connect } from 'react-redux';
import React, { useEffect, useCallback } from 'react';
import Login from './Login';
import { AppState } from '../../../store/types';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import DeviceList from '../../devices/DeviceList';
import UserDevice from '../../devices/UserDevice';
import { DevicesActions } from '../../../store/devices';
import { UserDevice as IUserDevice } from '../../../types/Device';

type OwnProps = {
  user?: string;
  navigation: BottomTabNavigationProp<HomeBottomTabsParamList, 'UserDevices'>;
};

type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: AppState) => ({
  user: state.auth.username,
  devices: state.devices.userIds.map((id) => state.devices.byId[id]) as IUserDevice[],
  isFetching: state.devices.isFetching,
});

const mapDispatchToProps = {
  getDevices: DevicesActions.fetchUserDevices,
};

function UserScreen({ user, navigation, isFetching, devices, getDevices }: Props) {
  useEffect(() => {
    if (user) {
      getDevices();
    }
  }, [getDevices, user]);

  const handleRefresh = useCallback(() => {
    getDevices();
  }, [getDevices]);

  if (user) {
    return (
      <DeviceList isFetching={isFetching} devices={devices} onRefresh={handleRefresh} isRefreshing={isFetching}>
        {({ item: device }) => (
          <UserDevice
            name={device.name ? device.name : device.dev}
            type={(device as IUserDevice).type}
            isOnline={device.isOnline}
            lastConnection={(device as IUserDevice).lastConnection}
            onClick={() =>
              navigation.navigate('Device', {
                deviceId: device.id,
                title: device.name || device.dev,
              })
            }
          />
        )}
      </DeviceList>
    );
  } else {
    return <Login />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
