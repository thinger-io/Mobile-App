/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 */

import React from 'react';
import { FONT_SIZE_H1, FONT_WEIGHT_H1 } from '../../constants/ThingerStyles';
import { Text, TextProps } from 'react-native';
import { COLOR_TEXT } from '../../constants/ThingerColors';

export default class H1Text extends React.Component<TextProps> {
  render() {
    const { style, children, ...props } = this.props;
    return (
      <Text
        style={[
          {
            color: COLOR_TEXT,
            fontSize: FONT_SIZE_H1,
            fontWeight: FONT_WEIGHT_H1,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }
}
