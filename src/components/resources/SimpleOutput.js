import Resource from "./Resource";
import styles from "./styles";
import { Text, View } from "react-native";
import React from "react";
import { Output } from "./values/Output";
import Footer from "./layaouts/OutputResourceFooter";

export class SimpleOutputResource extends Resource {
  render() {
    const { name, value, onChartClick } = this.props;
    return (
      <View style={styles.resource}>
        <View style={styles.resource}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            <Output value={value} />
          </View>
        </View>
        <Footer
          onUpdateClick={this.handleOnUpdateClick}
          onChartClick={onChartClick}
        />
      </View>
    );
  }
}
