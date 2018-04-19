//@flow

import { FONT_SIZE_P, PADDING } from "../../constants/ThingerStyles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import type { Style } from "../../types/Style";

type Props = {
  color: string,
  text: string,
  onPress: () => any
};

export default class RoundedButton extends React.Component<Props> {
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
    paddingHorizontal: PADDING,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "gray",
    elevation: 1
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: FONT_SIZE_P
  }
});
