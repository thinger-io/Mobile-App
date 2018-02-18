import React from "react";
import styles from "../../constants/ThingerStyles";
import Card from "../cards/Card";
import { FlatList, Text, View } from "react-native";
import Attribute, { RUN } from "./Attribute";
import update from "update-immutable";
import * as PropTypes from "prop-types";
import Button from "../cards/Button";
import {
  LIGHT_BLUE,
  LIGHT_GREEN,
  LIGHT_PINK
} from "../../constants/ThingerColors";

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { in: props.data.in };
    this.handleOnUpdateClick = this.handleOnUpdateClick.bind(this);
    this.handleOnPostClick = this.handleOnPostClick.bind(this);
    this.handleOnChangeAttribute = this.handleOnChangeAttribute.bind(this);
  }

  componentWillReceiveProps(props) {
    if (!props.isFetching) this.state.in = props.data.in;
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

  handleOnChangeAttribute(id, value) {
    const { onPostClick } = this.props;
    if (this.isSimple()) {
      this.setState({ in: value });
      if (typeof value === "boolean") onPostClick(id, value);
    } else {
      this.setState(update(this.state, { in: { [id]: { $set: value } } }));
    }
  }

  isRunType() {
    return !Object.keys(this.props.data).length;
  }

  isSimple() {
    const { data } = this.props;
    return typeof Object.values(data)[0] !== "object";
  }

  renderAttributes() {
    const { id, data, onRun } = this.props;
    if (this.isRunType()) {
      return <Attribute id={id} isSimple type={RUN} onRun={() => onRun(id)} />;
    } else if (this.isSimple()) {
      return (
        <Attribute
          id={id}
          value={Object.values(data)[0]}
          inputValue={this.state.in}
          type={Object.keys(data)[0]}
          isSimple
          onChange={this.handleOnChangeAttribute}
        />
      );
    } else {
      const mappedData = [].concat.apply(
        [],
        Object.entries(data).map(([type, value]) =>
          Object.keys(value).map(key => ({ type, key }))
        )
      );
      return (
        <View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.h1}>
            {id}
          </Text>
          <FlatList
            data={mappedData}
            renderItem={({ item }) => (
              <Attribute
                id={item.key}
                value={data[item.type][item.key]}
                inputValue={this.state.in ? this.state.in[item.key] : null}
                type={item.type}
                onChange={this.handleOnChangeAttribute}
              />
            )}
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
          icon="paper-plane"
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

Resource.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    in: PropTypes.any,
    out: PropTypes.any
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  onPostClick: PropTypes.func,
  onUpdateClick: PropTypes.func,
  onChartClick: PropTypes.func
};

export default Resource;
