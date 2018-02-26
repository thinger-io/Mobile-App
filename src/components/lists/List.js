//@flow

import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FONT_SIZE_H1, PADDING } from "../../constants/ThingerStyles";

type Props = {
  title?: string,
  children: React.Node
};

export default class List extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.title && (
          <Text style={styles.title}>{this.props.title}</Text>
        )}
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: PADDING
  },
  title: {
    fontSize: FONT_SIZE_H1,
    paddingVertical: PADDING,
    fontWeight: "800"
  }
});
