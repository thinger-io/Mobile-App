//@flow

import React from "react";
import { StyleSheet, Text } from "react-native";

type Props = {
  value: string | number | boolean
};

export class Output extends React.Component<Props> {
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
