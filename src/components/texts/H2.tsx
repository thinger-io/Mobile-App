/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 */

import React from 'react';
import { FONT_SIZE_H2 } from '../../constants/ThingerStyles';
import { Text, TextProps } from 'react-native';
import { COLOR_TEXT } from '../../constants/ThingerColors';

export default class H2Text extends React.Component<TextProps> {
  render() {
    const { style, children, ...props } = this.props;
    return (
      <Text style={[{ color: COLOR_TEXT, fontSize: FONT_SIZE_H2 }, style]} {...props}>
        {children}
      </Text>
    );
  }
}
