//@flow

import * as React from "react";
import { View, StyleSheet } from "react-native";
import { BORDER_RADIUS, MARGIN, PADDING } from "../../constants/ThingerStyles";

type Props = {
  children?: React.Node,
  body?: React.Node,
  footer?: React.Node
};

export default class Card extends React.Component<Props> {
  render() {
    const { children, body, footer } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.body}>
          {children}
          {body}
        </View>
        <View style={styles.footer}>{footer}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: MARGIN,
    marginBottom: MARGIN / 2,
    borderRadius: BORDER_RADIUS,
    elevation: 4,
    shadowOffset: { width: 1, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 3
  },
  body: {
    padding: PADDING
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    overflow: "hidden"
  }
});
