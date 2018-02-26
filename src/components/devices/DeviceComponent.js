//@flow

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT_SIZE_H2, FONT_SIZE_P } from "../../constants/ThingerStyles";
import { DARK_BLUE } from "../../constants/ThingerColors";

type Props = {
  name: string,
  user: string,
  onClick: () => any
};

export default class DeviceComponent extends React.Component<Props> {
  render() {
    const { name, user, onClick } = this.props;

    return (
      <TouchableOpacity onPress={onClick}>
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <Text style={styles.device}>{name}</Text>
          <Text style={styles.user}>{user}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  device: {
    fontSize: FONT_SIZE_H2,
    color: DARK_BLUE
  },
  user: {
    fontSize: FONT_SIZE_P,
    color: DARK_BLUE
  }
});
