import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as PropTypes from "prop-types";

export default class Label extends React.Component {
  renderView() {
    const { id, value, color, selected, locked } = this.props;

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15
        }}
      >
        <Icon
          name={!locked ? (selected ? "check-circle" : "circle-o") : "ban"}
          size={25}
          style={{
            color: color
          }}
        />

        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 20 }}>{id}</Text>
          <Text style={{ fontSize: 12 }}>{value.toString()}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { id, locked, onClick } = this.props;

    return !locked ? (
      <TouchableOpacity onPress={() => onClick(id)}>
        {this.renderView()}
      </TouchableOpacity>
    ) : (
      this.renderView()
    );
  }
}

Label.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  color: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  locked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};
