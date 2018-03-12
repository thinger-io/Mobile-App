//@flow

import { connect } from "react-redux";
import { FlatList, View, Image, Text } from "react-native";
import DeviceComponent from "../devices/DeviceComponent";
import React from "react";
import { MARGIN } from "../../constants/ThingerStyles";
import ThingerStyles from "../../constants/ThingerStyles";
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

type Props = {
  devices: Array<Device>,
  onDeviceClick: (device: Device) => Dispatch,
  onAddDevicePress: () => Dispatch
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
        keyExtractor={item => item.jti}
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
        <Text style={ThingerStyles.h1}>Ooops!</Text>
        <Text style={ThingerStyles.h2}>You could add a device...</Text>
      </View>
    );
  }

  render() {
    return (
      <Screen
        navigationBar={
          <NavigationBar
            title={"Devices"}
            main={true}
            button={{
              icon: "qrcode",
              onPress: this.props.onAddDevicePress
            }}
          />
        }
      >
        {this.renderContent()}
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: Object.values(state.devices)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeviceClick: device => {
      dispatch(removeAllResources());
      dispatch(selectDevice(device.jti));
      dispatch(getResourcesFromApi(device));
      dispatch(navigate("Device"));
    },
    onAddDevicePress: () => dispatch(navigate("Scanner"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
