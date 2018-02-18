import { FONT_SIZE_P, PADDING } from "../../constants/ThingerStyles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import ThingerStyles from "../../constants/ThingerStyles";

export default class RoundedButton extends React.Component {
  propTypes = {
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    const { color, text, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[{ backgroundColor: color }, styles.container]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: PADDING / 2,
    paddingHorizontal: PADDING
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: FONT_SIZE_P
  }
});
