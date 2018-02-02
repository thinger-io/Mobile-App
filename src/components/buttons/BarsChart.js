import Button from "./Button";
import React from "react";

export default class BarsChartButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button color={"#484dc2"} onClick={onClick}>
        Bars
      </Button>
    );
  }
}
