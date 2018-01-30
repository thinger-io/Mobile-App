import React from "react";
import { LineChart, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import {View, StyleSheet, Text, TouchableOpacity, FlatList} from "react-native";
import { getColorByIndex } from "../../utils/colors";
import Card from "../cards/Card";
import Header from "../cards/headers/Header";
import Icon from "react-native-vector-icons/FontAwesome";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleOnButtonClick = this.handleOnButtonClick.bind(this);
  }

  handleOnButtonClick(key) {
    const { enabledItems, onDeselectItem, onSelectItem } = this.props;
    enabledItems[key] ? onDeselectItem(key) : onSelectItem(key);
  }

  render() {
    const { resource, enabledItems, data } = this.props;

    const contentInset = { top: 20, bottom: 20 };

    let dataToShow = {};
    Object.entries(enabledItems).map(([key, value]) => {
      if (value === true)
        dataToShow = Object.assign(dataToShow, { [key]: data[key] });
    });
    const allDataPoints = [].concat.apply([], Object.values(dataToShow));
    const min = Math.min(...allDataPoints);
    const max = Math.max(...allDataPoints);

    return (
      <View style={{ flex: 1 }}>
        <View style={{ margin: 10, marginBottom: 0 }}>
          <Card
            header={<Header title={resource} />}
            body={
              <View style={{ height: 200, flexDirection: "row" }}>
                <YAxis
                  style={{ top: 0, bottom: 0 }}
                  dataPoints={allDataPoints}
                  contentInset={contentInset}
                />
                <View style={{ flex: 1 }}>
                  {Object.entries(enabledItems).map(([key, value], index) => {
                    if (value === true)
                      return (
                        <LineChart
                          style={StyleSheet.absoluteFill}
                          dataPoints={data[key]}
                          contentInset={contentInset}
                          curve={shape.curveNatural}
                          showGrid={false}
                          animate={false}
                          gridMax={max}
                          gridMin={min}
                          svg={{
                            stroke: getColorByIndex(index * 2),
                            strokeWidth: 5
                          }}
                        />
                      );
                  })}
                </View>
              </View>
            }
          />
        </View>
        <FlatList
          data={Object.keys(enabledItems)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => this.handleOnButtonClick(item)}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 15
                  }}
                >
                  <Icon
                    name={enabledItems[item] ? "check-circle" : "circle-o"}
                    size={25}
                    style={{
                      color: getColorByIndex(index * 2)
                    }}
                  />

                  <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>{item}</Text>
                    <Text style={{ fontSize: 12 }}>
                      {data[item].slice(-1)[0]}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    );
  }
}
