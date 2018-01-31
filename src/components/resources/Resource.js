import React from "react";
import styles from "../../utils/styles";
import Card from "../cards/Card";
import { FlatList, Text, View } from "react-native";
import { Output } from "./values/Output";
import { Input } from "./values/Input";
import ChartButton from "./buttons/Chart";
import UpdateButton from "./buttons/Update";
import PostButton from "./buttons/Post";

class Resource extends React.Component {
  constructor(props) {
    super(props);
    this.state = { input: {} };
    this.handleOnUpdateClick = this.handleOnUpdateClick.bind(this);
    this.handleOnPostClick = this.handleOnPostClick.bind(this);
  }

  handleOnUpdateClick() {
    const { name, onUpdateClick } = this.props;
    onUpdateClick(name);
  }

  handleOnPostClick() {
    const { name, onPostClick } = this.props;
    onPostClick(name);
    this.setState({ input: {} });
  }

  handleOnChangeResource(text, type) {
    this.setState({ input: text });
    const { name, onItemChange } = this.props;
    const value = Resource.castStringInput(text, type);
    onItemChange(name, value);
  }

  handleOnChangeItem(item, text, type) {
    const input = Object.assign({}, this.state.input);
    input[item] = text;
    this.setState({ input });
    const { name, onItemChange } = this.props;
    for (const key of Object.keys(input)) {
      const value = Resource.castStringInput(input[key], type);
      onItemChange(name, key, value);
    }
  }

  static castStringInput(value, type) {
    switch (type) {
      case "number":
        return Number(value.replace(",", "."));
      default:
        return value;
    }
  }

  render() {
    const { name, data, onChartClick, simple, output } = this.props;
    return (
      <Card>
        {simple ? (
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            {output ? (
              <Output value={data} />
            ) : (
              <Input
                value={this.state.input}
                placeholder={data}
                onChangeText={text =>
                  this.handleOnChangeResource(text, typeof data)
                }
              />
            )}
          </View>
        ) : (
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>{name}</Text>
            </View>
            <FlatList
              style={styles.body}
              data={Object.keys(data)}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <Text style={styles.key}>{item}</Text>
                  {output ? (
                    <Output value={data[item]} />
                  ) : (
                    <Input
                      value={this.state.input[item]}
                      placeholder={data[item]}
                      onChangeText={text =>
                        this.handleOnChangeItem(item, text, typeof data[item])
                      }
                    />
                  )}
                </View>
              )}
            />
          </View>
        )}

        {output ? (
          <View style={styles.footer}>
            <ChartButton onClick={onChartClick} />
            <UpdateButton onClick={this.handleOnUpdateClick} />
          </View>
        ) : (
          <View style={styles.footer}>
            <UpdateButton onClick={this.handleOnUpdateClick} />
            <PostButton onClick={this.handleOnPostClick} />
          </View>
        )}
      </Card>
    );
  }
}


export default Resource;
