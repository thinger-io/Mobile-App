//@flow

import { connect } from "react-redux";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard
} from "react-native";
import React from "react";
import Screen from "../containers/Screen";
import { navigate } from "../../actions/nav";
import type { Dispatch } from "../../types/Dispatch";
import {
  COLOR_BACKGROUND,
  COLOR_TEXT_INPUT,
  DARK_BLUE,
  LIGHT_GREEN
} from "../../constants/ThingerColors";
import { Kohana } from "react-native-textinput-effects";
import Icon from "react-native-vector-icons/MaterialIcons";
import { BORDER_RADIUS, MARGIN, PADDING } from "../../constants/ThingerStyles";
import { setPassword, setUser } from "../../actions/login";
import H2Text from "../texts/H2";
import { loginFromApi } from "../../actions/fetch";
import type { LoginAction } from "../../actions/login";
import { ToastActionsCreators } from "react-native-redux-toast";

type Props = {
  username: string,
  password: string,
  server: string,
  isFetching: boolean,
  onSetUser: (user: string) => Dispatch,
  onSetPassword: (password: string) => Dispatch,
  onSetServer: (server: string) => Dispatch,
  onAddDevicePress: () => Dispatch,
  onLogin: (username: string, password: string, server: string) => Dispatch
};

class LoginScreen extends React.Component<Props> {
  render() {
    return (
      <Screen>
        <KeyboardAvoidingView
          behavior="padding"
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
              marginHorizontal: MARGIN * 1.5,
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
              marginHorizontal: MARGIN * 1.5,
              marginVertical: 4,
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
          <Kohana
            style={{
              backgroundColor: COLOR_BACKGROUND,
              flex: 0,
              marginHorizontal: MARGIN * 1.5,
              borderRadius: BORDER_RADIUS
            }}
            label={"Server"}
            iconClass={Icon}
            iconName={"http"}
            iconColor={DARK_BLUE}
            labelStyle={{ color: COLOR_TEXT_INPUT, fontWeight: "100" }}
            inputStyle={{ color: DARK_BLUE }}
            autoCapitalize="none"
            useNativeDriver
            defaultValue={this.props.server}
            onChangeText={this.props.onSetServer}
          />
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              this.props.onLogin(
                this.props.username,
                this.props.password,
                this.props.server
              );
            }}
            style={{
              alignItems: "center",
              margin: MARGIN * 1.5,
              marginTop: 4,
              height: 55,
              backgroundColor: LIGHT_GREEN,
              padding: PADDING,
              borderRadius: BORDER_RADIUS
            }}
          >
            {this.props.isFetching ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              <H2Text>Login</H2Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.login.user,
    password: state.login.password,
    server: state.login.server,
    isFetching: state.login.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onQRScannerPress: () => dispatch(navigate("Scanner")),
    onSetUser: user => dispatch(setUser(user)),
    onSetPassword: password => dispatch(setPassword(password)),
    onSetServer: user => dispatch(setUser(user)),
    onLogin: async (user, password, server) => {
      const response: LoginAction = await dispatch(
        loginFromApi(server, user, password)
      );
      if (response.type === "RECEIVE_SESSION_FAILURE")
        dispatch(
          ToastActionsCreators.displayError("Wrong email or password", 1000)
        );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
