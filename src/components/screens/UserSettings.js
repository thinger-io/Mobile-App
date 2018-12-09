// @flow

import { connect } from 'react-redux';
import React from 'react';
import { ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MARGIN } from '../../constants/ThingerStyles';
import RoundedButton from '../buttons/RoundedButton';
import CenterView from '../containers/CenterView';
import Screen from '../containers/Screen';
import List from '../lists/List';
import OutputItem from '../lists/OutputItem';
import NavigationBar from '../navigation/NavigationBar';
import type { LoginState } from '../../types/State';
import { logOut } from '../../actions/login';
import type { Dispatch } from '../../types/Dispatch';
import { LIGHT_RED } from '../../constants/ThingerColors';

type Props = {
  login: LoginState,
  onLogOut: () => Dispatch,
};

class UserSettings extends React.Component<Props> {
  render() {
    const { login, onLogOut } = this.props;
    return (
      <Screen navigationBar={<NavigationBar title="Settings" />}>
        {login && (
          <ScrollView>
            <List>
              <OutputItem name="User" value={login.user != null ? login.user : ''} />
              <OutputItem name="Server" value={login.server != null ? login.server : ''} />
            </List>

            <CenterView style={{ margin: MARGIN }}>
              <RoundedButton color={LIGHT_RED} text="Log out" onPress={() => onLogOut()} />
            </CenterView>
          </ScrollView>
        )}
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  login: state.login,
});

const mapDispatchToProps = dispatch => ({
  onLogOut: () => {
    dispatch(logOut());
    // return dispatch(goBack());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSettings);
