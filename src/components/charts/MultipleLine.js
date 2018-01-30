import React from "react";
import { LineChart, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { View, StyleSheet, Text } from "react-native";
import { getColorByIndex } from "../../utils/colors";
import Card from "../cards/Card";
import Header from "../cards/headers/Header";

export default class extends React.PureComponent {
  render() {
    const { resource, data } = this.props;
    const keys = Object.keys(data);

    const allDataPoints = [].concat.apply([], Object.values(data));
    const min = Math.min(...allDataPoints);
    const max = Math.max(...allDataPoints);
    const contentInset = { top: 20, bottom: 20 };

    return (
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
              {keys.map((key, index) => {
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
        footer={
          <View>
            {keys.map((key, index) => {
              return (
                <Text style={{ color: getColorByIndex(index * 2) }}>
                  {key}: {data[key].slice(-1)[0]}
                </Text>
              );
            })}
          </View>
        }
      />
    );
  }
}
