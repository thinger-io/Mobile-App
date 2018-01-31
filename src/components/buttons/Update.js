import Button from "./Button";
import React from "react";

export default class UpdateButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return (
      <Button color={"#08c"} onClick={onClick}>
        Update
      </Button>
    );
  }
}
