//@flow

import React from "react";
import AttributeView from "./Attribute";
import type { Attribute } from "../../types/Attribute";
import PText from "../texts/P";

type Props = {
  id: string,
  isSimple?: boolean,
  value: Attribute
};

export default class OutputAttribute extends React.Component<Props> {
  renderValue() {
    const { value } = this.props;
    switch (typeof value) {
      case "string":
      case "number":
        return <PText>{value.toString()}</PText>;
      case "boolean":
        if (value) return <PText>{"ON"}</PText>;
        else return <PText>{"OFF"}</PText>;
      default:
        return null;
    }
  }

  render() {
    const { id, isSimple } = this.props;

    return (
      <AttributeView id={id} isSimple={isSimple}>
        {this.renderValue()}
      </AttributeView>
    );
  }
}
