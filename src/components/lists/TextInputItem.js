//@flow

import React from "react";
import ItemList from "./ItemList";
import { StyleSheet, TextInput } from "react-native";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";
import { DARK_BLUE } from "../../constants/ThingerColors";

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
            style={styles.value}
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
    flex: 1,
    fontSize: FONT_SIZE_P,
    color: DARK_BLUE
  }
});
