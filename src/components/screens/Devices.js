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

class DevicesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "thingerio",
      headerRight: (
        <TouchableWithoutFeedback
          onPress={() => navigation.dispatch(navigate("Scanner"))}
        >
          <View style={{ padding: PADDING }}>
            <Text style={{ color: "white" }}>Add</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    };
  };

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

  render() {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
