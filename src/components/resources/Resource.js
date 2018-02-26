//@flow

import * as React from "react";
import Card from "../cards/Card";
import Button from "../cards/Button";
import {
  LIGHT_BLUE,
  LIGHT_GREEN,
  LIGHT_PINK
} from "../../constants/ThingerColors";
import type { Attribute } from "../../types/Attribute";

type Props = {
  children: React.Node,
  isFetching: boolean,
  onPostClick?: (id: string, data: Attribute) => any,
  onUpdateClick?: (id: string) => any,
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

export function castStringToNumber(value: string) {
  return Number(String(value).replace(",", "."));
}

export default ResourceComponent;
