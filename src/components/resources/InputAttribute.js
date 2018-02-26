//@flow

import React from "react";
import { StyleSheet, Switch, TextInput } from "react-native";
import AttributeView from "./Attribute";
import type { Attribute } from "../../types/Attribute";

type Props = {
  id: string,
  isSimple?: boolean,
  value: Attribute,
  inputValue: Attribute,
  onChange: (id: string, value: Attribute) => any
};

export default class InputAttribute extends React.Component<Props> {
  renderValue() {
    const { id, value, inputValue, onChange } = this.props;
    switch (typeof value) {
      case "string":
        return (
          <TextInput
            style={styles.input}
            value={inputValue}
            placeholder={value}
            onChangeText={text => onChange(id, text)}
          />
        );
      case "number":
        return (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputValue}
            placeholder={value.toString()}
            onChangeText={text => onChange(id, text)}
          />
        );
      case "boolean":
        return (
          <Switch
            value={inputValue}
            onValueChange={value => onChange(id, value)}
          />
        );
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
  input: {
    fontSize: 18,
    marginRight: 10,
    flex: 1,
    textAlign: "right",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 5
  }
});
