import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { PADDING } from "../../constants/ThingerStyles";

export default class MainContainer extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>{this.props.children}</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: PADDING
  }
});
