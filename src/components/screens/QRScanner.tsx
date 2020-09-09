import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import Toast from 'react-native-simple-toast';
import { PADDING } from '../../constants/ThingerStyles';
import { parseJWT } from '../../utils/jwt';
import Screen from '../containers/Screen';
import { Dispatch } from '../../types/Dispatch';
import { DARK_BLUE } from '../../constants/ThingerColors';
import { Device } from '../../types/Device';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStack';
import { AppState } from '../../store/types';
import { DevicesActions } from '../../store/devices';

type OwnProps = { navigation: StackNavigationProp<RootStackParamList, 'Scanner'> };
type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> & OwnProps;
type State = { scanning: boolean };

class QRScanner extends React.Component<Props, State> {
  state = {
    scanning: false,
  };

  handleOnBarCodeRead(jwt: string) {
    const { devices, addDevice } = this.props;

    this.setState({ scanning: true });

    try {
      const device = parseJWT(jwt);
      if (devices.includes(device.id)) {
        Toast.show('This device already exists', Toast.SHORT);
      } else {
        addDevice(device);
      }
      setTimeout(() => this.setState({ scanning: false }), 1000);
    } catch (e) {
      Toast.show("This QR isn't a device", Toast.SHORT);
      setTimeout(() => this.setState({ scanning: false }), 1000);
    }
  }

  renderCamera() {
    const { scanning } = this.state;
    return (
      <RNCamera
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
        type={RNCamera.Constants.Type.back}
        permissionDialogTitle="Permission to use camera"
        permissionDialogMessage="We need your permission to use your camera phone"
        captureAudio={false}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        onBarCodeRead={(data) => {
          if (!scanning) {
            this.handleOnBarCodeRead(data.data);
          }
        }}
      />
    );
  }

  render() {
    return (
      <Screen>
        {this.renderCamera()}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            padding: PADDING,
            backgroundColor: DARK_BLUE,
          }}
        >
          <Text style={{ color: 'white' }}>Scan your device token QR</Text>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  devices: Object.keys(state.devices),
});

const mapDispatchToProps = (dispatch: Dispatch, props: OwnProps) => ({
  addDevice: (device: Device) => {
    dispatch(DevicesActions.add({ device }));
    Toast.show('Added!' || '', Toast.SHORT);
    return props.navigation.goBack();
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
