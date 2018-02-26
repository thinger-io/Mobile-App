//@flow

import * as React from "react";
import type { Attribute } from "../../types/Attribute";
import type { SimpleResource } from "../../types/Resource";
import RunAttribute from "./RunAttribute";
import InputAttribute from "./InputAttribute";
import OutputAttribute from "./OutputAttribute";
import ResourceComponent from "./Resource";

type Props = {
  id: string,
  data: SimpleResource,
  isFetching: boolean,
  onPostClick: (id: string, data: Attribute) => any,
  onUpdateClick: (id: string) => any,
  onChartClick: () => any,
  onRun: (id: string) => any
};

type State = {
  in: Attribute
};

class SimpleResourceView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { in: props.data.in };
    (this: any).handleOnPostClick = this.handleOnPostClick.bind(this);
    (this: any).handleOnChangeAttribute = this.handleOnChangeAttribute.bind(
      this
    );
  }

  handleOnPostClick() {
    const { id, data, onPostClick } = this.props;
    if (typeof data.in === "number" && typeof this.state.in === "string") {
      onPostClick(id, Number(String(data.in).replace(",", ".")));
    } else {
      onPostClick(id, data.in);
    }
  }

  handleOnChangeAttribute(id: string, value: Attribute) {
    const { onPostClick } = this.props;
    this.setState({ in: value });
    if (typeof value === "boolean") onPostClick(id, value);
  }

  renderAttributes() {
    const { id, data, onRun } = this.props;

    // Run resource
    if (typeof data === {}) {
      return <RunAttribute id={id} isSimple onRun={() => onRun(id)} />;
    }

    // Input Resource
    if (data.hasOwnProperty("in")) {
      return (
        <InputAttribute
          id={id}
          value={data.in}
          inputValue={this.state.in}
          isSimple
          onChange={this.handleOnChangeAttribute}
        />
      );
    }

    // Output Resource
    if (data.hasOwnProperty("out")) {
      return <OutputAttribute id={id} value={data.out} isSimple />;
    }
  }

  render() {
    const { id, data, isFetching, onUpdateClick, onChartClick } = this.props;
    return (
      <ResourceComponent
        isFetching={isFetching}
        onUpdateClick={data.hasOwnProperty("out") ? () => onUpdateClick(id) : undefined}
        onChartClick={data.hasOwnProperty("out") ? onChartClick : undefined}
        onPostClick={data.hasOwnProperty("in")? this.handleOnPostClick : undefined}
      >
        {this.renderAttributes()}
      </ResourceComponent>
    );
  }
}

export default SimpleResourceView;
