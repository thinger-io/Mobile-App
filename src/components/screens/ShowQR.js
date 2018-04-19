//@flow

import { View, Share } from "react-native";
import React from "react";
import { connect } from "react-redux";
import Screen from "../containers/Screen";
import NavigationBar from "../navigation/NavigationBar";
import {
  COLOR_BACKGROUND,
  DARK_BLUE
} from "../../constants/ThingerColors";
import QRCode from "react-native-qrcode-svg";
import RoundedButton from "../buttons/RoundedButton";
import { MARGIN, PADDING } from "../../constants/ThingerStyles";
import CenterView from "../containers/CenterView";

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
          <CenterView style={{ margin: MARGIN }}>
            <RoundedButton
              style={{ marginVertical: MARGIN }}
              color={DARK_BLUE}
              text={"Share"}
              onPress={() =>
                Share.share({ title: this.props.name, message: this.props.jwt })
              }
            />
          </CenterView>
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
