import React from "react";
import styles from "../../styles/common";
import Card from "../Card";
import { FlatList, Text, View } from "react-native";
import ChartButton from "../buttons/Chart";
import UpdateButton from "../buttons/Update";
import PostButton from "../buttons/Post";
import Attribute from "./Attribute";
import update from "update-immutable";
import * as PropTypes from "prop-types";

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
    this.handleOnUpdateClick = this.handleOnUpdateClick.bind(this);
    this.handleOnPostClick = this.handleOnPostClick.bind(this);
    this.handleOnChangeAttribute = this.handleOnChangeAttribute.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = { data: props.data };
  }

  handleOnUpdateClick() {
    const { id, onUpdateClick } = this.props;
    onUpdateClick(id);
  }

  handleOnPostClick() {
    const { id, data, onPostClick } = this.props;
    const castedData = castInputData(this.state.data.in, data.in);
    onPostClick(id, castedData).then(() =>
      this.setState({ input: this.props.data.in })
    );
  }

  handleOnChangeAttribute(id, value) {
    this.setState(
      update(this.state, { data: { in: { [id]: { $set: value } } } })
    );
  }

  renderAttributes() {
    const { id, data } = this.props;

    if (typeof Object.values(data)[0] !== "object") {
      return (
        <Attribute
          id={id}
          value={Object.values(data)[0]}
          inputValue={this.state.data.in}
          type={Object.keys(data)[0]}
          isSimple
          onChange={(id, value) => this.setState({ data: { in: value } })}
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
          <Text style={styles.h1}>{id}</Text>
          <FlatList
            data={mappedData}
            renderItem={({ item }) => (
              <Attribute
                id={item.key}
                value={data[item.type][item.key]}
                inputValue={
                  this.state.data.hasOwnProperty("in")
                    ? this.state.data.in[item.key]
                    : null
                }
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
    const { data, onChartClick } = this.props;
    const buttons = [<UpdateButton onClick={this.handleOnUpdateClick} />];
    if (data.hasOwnProperty("out"))
      buttons.push(<ChartButton onClick={onChartClick} />);
    if (data.hasOwnProperty("in"))
      buttons.push(<PostButton onClick={this.handleOnPostClick} />);
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
    out: PropTypes.any,
    run: PropTypes.any
  }).isRequired,
  onPostClick: PropTypes.func,
  onUpdateClick: PropTypes.func,
  onChartClick: PropTypes.func
};

export default Resource;
