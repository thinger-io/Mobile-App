import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import React, { useCallback } from 'react';
import { FloatingAction } from 'react-native-floating-action';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-simple-toast';
import { parseJWT } from '../../../utils/jwt';
import { DevicesActions } from '../../../store/devices';
import { AppState } from '../../../store/types';
import { RouteProp, CompositeNavigationProp } from '@react-navigation/native';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Devices from './Devices';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStack';

type Props = typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps> & {
    isUserDevices: boolean;
    navigation: CompositeNavigationProp<
      StackNavigationProp<RootStackParamList, 'Scanner'>,
      BottomTabNavigationProp<HomeBottomTabsParamList, 'ScannedDevices'>
    >;
    route: RouteProp<HomeBottomTabsParamList, 'ScannedDevices'>;
  };

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 18,
    height: 18,
    color: 'white',
  },
});

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

const ScannedDevicesScreen = ({ navigation, route, ids: devices, addDevice }: Props) => {
  const handleClipboardButtonPress = useCallback(async () => {
    try {
      const token = await Clipboard.getString();
      const device = parseJWT(token);
      const id = Object.keys(device)[0];
      if (devices.includes(id)) {
        Toast.show('This device already exists', Toast.SHORT);
      } else {
        addDevice({ device });
        Toast.show('Added!', Toast.SHORT);
      }
    } catch (e) {
      Toast.show("This QR isn't a device", Toast.SHORT);
    }
  }, [addDevice, devices]);

  const handlePressItem = useCallback(
    (name?: string) => {
      if (name === 'clipboard') {
        handleClipboardButtonPress();
      } else if (name === 'qr-scanner') {
        navigation.navigate('Scanner');
      }
    },
    [handleClipboardButtonPress, navigation],
  );

  return (
    <View style={{ flex: 1 }}>
      <Devices isUserDevices={false} navigation={navigation} route={route} />
      <FloatingAction
        actions={[
          {
            name: 'clipboard',
            color: '#9b59b6',
            icon: <MaterialIcon name="content-paste" style={styles.actionButtonIcon} />,
            text: 'from clipboard',
          },
          {
            name: 'qr-scanner',
            color: '#1abc9c',
            icon: <MaterialIcon name="photo-camera" style={styles.actionButtonIcon} />,
            text: 'from QR scanner',
          },
        ]}
        onPressItem={handlePressItem}
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannedDevicesScreen);
