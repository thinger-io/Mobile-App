import styles from "../../styles/common";
import { Text, TouchableOpacity } from "react-native";
import React from "react";

export default class Button extends React.Component {
  render() {
    const { color, onClick } = this.props;

    return (
      <TouchableOpacity
        style={{
          backgroundColor: color,
          flex: 1,
          padding: 10,
          alignItems: "center"
        }}
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
