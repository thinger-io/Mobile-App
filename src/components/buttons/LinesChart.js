import Button from "./Button";
import React from "react";

export default class LinesChartButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button color={"#c25b5e"} onClick={onClick}>
        Lines
      </Button>
    );
  }
}
