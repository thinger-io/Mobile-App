//@flow

import * as React from "react";
import type { Attribute } from "../../types/Attribute";
import type { SimpleResource } from "../../types/Resource";
import RunAttribute from "./RunAttribute";
import InputAttribute from "./InputAttribute";
import OutputAttribute from "./OutputAttribute";
import ResourceComponent from "./Resource";

type Props = {
  resource: string,
  data: SimpleResource,
  isFetching: boolean,
  onPostClick: (id: string, data: Attribute) => any,
  onUpdateClick: (id: string) => any,
  onChartClick: () => any,
  onRun: () => any
};

type State = {
  in?: Attribute,
  posted: boolean
};

const defaultState: State = {
  in: undefined,
  posted: false
};

class SimpleResourceView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = defaultState;
    (this: any).handleOnPostClick = this.handleOnPostClick.bind(this);
    (this: any).handleOnChangeAttribute = this.handleOnChangeAttribute.bind(
      this
    );
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (prevState.posted) return defaultState;
    else return null;
  }

  handleOnPostClick() {
    const { resource, data, onPostClick } = this.props;
    if (this.state.in === undefined) {
      onPostClick(resource, data.in);
    } else if (
      typeof data.in === "number" &&
      typeof this.state.in === "string"
    ) {
      onPostClick(resource, Number(String(this.state.in).replace(",", ".")));
    } else {
      onPostClick(resource, this.state.in);
    }
    this.setState({ in: this.state.in, posted: true });
  }

  handleOnChangeAttribute(id: string, value: Attribute) {
    const { onPostClick } = this.props;
    this.setState({ in: value, posted: false });
    if (typeof value === "boolean") onPostClick(id, value);
  }

  renderAttributes() {
    const { resource, data, onRun } = this.props;

    // Run resource
    if (Object.keys(data).length === 0) {
      return <RunAttribute id={resource} isSimple onRun={onRun} />;
    }

    // Input Resource
    if (data.hasOwnProperty("in")) {
      return (
        <InputAttribute
          id={resource}
          value={data.in}
          inputValue={this.state.in}
          isSimple
          onChange={this.handleOnChangeAttribute}
        />
      );
    }

    // Output Resource
    if (data.hasOwnProperty("out")) {
      return <OutputAttribute id={resource} value={data.out} isSimple />;
    }
  }

  render() {
    const {
      resource,
      data,
      isFetching,
      onUpdateClick,
      onChartClick
    } = this.props;
    return (
      <ResourceComponent
        isFetching={isFetching}
        onUpdateClick={
          data.hasOwnProperty("out") ? () => onUpdateClick(resource) : undefined
        }
        onChartClick={
          data.hasOwnProperty("out") && typeof data.out === "number"
            ? onChartClick
            : undefined
        }
        onPostClick={
          data.hasOwnProperty("in") && typeof data.in !== "boolean"
            ? () => this.handleOnPostClick()
            : undefined
        }
      >
        {this.renderAttributes()}
      </ResourceComponent>
    );
  }
}

export default SimpleResourceView;
