//@flow

import React from "react";
import { Text, View } from "react-native";
import { Camera, Permissions } from "expo";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import TIOStyles, { PADDING } from "../../constants/ThingerStyles";
import { parseJWT } from "../../utils/jwt";
import Screen from "../containers/Screen";
import type { Dispatch } from "../../types/Dispatch";
import { addDevice } from "../../actions/device";
import { goBack } from "../../actions/nav";
import NavigationBar from "../navigation/NavigationBar";
import type { DevicesState } from "../../types/State";

type Props = {
  devices: DevicesState,
  dispatch: Dispatch
};

type State = {
  hasCameraPermission: ?boolean,
  type: typeof Camera.Constants.Type,
  barCodeTypes: Array<typeof Camera.Constants.BarCodeType>
};

class QRScanner extends React.Component<Props, State> {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    barCodeTypes: [Camera.Constants.BarCodeType.qr]
  };

  alert: ?DropdownAlert;

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleOnBarCodeRead(data) {
    const { dispatch, devices } = this.props;

    try {
      const device = parseJWT(data.data);
      const id = Object.keys(device)[0];
      if (devices.hasOwnProperty(id) && this.alert) {
        this.alert.alertWithType("error", "Ups!", "This device already exists");
        return;
      }
      dispatch(addDevice(device));
      dispatch(goBack());
    } catch (e) {
      if (this.alert)
        this.alert.alertWithType("error", "Ups!", "This QR isn't a device");
    }
  }

  renderCamera() {
    return (
      <Camera
        style={{
          flex: 1,
          backgroundColor: "transparent"
        }}
        type={this.state.type}
        barCodeTypes={this.state.barCodeTypes}
        onBarCodeRead={data => {
          this.handleOnBarCodeRead(data);
        }}
      />
    );
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Screen navigationBar={<NavigationBar title="QR Scanner" />}>
          {this.renderCamera()}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              padding: PADDING
            }}
          >
            <Text style={TIOStyles.h2}>Scan your device token QR</Text>
          </View>
          <DropdownAlert
            ref={alert => (this.alert = alert)}
            replaceEnabled={false}
            defaultContainer={{
              padding: 8,
              paddingTop: 10,
              flexDirection: "row"
            }}
          />
        </Screen>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    devices: Object.keys(state.devices)
  };
};

export default connect(mapStateToProps)(QRScanner);
