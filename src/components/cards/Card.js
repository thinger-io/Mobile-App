import { View, StyleSheet } from "react-native";
import React from "react";
import { BORDER_RADIUS, MARGIN, PADDING } from "../../constants/ThingerStyles";
import * as PropTypes from "prop-types";

export default class Card extends React.Component {
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
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.7,
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

Card.propTypes = {
  children: PropTypes.any,
  body: PropTypes.any,
  footer: PropTypes.any
};
