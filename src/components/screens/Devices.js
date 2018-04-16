//@flow

import { connect } from "react-redux";
import { FlatList, View, Image, ActivityIndicator } from "react-native";
import DeviceComponent from "../devices/DeviceComponent";
import React from "react";
import { MARGIN } from "../../constants/ThingerStyles";
import Screen from "../containers/Screen";
import { navigate } from "../../actions/nav";
import { getResourcesFromApi } from "../../actions/fetch";
import { selectDevice } from "../../actions/device";
import { removeAllResources } from "../../actions/resource";
import type { Dispatch } from "../../types/Dispatch";
import NavigationBar from "../navigation/NavigationBar";
import type { Device } from "../../types/Device";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import ID from "../../constants/GoogleAnalytics";
import H1Text from "../texts/H1";
import H2Text from "../texts/H2";
import { DARK_BLUE } from "../../constants/ThingerColors";

type Props = {
  devices: Array<Device>,
  onDeviceClick: (device: Device) => Dispatch,
  onAddDevicePress: () => Dispatch,
  onSettingsPress: () => Dispatch,
  isUserDevices: boolean,
  isFetching: boolean
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

  renderContent() {
    const { devices, onDeviceClick } = this.props;

    return devices.length ? (
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../assets/no_devices.png")}
          style={{ height: 100, width: 100, margin: MARGIN * 2 }}
        />
        <H1Text>Ooops!</H1Text>
        <H2Text>You could add a device...</H2Text>
      </View>
    );
  }

  render() {
    const {
      isFetching,
      isUserDevices,
      onAddDevicePress,
      onSettingsPress
    } = this.props;

    return (
      <Screen
        navigationBar={
          <NavigationBar
            title={"thinger.io"}
            main={true}
            button={{
              icon: isUserDevices ? "cog" : "qrcode",
              onPress: isUserDevices ? onSettingsPress : onAddDevicePress
            }}
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

const mapStateToProps = state => {
  const { routes: tabs, index: selectedTab } = state.nav.routes[0];
  const currentTab = tabs[selectedTab].routeName;
  const isUserDevices: boolean = currentTab === "UserDevices";

  return {
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
    onAddDevicePress: () => dispatch(navigate("Scanner"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
