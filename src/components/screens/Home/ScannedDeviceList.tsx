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
import { CompositeNavigationProp } from '@react-navigation/native';
import { HomeBottomTabsParamList } from '../../navigation/HomeBottomTabs';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootStack';
import { LIGHT_GREEN, BLUE } from '../../../constants/ThingerColors';
import DeviceList from '../../devices/DeviceList';
import ScannedDevice from '../../devices/ScannedDevice';

type Props = typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps> & {
    isUserDevices: boolean;
    navigation: CompositeNavigationProp<
      StackNavigationProp<RootStackParamList, 'Scanner'>,
      BottomTabNavigationProp<HomeBottomTabsParamList, 'ScannedDevices'>
    >;
  };

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 18,
    height: 18,
    color: 'white',
  },
});

const mapStateToProps = (state: AppState) => ({
  devideIds: state.devices.ids,
  devices: state.devices.ids.map((id) => state.devices.byId[id]),
  isFetching: state.devices.isFetching,
});

const mapDispatchToProps = {
  addDevice: DevicesActions.add,
};
const ScannedDevicesScreen = ({ navigation, devideIds, devices, isFetching, addDevice }: Props) => {
  const handleClipboardButtonPress = useCallback(async () => {
    try {
      const token = await Clipboard.getString();
      const device = parseJWT(token);
      const id = Object.keys(device)[0];
      if (devideIds.includes(id)) {
        Toast.show('This device already exists', Toast.SHORT);
      } else {
        addDevice({ device });
        Toast.show('Added!', Toast.SHORT);
      }
    } catch (e) {
      Toast.show("This QR isn't a device", Toast.SHORT);
    }
  }, [addDevice, devideIds]);

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
      <DeviceList isFetching={isFetching} devices={devices}>
        {({ item: device }) => (
          <ScannedDevice
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
      </DeviceList>
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
            color: LIGHT_GREEN,
            icon: <MaterialIcon name="photo-camera" style={styles.actionButtonIcon} />,
            text: 'from QR scanner',
          },
        ]}
        onPressItem={handlePressItem}
        color={BLUE}
      />
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannedDevicesScreen);
