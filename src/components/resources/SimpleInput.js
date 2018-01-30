import Resource from "./Resource";
import styles from "./styles";
import { Text, View } from "react-native";
import React from "react";
import { Input } from "./values/Input";
import Footer from "./layaouts/InputResourceFooter";

export class SimpleInputResource extends Resource {
  handleOnChangeText(text, type) {
    this.setState({ input: text });
    const { name, onItemChange } = this.props;
    const value = Resource.castStringInput(text, type);
    onItemChange(name, value);
  }

  render() {
    const { name, value } = this.props;
    return (
      <View style={styles.resource}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <Input
            value={this.state.input}
            placeholder={value}
            onChangeText={text => this.handleOnChangeText(text, typeof value)}
          />
        </View>
        <Footer
          onUpdateClick={this.handleOnUpdateClick}
          onPostClick={this.handleOnPostClick}
        />
      </View>
    );
  }
}
