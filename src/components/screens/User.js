//@flow

import { connect } from "react-redux";
import React from "react";
import Login from "./Login";
import Devices from "./Devices";
import { getDevicesFromUser } from "../../actions/fetch";
import type { Dispatch } from "../../types/Dispatch";
import type { LoginState } from "../../types/State";

type Props = {
  login: LoginState,
  dispatch: Dispatch
};

type State = {
  isLogged: boolean,
}

class UserScreen extends React.Component<Props, State> {

  state = {
    isLogged: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.isLogged && nextProps.login.isLogged) {
      nextProps.dispatch(
        getDevicesFromUser(
          nextProps.login.server,
          nextProps.login.user,
          nextProps.login.accessToken
        )
      );
      return {
        isLogged: true
      }
    }
  }

  render() {
    const { login } = this.props;
    if (login.isLogged && login.server && login.user && login.accessToken) {
      return <Devices />;
    } else {
      return <Login />;
    }
  }
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

export default connect(mapStateToProps)(UserScreen);
