import { connect } from "react-redux";
import {
  selectDevice,
  navigate,
  removeResources,
  getResourcesFromApi
} from "../../actions/actions";
import {
  FlatList,
  View,
  Image,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import Device from "../devices/Device";
import React from "react";
import { MARGIN, PADDING } from "../../constants/ThingerStyles";
import ThingerStyles from "../../constants/ThingerStyles";
import Screen from "../containers/Screen";

class DevicesScreen extends React.Component {
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
    return Object.keys(devices).length ? (
      <FlatList
        data={Object.values(devices)}
        keyExtractor={item => item.jti}
        renderItem={({ item }) => (
          <Device
            name={item.dev}
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
        navigationBar={{
          title: "Devices",
          rightIcon: "qrcode",
          onPress: this.props.onAddDevicePress
        }}
      >
        {this.renderContent()}
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: state.devices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeviceClick: device => {
      dispatch(removeResources());
      dispatch(selectDevice(device.jti));
      dispatch(getResourcesFromApi(device));
      dispatch(navigate("Device", device.dev));
    },
    onAddDevicePress: () => {
      dispatch(navigate("Scanner"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
