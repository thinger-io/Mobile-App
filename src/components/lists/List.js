import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONT_SIZE_H1, PADDING } from "../../constants/ThingerStyles";
import PropTypes from "prop-types";

export default class List extends React.Component {
  propsType = {
    title: PropTypes.string.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.title && (
          <Text style={styles.title}>{this.props.title}</Text>
        )}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: PADDING
  },
  title: {
    fontSize: FONT_SIZE_H1,
    paddingVertical: PADDING,
    fontWeight: "800"
  }
});
