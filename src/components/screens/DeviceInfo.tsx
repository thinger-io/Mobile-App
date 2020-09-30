import { connect } from 'react-redux';
import React, { Fragment, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { MARGIN } from '../../constants/ThingerStyles';
import RoundedButton from '../buttons/RoundedButton';
import CenterView from '../containers/CenterView';
import Screen from '../containers/Screen';
import List from '../lists/List';
import OutputItem from '../lists/OutputItem';
import TextInputItem from '../lists/TextInputItem';
import EnterItem from '../lists/EnterItem';
import { timestampToString } from '../../utils/dates';
import { THINGER_SERVER } from '../../constants/ThingerConstants';
import { LIGHT_RED } from '../../constants/ThingerColors';
import { DevicesActions } from '../../store/devices';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStack';
import { RouteProp } from '@react-navigation/native';
import { AppState } from '../../store/types';

type OwnProps = {
  navigation: StackNavigationProp<RootStackParamList, 'DeviceInfo'>;
  route: RouteProp<RootStackParamList, 'DeviceInfo'>;
};
type Props = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: AppState, props: OwnProps) => {
  const id = props.route.params.deviceId;

  return {
    device: state.devices.byId[id],
    isUserDevice: state.devices.userIds.includes(id),
  };
};

const mapDispatchToProps = {
  updateDevice: DevicesActions.update,
  removeDevice: DevicesActions.remove,
};

const DeviceInfo = ({ device, isUserDevice, updateDevice, removeDevice, navigation, route }: Props) => {
  const handleOnChangeServer = useCallback(
    (text: string) => {
      updateDevice({ id: device.id, key: 'server', value: text });
    },
    [updateDevice, device],
  );

  const handleOnChangeName = useCallback(
    (text: string) => {
      updateDevice({ id: device.id, key: 'name', value: text });
    },
    [device, updateDevice],
  );

  const handleRemoveDevice = useCallback(() => {
    navigation.navigate('Home');
    removeDevice({ id: device.id });
  }, [device, removeDevice, navigation]);

  return (
    <Screen>
      {device && (
        <ScrollView>
          <List>
            <OutputItem name="Device" value={device.dev} />
            <OutputItem name="User" value={device.usr} />
            {isUserDevice ? (
              <OutputItem name="Description" value={device.desc ? device.desc : ''} />
            ) : (
              <Fragment>
                <TextInputItem
                  name="Alias"
                  value={device.name ? device.name : ''}
                  placeholder={device.dev}
                  onChangeText={handleOnChangeName}
                />
                <TextInputItem
                  name="Server"
                  value={device.server}
                  placeholder={THINGER_SERVER}
                  onChangeText={handleOnChangeServer}
                />
                <EnterItem
                  name="Token QR"
                  onPress={() => navigation.navigate('ShowQR', { deviceId: route.params.deviceId })}
                />
                <OutputItem name="Token creation date" value={timestampToString(device.iat)} />
                <OutputItem name="Token expiration date" value={device.exp ? timestampToString(device.exp) : 'Never'} />
              </Fragment>
            )}
          </List>

          {!isUserDevice && (
            <CenterView style={{ margin: MARGIN }}>
              <RoundedButton color={LIGHT_RED} text="Remove" onPress={handleRemoveDevice} />
            </CenterView>
          )}
        </ScrollView>
      )}
    </Screen>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);
