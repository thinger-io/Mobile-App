import { connect } from "react-redux";
import {
  selectDevice,
  navigate,
  removeResources,
  getResourcesFromApi,
  disableRefresh,
  enableRefresh
} from "../../actions/actions";
import {FlatList, Button, Text} from "react-native";
import Device from "../devices/Device";
import React from "react";

class DevicesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "thingerio",
      headerRight: (
        <Button
          title="Add"
          onPress={() => navigation.dispatch(navigate("Scanner"))}
        />
      )
    };
  };

  render() {
    const { devices, onDeviceClick } = this.props;
    console.log(devices);
    return (
      <FlatList
        data={Object.values(devices)}
        keyExtractor={item => item.jti}
        renderItem={ ({item}) => (
          <Device name={item.dev} user={item.usr} onClick={() => onDeviceClick(item)} />
        )}
      />
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
      dispatch(enableRefresh());
      dispatch(getResourcesFromApi(device)).then(dispatch(disableRefresh()));
      dispatch(navigate("Resources"));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevicesScreen);
