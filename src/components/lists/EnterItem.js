import React from "react";
import ItemList from "./ItemList";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

export default class EnterItem extends React.Component {
  propsType = {
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <ItemList
        id={this.props.id}
        value={<Icon name="arrow-right" size={20} style={{ color: "#444" }} />}
        onPress={this.props.onPress}
      />
    );
  }
}
