import React from "react";
import Resource from "./Resource";
import styles from "./styles";
import { FlatList, Text, View } from "react-native";
import { Input } from "./values/Input";
import Header from "./layaouts/ComplexResourceHeader";
import Footer from "./layaouts/InputResourceFooter";

export class ComplexInputResource extends Resource {
  handleOnChangeText(item, text, type) {
    const input = Object.assign({}, this.state.input);
    input[item] = text;
    this.setState({ input });
    const { name, onItemChange } = this.props;
    for (const key of Object.keys(input)) {
      const value = Resource.castStringInput(input[key], type);
      onItemChange(name, key, value);
    }
  }

  render() {
    const { name, data } = this.props;
    return (
      <View style={styles.resource}>
        <Header title={name} />
        <FlatList
          style={styles.body}
          data={Object.keys(data)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.key}>{item}</Text>
              <Input
                value={this.state.input[item]}
                placeholder={data[item]}
                onChangeText={text =>
                  this.handleOnChangeText(item, text, typeof data[item])
                }
              />
            </View>
          )}
          keyExtractor={item => item}
        />
        <Footer
          onUpdateClick={this.handleOnUpdateClick}
          onPostClick={this.handleOnPostClick}
        />
      </View>
    );
  }
}
