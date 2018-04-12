//@flow

import { connect } from "react-redux";
import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import Screen from "../containers/Screen";
import { navigate } from "../../actions/nav";
import type { Dispatch } from "../../types/Dispatch";
import {
  COLOR_BACKGROUND,
  COLOR_TEXT_INPUT,
  DARK_BLUE, LIGHT_GREEN
} from "../../constants/ThingerColors";
import { Kohana } from "react-native-textinput-effects";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BORDER_RADIUS, MARGIN, PADDING } from "../../constants/ThingerStyles";
import { setPassword, setUser } from "../../actions/login";
import H2Text from "../texts/H2";

type Props = {
  onSetUser: (user: string) => Dispatch,
  onSetPassword: (password: string) => Dispatch,
  onAddDevicePress: () => Dispatch
};

class LoginScreen extends React.Component<Props> {
  render() {
    return (
      <Screen>
        <View
          style={{
            flex: 1,
            backgroundColor: DARK_BLUE,
            paddingTop: PADDING * 2
          }}
        >
          <Image
            source={require("../../assets/icon.png")}
            style={{
              height: 150,
              width: 150,
              margin: MARGIN * 2,
              alignSelf: "center"
            }}
          />
          <Kohana
            style={{
              backgroundColor: COLOR_BACKGROUND,
              flex: 0,
              margin: MARGIN * 1.5,
              marginBottom: 4,
              borderRadius: BORDER_RADIUS
            }}
            label={"Username"}
            iconClass={Icon}
            iconName={"person"}
            iconColor={DARK_BLUE}
            labelStyle={{ color: COLOR_TEXT_INPUT, fontWeight: "100" }}
            inputStyle={{ color: DARK_BLUE }}
            autoCapitalize="none"
            useNativeDriver
            onChangeText={this.props.onSetUser}
          />
          <Kohana
            style={{
              backgroundColor: COLOR_BACKGROUND,
              flex: 0,
              margin: MARGIN * 1.5,
              marginTop: 0,
              borderRadius: BORDER_RADIUS
            }}
            label={"Password"}
            iconClass={Icon}
            iconName={"lock"}
            iconColor={DARK_BLUE}
            labelStyle={{ color: COLOR_TEXT_INPUT, fontWeight: "100" }}
            inputStyle={{ color: DARK_BLUE }}
            secureTextEntry={true}
            useNativeDriver
            onChangeText={text => this.props.onSetPassword(text)}
          />
          <TouchableOpacity
            onPress={null}
            style={{
              alignItems: "center",
              margin: MARGIN * 1.5,
              marginTop: 0,
              backgroundColor: LIGHT_GREEN,
              padding: PADDING,
              borderRadius: BORDER_RADIUS
            }}
          >
            <H2Text>Login</H2Text>
          </TouchableOpacity>
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddDevicePress: () => dispatch(navigate("Scanner")),
    onSetUser: user => dispatch(setUser(user)),
    onSetPassword: password => dispatch(setPassword(password))
  };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
