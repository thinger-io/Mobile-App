import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as PropTypes from "prop-types";

export default class Label extends React.Component {
  render() {
    const { id, value, color, enabled, onClick } = this.props;

    return (
      <TouchableOpacity onPress={() => onClick(id)}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 15
          }}
        >
          <Icon
            name={enabled ? "check-circle" : "circle-o"}
            size={25}
            style={{
              color: color
            }}
          />

          <View style={{ paddingLeft: 20 }}>
            <Text style={{ fontSize: 20 }}>{id}</Text>
            <Text style={{ fontSize: 12 }}>{value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

Label.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
