//@flow

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PADDING } from "../../constants/ThingerStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  COLOR_ACTIVE,
  COLOR_INACTIVE,
  DARK_BLUE
} from "../../constants/ThingerColors";
import type { Chart } from "../../types/Chart";

type Props = {
  tabs: Array<{
    icon: string,
    title: Chart,
    onPress: () => any,
    active: boolean
  }>
};

export default class TabBar extends React.Component<Props> {
  render() {
    const { tabs } = this.props;

    return (
      <View style={styles.container}>
        {tabs.map(({ icon, title, onPress, active }) => {
          return (
            <TouchableOpacity onPress={onPress} style={styles.button}>
              {active
                ? [
                    <Icon
                      name={icon}
                      size={22}
                      style={{ color: COLOR_ACTIVE }}
                    />,
                    <Text style={{ color: COLOR_ACTIVE }}>{title}</Text>
                  ]
                : [
                    <Icon
                      name={icon}
                      size={22}
                      style={{ color: COLOR_INACTIVE }}
                    />,
                    <Text style={{ color: COLOR_INACTIVE }}>{title}</Text>
                  ]}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: PADDING,
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    flex: 1,
    alignItems: "center"
  }
});
