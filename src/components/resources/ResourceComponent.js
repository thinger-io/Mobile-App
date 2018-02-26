//@flow

import React from "react";
import styles from "../../constants/ThingerStyles";
import Card from "../cards/Card";
import { FlatList, Text, View } from "react-native";
import AttributeComponent from "./AttributeComponent";
import update from "update-immutable";
import Button from "../cards/Button";
import {
  LIGHT_BLUE,
  LIGHT_GREEN,
  LIGHT_PINK
} from "../../constants/ThingerColors";
import type { Attribute } from "../../types/Attribute";
import type { Resource } from "../../types/Resource";

type Props = {
  id: string,
  data: Resource,
  isFetching: boolean,
  onPostClick: (id: string, data: Attribute) => any,
  onUpdateClick: (id: string) => any,
  onChartClick: () => any,
  onRun: (id: string) => any
};

type State = {
  in: Attribute
};

class ResourceComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.data.in) this.state = { in: props.data.in };
    (this: any).handleOnUpdateClick = this.handleOnUpdateClick.bind(this);
    (this: any).handleOnPostClick = this.handleOnPostClick.bind(this);
    (this: any).handleOnChangeAttribute = this.handleOnChangeAttribute.bind(
      this
    );
  }

  componentWillReceiveProps(props: Props) {
    if (!props.isFetching && props.data.in) this.state.in = props.data.in;
  }

  handleOnUpdateClick() {
    const { id, onUpdateClick } = this.props;
    onUpdateClick(id);
  }

  handleOnPostClick() {
    const { id, data, onPostClick } = this.props;
    const castedData = castInputData(this.state.in, data.in);
    onPostClick(id, castedData);
  }

  handleOnChangeAttribute(id: string, value: Attribute) {
    const { onPostClick, data } = this.props;
    if (typeof Object.values(data) !== "object") {
      this.setState({ in: value });
      if (typeof value === "boolean") onPostClick(id, value);
    } else {
      this.setState(update(this.state, { in: { [id]: { $set: value } } }));
    }
  }

  renderAttributes() {
    const { id, data, onRun } = this.props;

    // Run resource
    if (typeof data === {}) {
      return (
        <AttributeComponent
          id={id}
          isSimple
          type={"run"}
          onRun={() => onRun(id)}
        />
      );
    }

    // Input ResourceComponent
    if (
      data.hasOwnProperty("in") &&
      (typeof data.in === "string" ||
        typeof data.in === "number" ||
        typeof data.in === "boolean")
    ) {
      return (
        <AttributeComponent
          id={id}
          value={data.in}
          inputValue={this.state.in}
          type={"in"}
          isSimple
          onChange={this.handleOnChangeAttribute}
        />
      );
    }

    // Output ResourceComponent
    if (
      data.hasOwnProperty("out") &&
      (typeof data.out === "string" ||
        typeof data.out === "number" ||
        typeof data.out === "boolean")
    ) {
      return (
        <AttributeComponent id={id} value={data.out} type={"out"} isSimple />
      );
    }

    // Multiple ResourceComponent
    if (
      (data.hasOwnProperty("in") && typeof data.in === "object") ||
      (data.hasOwnProperty("out") && typeof data.out === "object")
    ) {
      const inputs =
        data.in && typeof data.in === "object"
          ? Object.keys(data.in).map(key => ({ type: "in", key }))
          : [];
      const outputs =
        data.out && typeof data.out === "object"
          ? Object.keys(data.out).map(key => ({ type: "out", key }))
          : [];

      const resources = outputs.concat(inputs);

      return (
        <View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.h1}>
            {id}
          </Text>
          <FlatList
            data={resources}
            renderItem={({ item }) => {
              return item.type === "in" ? (
                <AttributeComponent
                  id={item.key}
                  value={data.in[item.key]}
                  inputValue={this.state.in[item.key]}
                  type={"in"}
                  onChange={this.handleOnChangeAttribute}
                />
              ) : (
                <AttributeComponent
                  id={item.key}
                  value={data.out[item.key]}
                  type={"out"}
                />
              );
            }}
          />
        </View>
      );
    }
  }

  renderButtons() {
    const { data, isFetching, onChartClick } = this.props;
    const buttons = [];
    if (data.hasOwnProperty("out")) {
      buttons.push(
        <Button
          text={"Update"}
          color={LIGHT_BLUE}
          isLoading={isFetching}
          onClick={this.handleOnUpdateClick}
        />
      );
      buttons.push(
        <Button text={"Charts"} color={LIGHT_PINK} onClick={onChartClick} />
      );
    }
    if (data.hasOwnProperty("in") && typeof data.in !== "boolean")
      buttons.push(
        <Button
          color={LIGHT_GREEN}
          text={"Post"}
          isLoading={isFetching}
          onClick={this.handleOnPostClick}
        />
      );
    return buttons;
  }

  render() {
    return (
      <Card body={this.renderAttributes()} footer={this.renderButtons()} />
    );
  }
}

function castInputData(editedData, data) {
  if (typeof data !== "object")
    return castAttributeValue(editedData, typeof data);
  else {
    return Object.assign.apply(
      {},
      Object.keys(editedData).map(key => ({
        [key]: castAttributeValue(editedData[key], typeof data[key])
      }))
    );
  }
}

function castAttributeValue(value, type) {
  switch (type) {
    case "number":
      return Number(String(value).replace(",", "."));
  }
  return value;
}

export default ResourceComponent;
