import { Platform, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg/src/index";
import { connect } from "react-redux";
import Screen from "../containers/Screen";

class ShowQRScreen extends React.Component {
  render() {
    // TODO: react-native-qrcode-svg not compatible with Android for svg library
    return (
      <Screen navigationBar={{ title: "QR" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          {Platform.OS === "ios" && (
            <QRCode value={this.props.jwt} size={300} />
          )}
        </View>
      </Screen>
    );
  }
}

mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    jwt: state.devices[jti].jwt
  };
};

export default connect(mapStateToProps)(ShowQRScreen);
