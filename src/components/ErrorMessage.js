import React from "react";
import * as PropTypes from "prop-types";
import ThingerStyles, { MARGIN } from "../styles/ThingerStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, Button } from "react-native";
import { DARK_BLUE } from "../styles/ThingerColors";

export default class ErrorMessage extends React.Component {
  propsType = {
    message: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onPressButton: PropTypes.func
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {this.props.icon && (
          <Icon
            name={this.props.icon}
            size={30}
            style={{ color: "black", margin: MARGIN }}
          />
        )}
        <Text style={[ThingerStyles.h2, { margin: MARGIN }]}>
          {this.props.message}
        </Text>
        {this.props.onPressButton && (
          <View
            style={{
              borderRadius: 5,
              backgroundColor: DARK_BLUE
            }}
          >
            <Button
              onPress={() => this.props.onPressButton()}
              title="Reload"
              color="white"
            />
          </View>
        )}
      </View>
    );
  }
}
