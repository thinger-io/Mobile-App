import React from "react";
import * as PropTypes from "prop-types";
import TIOStyles, { MARGIN } from "../styles/ThingerStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text } from "react-native";

export default class ErrorMessage extends React.Component {
  propsType = {
    message: PropTypes.string.isRequired,
    icon: PropTypes.string
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.props.icon ? (
          <Icon
            name={this.props.icon}
            size={30}
            style={{ color: "black", margin: MARGIN }}
          />
        ) : null}

        <Text style={TIOStyles.h2}>{this.props.message}</Text>
      </View>
    );
  }
}
