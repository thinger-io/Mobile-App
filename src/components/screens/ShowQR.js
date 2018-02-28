//@flow

import { View } from "react-native";
import React from "react";
import { connect } from "react-redux";
import Screen from "../containers/Screen";
import NavigationBar from "../navigation/NavigationBar";
import QRCode from "react-native-qrcode";
import { COLOR_BACKGROUND } from "../../constants/ThingerColors";

type Props = {
  jwt: string
};

class ShowQRScreen extends React.Component<Props> {
  render() {
    return (
      <Screen navigationBar={<NavigationBar title="QR Scanner" />}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <QRCode
            value={this.props.jwt}
            size={300}
            bgColor="black"
            fgColor={COLOR_BACKGROUND}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    jwt: state.devices[jti].jwt
  };
};

export default connect(mapStateToProps)(ShowQRScreen);
