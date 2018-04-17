//@flow

import { connect } from "react-redux";
import {
  FlatList,
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Clipboard
} from "react-native";
import DeviceComponent from "../devices/DeviceComponent";
import React from "react";
import { MARGIN } from "../../constants/ThingerStyles";
import Screen from "../containers/Screen";
import { navigate } from "../../actions/nav";
import { getResourcesFromApi } from "../../actions/fetch";
import { addDevice, selectDevice } from "../../actions/device";
import { removeAllResources } from "../../actions/resource";
import type { Dispatch } from "../../types/Dispatch";
import NavigationBar from "../navigation/NavigationBar";
import type { Device } from "../../types/Device";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import ID from "../../constants/GoogleAnalytics";
import H1Text from "../texts/H1";
import H2Text from "../texts/H2";
import { DARK_BLUE } from "../../constants/ThingerColors";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/MaterialIcons";
import { parseJWT } from "../../utils/jwt";
import { ToastActionsCreators } from "react-native-redux-toast";

type Props = {
  ids: Array<string>,
  devices: Array<Device>,
  onDeviceClick: (device: Device) => Dispatch,
  onQRScannerPress: () => Dispatch,
  onAddDevice: (device: Device) => Dispatch,
  onSettingsPress: () => Dispatch,
  isUserDevices: boolean,
  isFetching: boolean,
  displayMessage: (message: string) => Dispatch,
  displayError: (message: string) => Dispatch
};

class DevicesScreen extends React.Component<Props> {
  constructor(props) {
    super(props);
    new GoogleAnalyticsTracker(ID).trackScreenView("Main");
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  onClipboardButtonPress = async () => {
    const {
      ids: devices,
      onAddDevice,
      displayMessage,
      displayError
    } = this.props;

    try {
      const token = await Clipboard.getString();
      const device = parseJWT(token);
      const id = Object.keys(device)[0];
      if (devices.includes(id)) {
        displayError("This device already exists");
      } else {
        onAddDevice(device);
        displayMessage("Added!");
      }
    } catch (e) {
      displayError("This QR isn't a device");
    }
  };

  renderContent() {
    const {
      devices,
      onDeviceClick,
      isUserDevices,
      onQRScannerPress
    } = this.props;

    return (
      <View style={{ flex: 1 }}>
        {devices.length ? (
          <FlatList
            data={devices}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <DeviceComponent
                name={item.name ? item.name : item.dev}
                user={item.usr}
                onClick={() => onDeviceClick(item)}
              />
            )}
            ItemSeparatorComponent={this.renderSeparator}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("../../assets/no_devices.png")}
              style={{ height: 100, width: 100, margin: MARGIN * 2 }}
            />
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
              onPress={() => console.error("TODO: No implemented yet")}
            >
              <Icon name="photo" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="from QR scanner"
              onPress={onQRScannerPress}
            >
              <Icon name="photo-camera" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        )}
      </View>
    );
  }

  render() {
    const { isFetching, isUserDevices, onSettingsPress } = this.props;

    return (
      <Screen
        navigationBar={
          <NavigationBar
            title={"thinger.io"}
            main={true}
            button={
              isUserDevices
                ? {
                    icon: "cog",
                    onPress: onSettingsPress
                  }
                : undefined
            }
          />
        }
      >
        {isFetching ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
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

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 22,
    height: 22,
    color: "white"
  }
});

const mapStateToProps = state => {
  const { routes: tabs, index: selectedTab } = state.nav.routes[0];
  const currentTab = tabs[selectedTab].routeName;
  const isUserDevices: boolean = currentTab === "UserDevices";

  return {
    ids: Object.keys(state.devices),
    devices: isUserDevices
      ? (Object.values(state.devices): any).filter(device =>
          state.userDevices.includes(device.id)
        )
      : (Object.values(state.devices): any).filter(
          device => !state.userDevices.includes(device.id)
        ),
    isUserDevices,
    isFetching: state.login.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeviceClick: device => {
      dispatch(removeAllResources());
      dispatch(selectDevice(device.id));
      dispatch(getResourcesFromApi(device));
      dispatch(navigate("Device"));
    },
    onSettingsPress: () => dispatch(navigate("Settings")),
    onQRScannerPress: () => dispatch(navigate("Scanner")),
    onAddDevice: (device: Device) => dispatch(addDevice(device, false)),
    displayMessage: (message: string) =>
      dispatch(ToastActionsCreators.displayInfo(message, 1000)),
    displayError: (message: string) =>
      dispatch(ToastActionsCreators.displayError(message, 1000))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
