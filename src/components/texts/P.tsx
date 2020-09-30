/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 */

import React from 'react';
import { Text, TextProps } from 'react-native';
import { FONT_SIZE_P } from '../../constants/ThingerStyles';
import { COLOR_TEXT } from '../../constants/ThingerColors';

export default class PText extends React.Component<TextProps> {
  render() {
    const { style, children, ...props } = this.props;
    return (
      <Text style={[{ color: COLOR_TEXT, fontSize: FONT_SIZE_P }, style]} {...props}>
        {children}
      </Text>
    );
  }
}
