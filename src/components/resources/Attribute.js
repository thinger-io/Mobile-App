import React from "react";
import { PADDING, SEPARATOR_PADDING } from "../../styles/common";
import styles from "../../styles/common";
import { Text, View } from "react-native";
import { Output } from "./values/Output";
import { Input } from "./values/Input";
import * as PropTypes from "prop-types";

export default class Attribute extends React.Component {
  render() {
    const { id, value, inputValue, isOutput, isSimple, onChange } = this.props;
    return (
      <View
        style={{
          paddingVertical: SEPARATOR_PADDING,
          flexDirection: "row"
        }}
      >
        <Text style={isSimple ? styles.h1 : styles.h2}>{id}</Text>
        {isOutput ? (
          <Output value={value} />
        ) : (
          <Input
            value={inputValue}
            placeholder={value}
            onChange={value => onChange(id, value)}
          />
        )}
      </View>
    );
  }
}

Attribute.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  inputValue: PropTypes.string.isRequired,
  isOutput: PropTypes.bool,
  isSimple: PropTypes.bool,
  onChange: PropTypes.func
};
