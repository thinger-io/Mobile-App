import React from "react";
import Resource from "./Resource";
import styles from "./styles";
import { FlatList, Text, View } from "react-native";
import { Output } from "./values/Output";
import Header from "./layaouts/ComplexResourceHeader";
import Footer from "./layaouts/OutputResourceFooter";

export class ComplexOutputResource extends Resource {
  render() {
    const { name, data, onChartClick } = this.props;
    return (
      <View style={styles.resource}>
        <Header title={name} />
        <FlatList
          style={styles.body}
          data={Object.keys(data)}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.key}>{item}</Text>
              <Output value={data[item]} />
            </View>
          )}
          keyExtractor={item => item}
        />
        <Footer
          onUpdateClick={this.handleOnUpdateClick}
          onChartClick={onChartClick}
        />
      </View>
    );
  }
}
