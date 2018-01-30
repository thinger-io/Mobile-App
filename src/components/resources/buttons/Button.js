import styles from "../styles";
import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default class Button extends React.Component {
  render() {
    const { text, color, onClick } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onClick}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
