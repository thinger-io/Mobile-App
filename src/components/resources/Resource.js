import React from "react";
import styles from "../../styles/common";
import Card from "../Card";
import { FlatList, Text, View } from "react-native";
import ChartButton from "../buttons/Chart";
import UpdateButton from "../buttons/Update";
import PostButton from "../buttons/Post";
import Attribute from "./Attribute";
import update from "update-immutable";

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: this.props.data };
    this.handleOnUpdateClick = this.handleOnUpdateClick.bind(this);
    this.handleOnPostClick = this.handleOnPostClick.bind(this);
    this.handleOnChangeAttribute = this.handleOnChangeAttribute.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = { input: props.data };
  }

  handleOnUpdateClick() {
    const { id, onUpdateClick } = this.props;
    onUpdateClick(id);
  }

  handleOnPostClick() {
    const { id, data, simple, onPostClick } = this.props;
    const castedData = castInputData(this.state.input, data, simple);
    onPostClick(id, castedData).then(() => this.clearInputs());
  }

  handleOnChangeAttribute(id, value) {
    this.setState(update(this.state, { input: { [id]: { $set: value } } }));
  }

  clearInputs() {
    this.setState({ input: this.props.data });
  }

  render() {
    const { id, data, onChartClick, simple, output } = this.props;

    return (
      <Card
        body={
          simple ? (
            <Attribute
              id={id}
              value={data}
              inputValue={this.state.input}
              isOutput={output}
              isSimple
              onChange={(id, value) => this.setState({ input: value })}
            />
          ) : (
            <View>
              <Text style={styles.h1}>{id}</Text>
              <FlatList
                data={Object.keys(data)}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <Attribute
                    id={item}
                    value={data[item]}
                    inputValue={this.state.input[item]}
                    isOutput={output}
                    onChange={this.handleOnChangeAttribute}
                  />
                )}
              />
            </View>
          )
        }
        footer={
          output
            ? [
                <ChartButton onClick={onChartClick} />,
                <UpdateButton onClick={this.handleOnUpdateClick} />
              ]
            : [
                <UpdateButton onClick={this.handleOnUpdateClick} />,
                <PostButton onClick={this.handleOnPostClick} />
              ]
        }
      />
    );
  }
}

function castInputData(editedData, data, isSimple) {
  if (isSimple) return castAttributeValue(editedData, typeof data);
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

export default Resource;
