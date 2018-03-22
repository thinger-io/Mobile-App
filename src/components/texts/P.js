/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */

import React from "react";
import { Text } from "react-native";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";

type Props = React$ElementProps<typeof Text>;

export default class PText extends React.Component<Props> {
  render() {
    const { style, children, ...props } = this.props;
    return (
      <Text
        style={[{ color: "black", fontSize: FONT_SIZE_P }, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
}
