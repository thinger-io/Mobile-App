import { connect } from "react-redux";
import { Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg/src/index";
import styles from "../../styles/common";

class DeviceInfo extends React.Component {
  render() {
    const { device } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ marginVertical: 50 }}>
          <QRCode value={device.jwt} size={300} />
        </View>
        <Text style={styles.h1}>{device.dev}</Text>
        <Text style={styles.h2}>{device.usr}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    device: state.devices[jti]
  };
};

export default connect(mapStateToProps)(DeviceInfo);
