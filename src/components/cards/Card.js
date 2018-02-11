import { View, StyleSheet } from "react-native";
import React from "react";
import { BORDER_RADIUS, MARGIN, PADDING } from "../../styles/ThingerStyles";
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
        <View style={{ alignItems: "center" }}>
          {footer &&
            footer.length > 0 && (
              <View
                style={{
                  height: 1,
                  width: "90%",
                  backgroundColor: "#CED0CE"
                }}
              />
            )}
          <View style={styles.footer}>{footer}</View>
        </View>
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
    shadowOpacity: 0.3,
    shadowRadius: 3
  },
  body: {
    padding: PADDING
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});

Card.propTypes = {
  children: PropTypes.any,
  body: PropTypes.any,
  footer: PropTypes.any
};
