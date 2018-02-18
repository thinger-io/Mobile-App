import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

export default class CenterView extends React.Component {
  propsType = {
    style: PropTypes.object
  };

  render() {
    const { style } = this.props;

    return (
      <View style={[{ flexDirection: "row" }, style]}>
        <View style={{ flex: 1 }} />
        {this.props.children}
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
