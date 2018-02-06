import React from "react";
import { SEPARATOR_PADDING } from "../../styles/common";
import styles from "../../styles/common";
import { Text, View } from "react-native";
import { Output } from "./values/Output";
import { Input } from "./values/Input";
import * as PropTypes from "prop-types";

export const IN = "in";
export const OUT = "out";
export const RUN = "run";

export default class Attribute extends React.Component {
  renderValue() {
    const { id, value, inputValue, type, onChange } = this.props;
    switch (type) {
      case "out":
        return <Output value={value} />;
      case "in":
        return (
          <Input
            value={value}
            inputValue={inputValue}
            onChange={value => onChange(id, value)}
          />
        );
      case "run":
        return null;
    }
  }

  render() {
    const { id, isSimple } = this.props;

    return (
      <View
        style={{
          paddingVertical: SEPARATOR_PADDING,
          flexDirection: "row"
        }}
      >
        <Text style={[isSimple ? styles.h1 : styles.h2, {flex: 1}]}>{id}</Text>
        {this.renderValue()}
      </View>
    );
  }
}

Attribute.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  inputValue: PropTypes.string.isRequired,
  type: PropTypes.oneOf([IN, OUT, RUN]).isRequired,
  isSimple: PropTypes.bool,
  onChange: PropTypes.func
};
