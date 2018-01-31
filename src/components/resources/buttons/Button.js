import styles from "../../../utils/styles";
import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default class Button extends React.Component {
  render() {
    const { color, onClick } = this.props;

    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color }]}
        onPress={onClick}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18
          }}
        >
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}
