// @flow

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Login from './Login';
import Devices from './Devices';

const mapStateToProps = state => ({
  user: state.auth.username,
});

function UserScreen({ user, navigation }) {
  if (user) {
    return <Devices isUserDevices navigation={navigation} />;
  }
  return <Login />;
}

UserScreen.propTypes = {
  user: PropTypes.string,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
UserScreen.defaultProps = {
  user: undefined,
};

export default connect(mapStateToProps)(UserScreen);
