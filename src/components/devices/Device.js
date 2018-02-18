import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  FONT_SIZE_H1,
  FONT_SIZE_H2,
  FONT_SIZE_P,
  MARGIN
} from "../../constants/ThingerStyles";
import * as PropTypes from "prop-types";
import { DARK_BLUE } from "../../constants/ThingerColors";

export default class Device extends React.Component {
  render() {
    const { name, user, onClick } = this.props;

    return (
      <TouchableOpacity onPress={onClick}>
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <Text style={styles.device}>{name}</Text>
          <Text style={styles.user}>{user}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Device.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  device: {
    fontSize: FONT_SIZE_H2,
    color: DARK_BLUE
  },
  user: {
    fontSize: FONT_SIZE_P,
    color: DARK_BLUE
  }
});
