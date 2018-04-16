//@flow

import { View } from "react-native";
import React from "react";
import { connect } from "react-redux";
import Screen from "../containers/Screen";
import NavigationBar from "../navigation/NavigationBar";
import { COLOR_BACKGROUND } from "../../constants/ThingerColors";
import QRCode from "react-native-qrcode-svg";

type Props = {
  name: string,
  jwt: string
};

class ShowQRScreen extends React.Component<Props> {
  render() {
    return (
      <Screen navigationBar={<NavigationBar title={this.props.name} />}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <QRCode
            value={this.props.jwt}
            size={300}
            color="black"
            backgroundColor={COLOR_BACKGROUND}
          />
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  const id = state.selectedDevice;

  return {
    name: state.devices[id].dev,
    jwt: state.devices[id].jwt
  };
};

export default connect(mapStateToProps)(ShowQRScreen);
