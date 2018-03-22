/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */

import React from "react";
import { Text } from "react-native";
import { FONT_SIZE_P } from "../../constants/ThingerStyles";
import { COLOR_TEXT } from "../../constants/ThingerColors";

type Props = React$ElementProps<typeof Text>;

export default class PText extends React.Component<Props> {
  render() {
    const { style, children, ...props } = this.props;
    return (
      <Text
        style={[{ color: COLOR_TEXT, fontSize: FONT_SIZE_P }, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }
}
