import React from "react";
import styles from "../styles";
import { Switch, TextInput } from "react-native";

export class Input extends React.Component {
  render() {
    const { value, placeholder, onChangeText } = this.props;
    switch (typeof placeholder) {
      case "string":
        return (
          <TextInput
            style={styles.input}
            value={value}
            placeholder={placeholder}
            onChangeText={text => onChangeText(text)}
          />
        );
      case "number":
        return (
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={value}
            placeholder={placeholder.toString()}
            onChangeText={text => onChangeText(text)}
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
