import React from "react";
import { StyleSheet, Text } from "react-native";

export class Output extends React.Component {
  render() {
    const { value } = this.props;
    switch (typeof value) {
      case "string":
      case "number":
        return <Text style={styles.value}>{value.toString()}</Text>;
      case "boolean":
        if (value) return <Text style={styles.value}>{"ON"}</Text>;
        else return <Text style={styles.value}>{"OFF"}</Text>;
      default:
        return null;
    }
  }
}

const styles = StyleSheet.create({
  value: {
    fontSize: 18,
    marginRight: 15,
    textAlign: "right",
    flex: 1
  }
});
