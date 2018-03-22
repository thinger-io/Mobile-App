//@flow

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PADDING } from "../../constants/ThingerStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  COLOR_TAB_BAR_ACTIVE,
  COLOR_TAB_BAR_INACTIVE,
  DIVIDER_COLOR
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
                      style={{ color: COLOR_TAB_BAR_ACTIVE, paddingBottom: 3 }}
                    />,
                    <Text style={{ color: COLOR_TAB_BAR_ACTIVE }}>{title}</Text>
                  ]
                : [
                    <Icon
                      name={icon}
                      size={20}
                      style={{
                        color: COLOR_TAB_BAR_INACTIVE,
                        paddingBottom: 3
                      }}
                    />,
                    <Text style={{ color: COLOR_TAB_BAR_INACTIVE }}>
                      {title}
                    </Text>
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
    padding: PADDING / 2,
    alignItems: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: DIVIDER_COLOR
  },
  button: {
    flex: 1,
    alignItems: "center"
  }
});
