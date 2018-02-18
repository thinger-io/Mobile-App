import React from "react";
import { Text, TouchableOpacity } from "react-native";
import * as PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { DARK_BLUE } from "../../../constants/ThingerColors";

export class Run extends React.Component {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginRight: 15
        }}
        onPress={onPress}
      >
        <Icon name="paper-plane" size={22} style={{ color: DARK_BLUE }} />
      </TouchableOpacity>
    );
  }
}

Run.propTypes = {
  onPress: PropTypes.func.isRequired
};
