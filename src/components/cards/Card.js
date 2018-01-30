import { StyleSheet, View } from "react-native";
import React from "react";

export default class Card extends React.Component {
  render() {
    const { header, body, footer } = this.props;

    return (
      <View style={styles.card}>
        <View>{header}</View>
        <View style={{ marginVertical: 15 }}>{body}</View>
        <View>{footer}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    overflow: "hidden"
  }
});
