import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { PADDING } from "../../constants/ThingerStyles";

export default class ItemList extends React.Component {
  propsType = {
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    style: PropTypes.object,
    onPress: PropTypes.func
  };

  renderContent() {
    const { style, id, value } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.id}>{id}</Text>
        <View style={styles.valueContainer}>{value}</View>
      </View>
    );
  }

  render() {
    const { onPress } = this.props;

    return onPress ? (
      <TouchableOpacity onPress={onPress}>
        {this.renderContent()}
      </TouchableOpacity>
    ) : (
      this.renderContent()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: PADDING,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1"
  },
  id: {
    fontSize: 20,
    color: "#444"
  },
  valueContainer: {
    flex: 1,
    alignItems: "flex-end"
  }
});
