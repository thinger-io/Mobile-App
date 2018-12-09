// @flow

import { connect } from 'react-redux';
import {
  FlatList, View, Image, ActivityIndicator, StyleSheet, Clipboard,
} from 'react-native';
import React from 'react';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { type NavigationState } from 'react-navigation';
import { ToastActionsCreators } from 'react-native-redux-toast';
import ResourcesActions from '../../store/redux/resources';
import DeviceComponent from '../devices/DeviceComponent';
import { MARGIN } from '../../constants/ThingerStyles';
import Screen from '../containers/Screen';
import { getResourcesFromApi } from '../../actions/fetch';
import DevicesActions from '../../store/redux/devices';
import { removeAllResources } from '../../actions/resource';
import type { Dispatch } from '../../types/Dispatch';
import NavigationBar from '../navigation/NavigationBar';
import type { Device } from '../../types/Device';
import ID from '../../constants/GoogleAnalytics';
import H1Text from '../texts/H1';
import H2Text from '../texts/H2';
import { DARK_BLUE } from '../../constants/ThingerColors';
import { parseJWT } from '../../utils/jwt';

const noDeviceIcon = require('../../assets/no_devices.png');

type Props = {
  ids: Array<string>,
  devices: Array<Device>,
  addDevice: (device: Device) => Dispatch,
  isUserDevices: boolean,
  isFetching: boolean,
  displayMessage: (message: string) => Dispatch,
  displayError: (message: string) => Dispatch,
  navigation: NavigationState,
};

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: 'white',
  },
});

const mapStateToProps = state => ({
  ids: state.devices.ids,
  devices: state.devices.ids.map(id => state.devices.byId[id]),
  isFetching: state.login.isFetching,
});

// const mapDispatchToProps = dispatch => ({
//   displayMessage: (message: string) => dispatch(ToastActionsCreators.displayInfo(message, 1000)),
//   displayError: (message: string) => dispatch(ToastActionsCreators.displayError(message, 1000)),
// });

const mapDispatchToProps = {
  addDevice: DevicesActions.Add,
};

class DevicesScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    new GoogleAnalyticsTracker(ID).trackScreenView('Main');
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

  onClipboardButtonPress = async () => {
    const {
      ids: devices, addDevice, displayMessage, displayError,
    } = this.props;

    try {
      const token = await Clipboard.getString();
      const device = parseJWT(token);
      const id = Object.keys(device)[0];
      if (devices.includes(id)) {
        displayError('This device already exists');
      } else {
        addDevice(device);
        displayMessage('Added!');
      }
    } catch (e) {
      displayError("This QR isn't a device");
    }
  };

  renderContent() {
    const { devices, isUserDevices, navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {devices.length ? (
          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({ item: device }) => (
              <DeviceComponent
                name={device.name ? device.name : device.dev}
                user={device.usr}
                onClick={() => navigation.navigate('Device', {
                  device: device.id,
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

        {!isUserDevices && (
          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor="#9b59b6"
              title="from clipboard"
              onPress={this.onClipboardButtonPress}
            >
              <Icon name="content-paste" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#3498db"
              title="from picture"
              onPress={() => console.error('TODO: No implemented yet')}
            >
              <Icon name="photo" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="from QR scanner"
              onPress={() => navigation.navigate('QRScanner')}
            >
              <Icon name="photo-camera" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        )}
      </View>
    );
  }

  render() {
    const { isFetching, isUserDevices } = this.props;

    return (
      <Screen
        navigationBar={(
          <NavigationBar
            title="thinger.io"
            main
            button={
              isUserDevices
                ? {
                  icon: 'cog',
                  onPress: () => navigation.navigate('Settings'),
                }
                : undefined
            }
          />
)}
      >
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
          this.renderContent()
        )}
      </Screen>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DevicesScreen);
