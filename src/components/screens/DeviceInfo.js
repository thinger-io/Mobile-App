// @flow

import { connect } from 'react-redux';
import React from 'react';
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
import type { Device } from '../../types/Device';
import type { Dispatch } from '../../types/Dispatch';
import DevicesActions from '../../store/redux/devices';
import { THINGER_SERVER } from '../../constants/ThingerConstants';
import { LIGHT_RED } from '../../constants/ThingerColors';

type Props = {
  device: Device,
  isUserDevice: boolean,
  removeDevice: (id: string) => Dispatch,
  setServer: (device: string, server: string) => Dispatch,
  setName: (device: string, name: string) => Dispatch,
};

class DeviceInfo extends React.Component<Props> {
  static navigationOptions = {
    title: 'Info',
  };

  handleOnChangeServer = (text: string) => {
    const { device, setServer } = this.props;
    setServer(device.id, text);
  };

  handleOnChangeName = (text: string) => {
    const { device, setName } = this.props;
    setName(device.id, text);
  };

  render() {
    const {
      device, isUserDevice, removeDevice, navigation,
    } = this.props;
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
                [
                  <TextInputItem
                    name="Alias"
                    value={device.name ? device.name : ''}
                    placeholder={device.dev}
                    onChangeText={this.handleOnChangeName}
                  />,
                  <TextInputItem
                    name="Server"
                    value={device.server}
                    placeholder={THINGER_SERVER}
                    onChangeText={this.handleOnChangeServer}
                  />,
                  <EnterItem
                    name="Token QR"
                    onPress={() => navigation.navigate('ShowQR', navigation.state.params)}
                  />,
                  <OutputItem name="Token creation date" value={timestampToString(device.iat)} />,
                  <OutputItem
                    name="Token expiration date"
                    value={device.exp ? timestampToString(device.exp) : 'Never'}
                  />,
                ]
              )}
            </List>

            {!isUserDevice && (
              <CenterView style={{ margin: MARGIN }}>
                <RoundedButton
                  color={LIGHT_RED}
                  text="Remove"
                  onPress={() => removeDevice(device.id)}
                />
              </CenterView>
            )}
          </ScrollView>
        )}
      </Screen>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.navigation.getParam('device');

  return {
    device: state.devices.byId[id],
    isUserDevice: state.userDevices.includes(id),
  };
};

// const mapDispatchToProps = dispatch => ({
//   removeDevice: (id) => {
//     dispatch(removeDevice(id));
//     // dispatch(goToMain());
//   },
//   changeServer: (device, server) => dispatch(setDeviceServer(device, server)),
//   // onShowQR: () => dispatch(navigate('ShowQR')),
//   onShowQR: () => null,
//   changeName: (device, name) => dispatch(setDeviceName(device, name)),
// });

const mapDispatchToProps = {
  setServer: DevicesActions.setServer,
  setName: DevicesActions.setName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeviceInfo);
