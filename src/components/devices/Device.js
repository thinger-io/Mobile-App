import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "../../styles/ThingerStyles";
import * as PropTypes from "prop-types";

export default class Device extends React.Component {
  render() {
    const { name, user, onClick } = this.props;

    return (
      <TouchableOpacity onPress={onClick}>
        <View style={{ backgroundColor: "white", padding: 15 }}>
          <Text style={styles.h1}>{name}</Text>
          <Text style={styles.h2}>{user}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Device.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
