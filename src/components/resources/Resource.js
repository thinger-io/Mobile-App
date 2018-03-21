//@flow

import * as React from "react";
import Card from "../cards/Card";
import Button from "../cards/Button";
import {
  LIGHT_BLUE,
  LIGHT_GREEN,
  LIGHT_PINK
} from "../../constants/ThingerColors";

type Props = {
  children: React.Node,
  isFetching: boolean,
  onPostClick?: () => any,
  onUpdateClick?: () => any,
  onChartClick?: () => any
};

class ResourceComponent extends React.Component<Props> {
  renderButtons() {
    const { onChartClick, onPostClick, onUpdateClick, isFetching } = this.props;
    const buttons = [];
    if (onUpdateClick !== undefined) {
      buttons.push(
        <Button
          text={"Update"}
          color={LIGHT_BLUE}
          isLoading={isFetching}
          onClick={onUpdateClick}
        />
      );
    }
    if (onChartClick !== undefined) {
      buttons.push(
        <Button text={"Charts"} color={LIGHT_PINK} onClick={onChartClick} />
      );
    }
    if (onPostClick !== undefined)
      buttons.push(
        <Button
          color={LIGHT_GREEN}
          text={"Post"}
          isLoading={isFetching}
          onClick={onPostClick}
        />
      );
    return buttons;
  }

  render() {
    return <Card body={this.props.children} footer={this.renderButtons()} />;
  }
}

export default ResourceComponent;
