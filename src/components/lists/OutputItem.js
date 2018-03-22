//@flow

import React from "react";
import ItemList from "./ItemList";
import { StyleSheet } from "react-native";
import { COLOR_TEXT_INACTIVE } from "../../constants/ThingerColors";
import PText from "../texts/P";

type Props = {
  name: string,
  value: string
};

export default class OutputItem extends React.Component<Props> {
  render() {
    const { name, value } = this.props;

    return (
      <ItemList
        name={name}
        value={<PText style={styles.value}>{value}</PText>}
      />
    );
  }
}

const styles = StyleSheet.create({
  value: {
    textAlign: "right",
    color: COLOR_TEXT_INACTIVE
  }
});
