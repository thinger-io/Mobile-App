import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../styles/common";
import Card from "../Card";
import * as PropTypes from "prop-types";

export default class Device extends React.Component {
  render() {
    const { name, user, onClick } = this.props;

    return (
      <TouchableOpacity onPress={onClick}>
        <Card>
          <Text style={styles.h1}>{name}</Text>
          <Text style={styles.h2}>{user}</Text>
        </Card>
      </TouchableOpacity>
    );
  }
}

Device.propTypes = {
  name: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
