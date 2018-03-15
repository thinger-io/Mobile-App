/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */

import React from "react";
import { Text } from "react-native";
import type { Style } from "../../types/Style";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";

type Props = {
  children: string,
  style?: Style
};

export default class PText extends React.Component<Props> {
  render() {
    return (
      <Text
        style={{ color: "black", fontSize: FONT_SIZE_P, ...this.props.style }}
      >
        {this.props.children}
      </Text>
    );
  }
}
