//@flow

import React from "react";
import ItemList from "./ItemList";
import { StyleSheet, TextInput } from "react-native";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";
import {
  COLOR_TEXT_INPUT,
  COLOR_TEXT_PLACEHOLDER,
  DARK_BLUE
} from "../../constants/ThingerColors";

type Props = {
  name: string,
  value: string,
  placeholder?: string,
  onChangeText?: (text: string) => any
};

export default class TextInputItem extends React.Component<Props> {
  render() {
    const { name, value, placeholder, onChangeText } = this.props;

    return (
      <ItemList
        name={name}
        value={
          <TextInput
            underlineColorAndroid={"transparent"}
            style={styles.value}
            placeholderTextColor={COLOR_TEXT_PLACEHOLDER}
            value={value}
            placeholder={placeholder}
            onChangeText={onChangeText}
          />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  value: {
    fontSize: FONT_SIZE_P,
    color: COLOR_TEXT_INPUT,
    textAlign: "right",
    padding: 0
  }
});
