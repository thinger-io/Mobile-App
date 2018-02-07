import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

export class Run extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginRight: 15,
        }}
        onPress={onPress}
      >
        <Icon name="play" size={22} style={{ color: "green" }} />
      </TouchableOpacity>
    );
  }
}

Run.propTypes = {
  onPress: PropTypes.func.isRequired
};
