import { FlatList, View, Image, ActivityIndicator, ListRenderItem } from 'react-native';
import React from 'react';
import { MARGIN } from '../../constants/ThingerStyles';
import Screen from '../containers/Screen';
import H1Text from '../texts/H1';
import H2Text from '../texts/H2';
import { DARK_BLUE } from '../../constants/ThingerColors';
import noDeviceIcon from '../../assets/no_devices.png';
import { Device } from '../../types/Device';

type Props = {
  isFetching: boolean;
  devices: Device[];
  children: ListRenderItem<Device>;
};

const Separator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
      }}
    />
  );
};

const DeviceList = ({ isFetching, devices, children }: Props) => {
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
              renderItem={children}
              ItemSeparatorComponent={Separator}
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
};

export default DeviceList;
