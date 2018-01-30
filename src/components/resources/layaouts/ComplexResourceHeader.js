import styles from "../styles";
import { Text, View } from "react-native";
import React from "react";

export default class ComplexResourceHeader extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
}
