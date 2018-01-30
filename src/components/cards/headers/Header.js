import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    flex: 1
  }
});
