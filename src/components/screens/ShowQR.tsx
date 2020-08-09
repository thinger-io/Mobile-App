// @flow

import { View, Share } from 'react-native';
import React from 'react';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import Screen from '../containers/Screen';
import { COLOR_BACKGROUND, DARK_BLUE } from '../../constants/ThingerColors';
import RoundedButton from '../buttons/RoundedButton';
import { MARGIN } from '../../constants/ThingerStyles';
import CenterView from '../containers/CenterView';

type Props = {
  name: string;
  jwt: string;
};

class ShowQRScreen extends React.PureComponent<Props> {
  static navigationOptions = {
    title: 'QR',
  };

  render() {
    return (
      <Screen>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <QRCode value={this.props.jwt} size={300} color="black" backgroundColor={COLOR_BACKGROUND} />
          <CenterView style={{ margin: MARGIN }}>
            <RoundedButton
              style={{ marginVertical: MARGIN }}
              color={DARK_BLUE}
              text="Share"
              onPress={() => Share.share({ title: this.props.name, message: this.props.jwt })}
            />
          </CenterView>
        </View>
      </Screen>
    );
  }
}

const mapStateToProps = (state, props) => {
  const id = props.navigation.getParam('device');

  return {
    name: state.devices.byId[id].dev,
    jwt: state.devices.byId[id].jwt,
  };
};

export default connect(mapStateToProps)(ShowQRScreen);
