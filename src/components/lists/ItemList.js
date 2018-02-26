//@flow

import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT_SIZE_P, PADDING } from "../../constants/ThingerStyles";
import { DARK_BLUE, DIVIDER_COLOR } from "../../constants/ThingerColors";

type Props = {
  name: string,
  value: React.Node,
  style?: { [string]: mixed },
  onPress?: () => any
};

export default class ItemList extends React.Component<Props> {
  renderContent() {
    const { style, name, value } = this.props;

    return (
      <View style={[styles.container, style]}>
        <Text style={styles.id}>{name}</Text>
        <View style={styles.valueContainer}>{value}</View>
      </View>
    );
  }

  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.border}>
        {onPress ? (
          <TouchableOpacity onPress={onPress}>
            {this.renderContent()}
          </TouchableOpacity>
        ) : (
          this.renderContent()
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER_COLOR
  },
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: PADDING
  },
  id: {
    fontSize: FONT_SIZE_P,
    color: DARK_BLUE
  },
  valueContainer: {
    flex: 1,
    alignItems: "flex-end"
  }
});
