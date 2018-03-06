//@flow

import React from "react";
import ItemList from "./ItemList";
import { StyleSheet, Text } from "react-native";
import { DARK_BLUE } from "../../constants/ThingerColors";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";

type Props = {
  name: string,
  value: string
};

export default class OutputItem extends React.Component<Props> {
  render() {
    const { name, value } = this.props;

    return (
      <ItemList name={name} value={<Text style={styles.value}>{value}</Text>} />
    );
  }
}

const styles = StyleSheet.create({
  value: {
    textAlign: "right",
    color: "gray",
    fontSize: FONT_SIZE_P
  }
});
