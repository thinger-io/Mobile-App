import React from "react";
import { StyleSheet, Switch, TextInput } from "react-native";

export class Input extends React.Component {
  render() {
    const { value, inputValue, onChange } = this.props;
    switch (typeof value) {
      case "string":
        return (
          <TextInput
            style={styles.input}
            value={inputValue}
            placeholder={value}
            onChangeText={text => onChange(text)}
          />
        );
      case "number":
        return (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={inputValue}
            placeholder={value.toString()}
            onChangeText={text => onChange(text)}
          />
        );
      case "boolean":
        return (
          <Switch value={inputValue} onValueChange={value => onChange(value)} />
        );
      default:
        return null;
    }
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
