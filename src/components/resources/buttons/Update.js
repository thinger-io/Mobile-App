import Button from "./Button";
import React from "react";

export default class UpdateButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return <Button text={"Update"} color={"#08c"} onClick={onClick} />;
  }
}
