import { connect } from 'react-redux';
import { FlatList, View, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import DeviceComponent from '../../devices/DeviceComponent';
import { MARGIN } from '../../../constants/ThingerStyles';
import Screen from '../../containers/Screen';
import H1Text from '../../texts/H1';
import H2Text from '../../texts/H2';
import { DARK_BLUE } from '../../../constants/ThingerColors';
import { DevicesActions } from '../../../store/devices';
import { AppState } from '../../../store/types';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';
import noDeviceIcon from '../../../assets/no_devices.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps> & {
    isUserDevices: boolean;
    navigation: CompositeNavigationProp<
      StackNavigationProp<RootStackParamList, 'Scanner'>,
      BottomTabNavigationProp<HomeBottomTabsParamList, 'ScannedDevices'>
    >;
    route: RouteProp<HomeBottomTabsParamList, 'UserDevices' | 'ScannedDevices'>;
  };

const mapStateToProps = (state: AppState, props: { isUserDevices: boolean }) => ({
  ids: state.devices.ids,
  devices: state.devices[props.isUserDevices ? 'userIds' : 'ids'].map((id) => state.devices.byId[id]),
  userDevices: state.devices.userIds.map((id) => state.devices.byId[id]),
  isFetching: state.auth.isFetching,
});

const mapDispatchToProps = {
  addDevice: DevicesActions.add,
  getDevices: DevicesActions.fetchUserDevices,
};

class DevicesScreen extends React.Component<Props> {
  componentDidMount() {
    const { isUserDevices, getDevices } = this.props;
    if (isUserDevices) {
      getDevices();
    }
  }

  renderSeparator = () => (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );

  render() {
    const { isFetching, devices, navigation } = this.props;

    return (
      <Screen>
        {isFetching ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={DARK_BLUE} />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {devices.length ? (
              <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item: device }) => (
                  <DeviceComponent
                    name={device.name ? device.name : device.dev}
                    user={device.usr}
                    onClick={() =>
                      navigation.navigate('Device', {
                        deviceId: device.id,
                        title: device.name || device.dev,
                      })
                    }
                  />
                )}
                ItemSeparatorComponent={this.renderSeparator}
              />
            ) : (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={noDeviceIcon} style={{ height: 100, width: 100, margin: MARGIN * 2 }} />
                <H1Text>Ooops!</H1Text>
                <H2Text>You could add a device...</H2Text>
              </View>
            )}
          </View>
        )}
      </Screen>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
