import Button from "./Button";
import React from "react";

export default class PieChartButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return <Button color={"#53c29c"} onClick={onClick}>Pie</Button>;
  }
}
