/**
 * Mobile App for the Thinger.io Internet of Things Platform
 * https://thinger.io
 * @flow
 */

import React from "react";
import type { Style } from "../../types/Style";
import {FONT_SIZE_H2} from "../../constants/ThingerStyles";
import ThingerText from "./P";

type Props = {
  children: string,
  style?: Style
};

export default class H2Text extends React.Component<Props> {
  render() {
    return (
      <ThingerText
        style={{ fontSize: FONT_SIZE_H2, ...this.props.style }}
      >
        {this.props.children}
      </ThingerText>
    );
  }
}
