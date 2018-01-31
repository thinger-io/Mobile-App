import Button from "./Button";
import React from "react";

export default class PostButton extends React.Component {
  render() {
    const { onClick } = this.props;
    return <Button color={"#27c24c"} onClick={onClick}>Post</Button>;
  }
}
