import { connect } from "react-redux";
import {
  Button,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View
} from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg/src/index";
import styles from "../../styles/ThingerStyles";
import { removeDevice, goBack, setDeviceServer } from "../../actions/actions";
import { DARK_BLUE } from "../../styles/ThingerColors";

class DeviceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server: this.props.device.server
    };
  }

  render() {
    const { device, removeDevice, changeServer } = this.props;

    return device ? (
      <KeyboardAvoidingView behavior={"position"}>
        <ScrollView style={{ alignItems: "center" }}>
          <View style={{ marginVertical: 50 }}>
            <QRCode value={device.jwt} size={300} />
          </View>
          <Text style={[styles.h1, { textAlign: "center" }]}>{device.dev}</Text>
          <Text style={[styles.h2, { textAlign: "center" }]}>{device.usr}</Text>
          <TextInput
            style={[
              styles.h2,
              {
                textAlign: "center",
                borderWidth: 1,
                borderColor: DARK_BLUE,
                backgroundColor: 'white',
                padding: 5,
                marginVertical: 5,
              }
            ]}
            value={this.state.server}
            placeholder={"https://api.thinger.io"}
            onChangeText={text => {
              this.setState({ server: text });
              changeServer(device.jti, text);
            }}
          />
          <View
            style={{
              marginTop: 20,
              borderRadius: 5,
              backgroundColor: "red"
            }}
          >
            <Button
              onPress={() => removeDevice(device.jti)}
              title="Remove"
              color="white"
            />
          </View>
          <View style={{ height: 80 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    ) : null;
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
      dispatch(goBack());
    },
    changeServer: (device, server) => dispatch(setDeviceServer(device, server))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeviceInfo);
