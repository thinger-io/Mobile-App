import { connect } from "react-redux";
import React from "react";
import { MARGIN } from "../../constants/ThingerStyles";
import {
  removeDevice,
  setDeviceServer,
  navigate,
  goToMain
} from "../../actions/actions";
import RoundedButton from "../buttons/RoundedButton";
import CenterView from "../containers/CenterView";
import ThingerConstants from "../../constants/ThingerConstants";
import Screen from "../containers/Screen";
import List from "../lists/List";
import OutputItem from "../lists/OutputItem";
import TextInputItem from "../lists/TextInputItem";
import EnterItem from "../lists/EnterItem";
import { ScrollView } from "react-native";
import { timestampToString } from "../../utils/dates";

class DeviceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnChangeText = this.handleOnChangeText.bind(this);
    this.state = {
      server: this.props.device.server
    };
  }

  handleOnChangeText(text) {
    const { device, changeServer } = this.props;
    this.setState({ server: text });
    changeServer(device.jti, text);
  }

  render() {
    const { device, removeDevice, onShowQR } = this.props;
    return (
      <Screen scroll={true} navigationBar={{ title: "Settings" }}>
        {device && (
          <ScrollView>
            <List>
              <OutputItem id={"Device"} value={device.dev} />
              <OutputItem id={"User"} value={device.usr} />
              <TextInputItem
                id={"Server"}
                value={this.state.server}
                placeholder={ThingerConstants.server}
                onChangeText={this.handleOnChangeText}
              />
              <EnterItem id={"Token QR"} onPress={() => onShowQR()} />
              <OutputItem
                id={"Token creation date"}
                value={timestampToString(device.iat)}
              />
              <OutputItem
                id={"Token expiration date"}
                value={device.exp ? timestampToString(device.exp) : "Never"}
              />
            </List>

            <CenterView style={{ margin: MARGIN }}>
              <RoundedButton
                color={"red"}
                text="Remove"
                onPress={() => removeDevice(device.jti)}
              />
            </CenterView>
          </ScrollView>
        )}
      </Screen>
    );
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
      dispatch(goToMain());
    },
    changeServer: (device, server) => dispatch(setDeviceServer(device, server)),
    onShowQR: () => dispatch(navigate("ShowQR"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);
