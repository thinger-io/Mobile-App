//@flow

import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { DARK_BLUE } from "../../../constants/ThingerColors";

type Props = {
  onPress: () => any
};

export class Run extends React.Component<Props> {
  render() {
    const { onPress } = this.props;

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "flex-end",
          marginRight: 15
        }}
        onPress={onPress}
      >
        <Icon name="paper-plane" size={22} style={{ color: DARK_BLUE }} />
      </TouchableOpacity>
    );
  }
}
