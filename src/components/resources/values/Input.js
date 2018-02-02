import React from "react";
import { StyleSheet, Switch, TextInput } from "react-native";

export class Input extends React.Component {
  render() {
    const { value, placeholder, onChange } = this.props;
    switch (typeof placeholder) {
      case "string":
        return (
          <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={text => onChange(text)}
          />
        );
      case "number":
        return (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={value}
            placeholder={placeholder.toString()}
            onChangeText={text => onChange(text)}
          />
        );
      // TODO
      case "boolean":
        return <Switch value={value} />;
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
