//@flow

import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  id: string,
  value: string | number | boolean,
  color: string,
  selected: boolean,
  locked: boolean,
  onClick: (id: string) => any
};

export default class Label extends React.Component<Props> {
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
            color: locked ? "gray" : color
          }}
        />

        <View style={{ paddingLeft: 20 }}>
          <Text style={{ fontSize: 20, color: locked ? "gray" : color }}>
            {id}
          </Text>
          <Text style={{ fontSize: 12, color: locked ? "gray" : color }}>
            {value.toString()}
          </Text>
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
