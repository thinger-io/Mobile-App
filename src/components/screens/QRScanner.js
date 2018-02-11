import React from "react";
import { Text, View } from "react-native";
import { Camera, Permissions } from "expo";
import { connect } from "react-redux";
import { addDevice } from "../../actions/actions";
import { goBack } from "../../actions/actions";
import base64 from "base-64";
import DropdownAlert from "react-native-dropdownalert";
import TIOStyles, { PADDING } from "../../styles/ThingerStyles";

function parseJWT(jwt) {
  try {
    const data = jwt.split(".")[1];
    const payload = base64.decode(data);
    const json = JSON.parse(payload);
    return {
      [json.jti]: {
        isFetching: false,
        online: false,
        authorized: false,
        dev: json.dev,
        iat: json.iat,
        jti: json.jti,
        usr: json.usr,
        jwt
      }
    };
  } catch (e) {
    throw e;
  }
}

class QRScanner extends React.Component {
  static navigationOptions = {
    title: "Scanner"
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    barCodeTypes: [Camera.Constants.BarCodeType.qr]
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleOnBarCodeRead(data) {
    const { dispatch, devices } = this.props;

    try {
      const device = parseJWT(data.data);
      const id = Object.keys(device)[0];
      if (devices.includes(id)) {
        this.alert.alertWithType("error", "Ups!", "This device already exists");
        return;
      }
      dispatch(addDevice(device));
      dispatch(goBack());
    } catch (e) {
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
        <View style={{ flex: 1 }}>
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
            ref={ref => (this.alert = ref)}
            replaceEnabled={false}
            defaultContainer={{
              padding: 8,
              paddingTop: 10,
              flexDirection: "row"
            }}
          />
        </View>
      );
    }
  }
}

mapStateToProps = state => {
  return {
    devices: Object.keys(state.devices)
  };
};

export default connect(mapStateToProps)(QRScanner);
