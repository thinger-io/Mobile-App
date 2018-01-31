import Button from "./Button";
import React from "react";

export default class ChartButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button color={"#F48FB1"} onClick={onClick}>
        Chart
      </Button>
    );
  }
}
