import { connect } from "react-redux";
import { Button, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg/src/index";
import styles from "../../styles/TIOStyles";
import { removeDevice, goBack } from "../../actions/actions";

class DeviceInfo extends React.Component {
  render() {
    const { device, removeDevice } = this.props;

    return device ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ marginBottom: 50 }}>
          <QRCode value={device.jwt} size={300} />
        </View>
        <Text style={styles.h1}>{device.dev}</Text>
        <Text style={styles.h2}>{device.usr}</Text>
        <View
          style={{
            marginTop: 20,
            borderRadius: 5,
            backgroundColor: "red"
          }}
        >
          <Button
            onPress={() => removeDevice(device.jti)}
            title="Remove"
            color="white"
          />
        </View>
      </View>
    ) : null;
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    device: state.devices[jti]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeDevice: jti => {
      dispatch(removeDevice(jti));
      dispatch(goBack());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);
