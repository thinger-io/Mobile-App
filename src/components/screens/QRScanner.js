//@flow

import React from "react";
import { Text, View, Platform } from "react-native";
import { connect } from "react-redux";
import { PADDING } from "../../constants/ThingerStyles";
import { parseJWT } from "../../utils/jwt";
import Screen from "../containers/Screen";
import type { Dispatch } from "../../types/Dispatch";
import { addDevice } from "../../actions/device";
import { goBack } from "../../actions/nav";
import NavigationBar from "../navigation/NavigationBar";
import { RNCamera } from "react-native-camera";
import { DARK_BLUE } from "../../constants/ThingerColors";
import { ToastActionsCreators } from "react-native-redux-toast";

const DEFAULT_RATIO = "16:9";

type Props = {
  devices: Array<string>,
  dispatch: Dispatch,
  displayMessage: (message: string) => Dispatch,
  displayError: (message: string) => Dispatch
};

type State = {
  ratio: ?string
};

class QRScanner extends React.Component<Props, State> {
  cam: ?RNCamera;

  state = {
    ratio: undefined
  };

  handleOnBarCodeRead(data) {
    const { dispatch, devices, displayError, displayMessage } = this.props;

    try {
      const device = parseJWT(data.data);
      const id = Object.keys(device)[0];
      if (devices.includes(id)) {
        displayError("This device already exists");
      } else {
        dispatch(addDevice(device, false));
        displayMessage("Added!");
        dispatch(goBack());
      }
    } catch (e) {
      displayError("This QR isn't a device");
    }
  }

  async getPrimaryRatio(cam) {
    if (Platform.OS === "android" && cam) {
      const ratios: Array<string> = await cam.getSupportedRatiosAsync();
      if (ratios.includes(DEFAULT_RATIO)) {
        this.setState({ ratio: DEFAULT_RATIO });
      }
    }
  }

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.cam = ref;
        }}
        style={{
          flex: 1,
          backgroundColor: "transparent"
        }}
        type={RNCamera.Constants.Type.back}
        ratio={this.state.ratio}
        onCameraReady={() => this.getPrimaryRatio(this.cam)}
        permissionDialogTitle={"Permission to use camera"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={data => {
          this.handleOnBarCodeRead(data);
        }}
      />
    );
  }

  render() {
    return (
      <Screen navigationBar={<NavigationBar title="QR Scanner" />}>
        {this.renderCamera()}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: PADDING,
            backgroundColor: DARK_BLUE
          }}
        >
          <Text style={{ color: "white" }}>Scan your device token QR</Text>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: Object.keys(state.devices)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    displayMessage: (message: string) =>
      dispatch(ToastActionsCreators.displayInfo(message, 1000)),
    displayError: (message: string) =>
      dispatch(ToastActionsCreators.displayError(message, 1000))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
