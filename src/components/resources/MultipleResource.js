//@flow

import React from "react";
import { FlatList, Text, View } from "react-native";
import type { Attribute } from "../../types/Attribute";
import type { MultipleResource } from "../../types/Resource";
import InputAttribute from "./InputAttribute";
import OutputAttribute from "./OutputAttribute";
import ResourceComponent from "./Resource";
import update from "immutability-helper";
import H1Text from "../texts/H1";

type Props = {
  resource: string,
  data: MultipleResource,
  isFetching: boolean,
  onPostClick: (
    resource: string,
    data: { [attribute: string]: Attribute }
  ) => any,
  onUpdateClick: (resource: string) => any,
  onChartClick: () => any
};

type State = {
  in: { [attribute: string]: Attribute }
};

class MultipleResourceView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.data.in) this.state = { in: props.data.in };
    (this: any).handleOnPostClick = this.handleOnPostClick.bind(this);
    (this: any).handleOnChangeAttribute = this.handleOnChangeAttribute.bind(
      this
    );
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!nextProps.isFetching && nextProps.data.in)
      this.state.in = nextProps.data.in;
  }

  handleOnPostClick() {
    const { resource, data, onPostClick } = this.props;
    if (data.in) {
      const castedData = castInputData(this.state.in, data.in);
      onPostClick(resource, castedData);
    }
  }

  handleOnChangeAttribute(attribute: string, value: Attribute) {
    this.setState(update(this.state, { in: { [attribute]: { $set: value } } }));
  }

  renderAttributes() {
    const { resource, data } = this.props;

    const inputs = data.in
      ? Object.keys(data.in).map(key => ({ type: "in", key }))
      : [];
    const outputs = data.out
      ? Object.keys(data.out).map(key => ({ type: "out", key }))
      : [];

    return (
      <View>
        <H1Text ellipsizeMode="tail" numberOfLines={1}>
          {resource}
        </H1Text>
        <FlatList
          data={outputs.concat(inputs)}
          renderItem={({ item }) => {
            return item.type === "in" && data.in && this.state.in ? (
              <InputAttribute
                id={item.key}
                value={data.in[item.key]}
                inputValue={this.state.in[item.key]}
                onChange={this.handleOnChangeAttribute}
              />
            ) : item.type === "out" && data.out ? (
              <OutputAttribute id={item.key} value={data.out[item.key]} />
            ) : null;
          }}
        />
      </View>
    );
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
        onUpdateClick={data.out ? () => onUpdateClick(resource) : undefined}
        onChartClick={data.out ? onChartClick : undefined}
        onPostClick={data.in ? () => this.handleOnPostClick() : undefined}
      >
        {this.renderAttributes()}
      </ResourceComponent>
    );
  }
}

function castInputData(
  editedData: { [attribute: string]: Attribute },
  data: { [attribute: string]: Attribute }
): { [attribute: string]: Attribute } {
  let result = {};
  Object.entries(editedData).forEach(([key, value]) => {
    if (typeof data[key] === "number" && typeof value === "string") {
      result = Object.assign(result, {
        [key]: Number(String(value).replace(",", "."))
      });
    } else {
      result = Object.assign(result, { [key]: value });
    }
  });
  return result;
}

export default MultipleResourceView;
