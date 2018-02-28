//@flow

import React from "react";
import { StyleSheet, Text } from "react-native";
import AttributeView from "./Attribute";
import type { Attribute } from "../../types/Attribute";

type Props = {
  id: string,
  isSimple?: boolean,
  value: Attribute
};

export default class OutputAttribute extends React.Component<Props> {
  renderValue() {
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

  render() {
    const { id, isSimple } = this.props;

    return (
      <AttributeView id={id} isSimple={isSimple}>
        {this.renderValue()}
      </AttributeView>
    );
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
