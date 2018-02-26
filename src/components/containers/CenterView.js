//@flow

import * as React from "react";
import { View } from "react-native";

type Props = {
  children: React.Node,
  style?: { [string]: mixed }
};

export default class CenterView extends React.Component<Props> {
  render() {
    const { style } = this.props;

    return (
      <View style={[{ flexDirection: "row" }, style]}>
        <View style={{ flex: 1 }} />
        {this.props.children}
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}
