//@flow

import React from "react";
import { SEPARATOR_PADDING } from "../../constants/ThingerStyles";
import styles from "../../constants/ThingerStyles";
import { Text, View } from "react-native";
import { Output } from "./values/Output";
import { Input } from "./values/Input";
import { Run } from "./values/Run";
import type { Attribute } from "../../types/Attribute";

type Props = {
  id: string,
  type: "in" | "out" | "run",
  value?: Attribute,
  inputValue?: Attribute,
  isSimple?: boolean,
  onChange?: (id: string, value: Attribute) => any,
  onRun?: () => any
};

export default class AttributeComponent extends React.Component<Props> {
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
            onChange={value => {
              onChange && onChange(id, value);
            }}
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
