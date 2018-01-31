import { StyleSheet, View } from "react-native";
import React from "react";

export default class Card extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          padding: this.props.hasPadding ? 15 : 0,
          margin: 10,
          marginBottom: 5,
          overflow: "hidden"
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
