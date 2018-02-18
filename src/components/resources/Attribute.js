import React from "react";
import { SEPARATOR_PADDING } from "../../constants/ThingerStyles";
import styles from "../../constants/ThingerStyles";
import { Text, View } from "react-native";
import { Output } from "./values/Output";
import { Input } from "./values/Input";
import * as PropTypes from "prop-types";
import { Run } from "./values/Run";

export const IN = "in";
export const OUT = "out";
export const RUN = "run";

export default class Attribute extends React.Component {
  renderValue() {
    const { id, value, inputValue, type, onChange, onRun } = this.props;
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
        return <Run onPress={onRun} />;
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
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[isSimple ? styles.h1 : styles.h2, { flex: 1 }]}
        >
          {id}
        </Text>
        {this.renderValue()}
      </View>
    );
  }
}

Attribute.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf([IN, OUT, RUN]).isRequired,
  value: PropTypes.any,
  inputValue: PropTypes,
  isSimple: PropTypes.bool,
  onChange: PropTypes.func,
  onRun: PropTypes.func
};
