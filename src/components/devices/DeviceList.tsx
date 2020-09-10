import { FlatList, View, Image, ListRenderItem } from 'react-native';
import React from 'react';
import { MARGIN } from '../../constants/ThingerStyles';
import Screen from '../containers/Screen';
import H1Text from '../texts/H1';
import H2Text from '../texts/H2';
import noDeviceIcon from '../../assets/no_devices.png';
import { Device } from '../../types/Device';

type Props = {
  isFetching: boolean;
  devices: Device[];
  children: ListRenderItem<Device>;
  isRefreshing?: boolean;
  onRefresh?: () => void;
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

const EmptyDevices = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={noDeviceIcon} style={{ height: 100, width: 100, margin: MARGIN * 2 }} />
      <H1Text>Ooops!</H1Text>
      <H2Text>You could add a device...</H2Text>
    </View>
  );
};

const DeviceList = ({ isRefreshing, devices, children, onRefresh }: Props) => {
  return (
    <Screen>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={children}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyDevices}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Screen>
  );
};

export default DeviceList;
