import React from "react";
import { Text, View } from "react-native";
import { Camera, Permissions } from "expo";
import { connect } from "react-redux";
import { addDevice } from "../../actions/actions";
import { goBack } from "../../actions/actions";

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

  render() {
    const { dispatch, navigation } = this.props;
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.type}
            barCodeTypes={this.state.barCodeTypes}
            onBarCodeRead={data => {
              dispatch(addDevice(data.data));
              dispatch(goBack());
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row"
              }}
            />
          </Camera>
        </View>
      );
    }
  }
}

export default connect()(QRScanner);
