//@flow

import { connect } from "react-redux";
import React from "react";
import { MARGIN } from "../../constants/ThingerStyles";
import RoundedButton from "../buttons/RoundedButton";
import CenterView from "../containers/CenterView";
import Screen from "../containers/Screen";
import List from "../lists/List";
import OutputItem from "../lists/OutputItem";
import TextInputItem from "../lists/TextInputItem";
import EnterItem from "../lists/EnterItem";
import { ScrollView } from "react-native";
import { timestampToString } from "../../utils/dates";
import type { Device } from "../../types/Device";
import type { Dispatch } from "../../types/Dispatch";
import { setDeviceServer, removeDevice } from "../../actions/device";
import { goToMain, navigate } from "../../actions/nav";
import NavigationBar from "../navigation/NavigationBar";
import { THINGER_SERVER } from "../../constants/ThingerConstants";

type Props = {
  device: Device,
  removeDevice: (jti: string) => Dispatch,
  changeServer: (device: string, server: string) => Dispatch,
  onShowQR: () => Dispatch
};

type State = {
  server: string
};

class DeviceInfo extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    (this: any).handleOnChangeText = this.handleOnChangeText.bind(this);
    this.state = {
      server: this.props.device.server
    };
  }

  handleOnChangeText(text: string) {
    const { device, changeServer } = this.props;
    this.setState({ server: text });
    changeServer(device.jti, text);
  }

  render() {
    const { device, removeDevice, onShowQR } = this.props;
    return (
      <Screen navigationBar={<NavigationBar title="Settings" />}>
        {device && (
          <ScrollView>
            <List>
              <OutputItem name={"Device"} value={device.dev} />
              <OutputItem name={"User"} value={device.usr} />
              <TextInputItem
                name={"Server"}
                value={this.state.server}
                placeholder={THINGER_SERVER}
                onChangeText={this.handleOnChangeText}
              />
              <EnterItem name={"Token QR"} onPress={() => onShowQR()} />
              <OutputItem
                name={"Token creation date"}
                value={timestampToString(device.iat)}
              />
              <OutputItem
                name={"Token expiration date"}
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
    removeDevice: jti => dispatch(removeDevice(jti), goToMain()),
    changeServer: (device, server) => dispatch(setDeviceServer(device, server)),
    onShowQR: () => dispatch(navigate("ShowQR"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);
