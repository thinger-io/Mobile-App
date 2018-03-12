//@flow

import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import DropdownAlert from "react-native-dropdownalert";
import TIOStyles, { PADDING } from "../../constants/ThingerStyles";
import { parseJWT } from "../../utils/jwt";
import Screen from "../containers/Screen";
import type { Dispatch } from "../../types/Dispatch";
import { addDevice } from "../../actions/device";
import { goBack } from "../../actions/nav";
import NavigationBar from "../navigation/NavigationBar";
import { RNCamera } from "react-native-camera";

type Props = {
  devices: Array<string>,
  dispatch: Dispatch
};

class QRScanner extends React.Component<Props> {
  alert: ?DropdownAlert;

  handleOnBarCodeRead(data) {
    const { dispatch, devices } = this.props;

    try {
      const device = parseJWT(data.data);
      const id = Object.keys(device)[0];
      if (devices.includes(id) && this.alert) {
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
      <RNCamera
        style={{
          flex: 1,
          backgroundColor: "transparent"
        }}
        type={RNCamera.Constants.Type.back}
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

  /*
  *
  *         <DropdownAlert
          ref={alert => (this.alert = alert)}
          replaceEnabled={false}
          defaultContainer={{
            padding: 8,
            paddingTop: 10,
            flexDirection: "row"
          }}
        />*/

  render() {
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

      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    devices: Object.keys(state.devices)
  };
};

export default connect(mapStateToProps)(QRScanner);
