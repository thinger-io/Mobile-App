import { View, StyleSheet } from "react-native";
import React from "react";
import { BORDER_RADIUS, MARGIN, PADDING } from "../../styles/TIOStyles";
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
    backgroundColor: "white",
    margin: MARGIN,
    marginBottom: MARGIN / 2,
    borderRadius: BORDER_RADIUS,
    overflow: "hidden"
  },
  body: {
    padding: PADDING
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 40,
  }
});

Card.propTypes = {
  children: PropTypes.any,
  body: PropTypes.any,
  footer: PropTypes.any
};
