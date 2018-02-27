//@flow

import React from "react";
import { LineChart, XAxis, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { getColorByIndex } from "../../utils/colors";
import { dateToSeconds } from "../../utils/dates";
import type { StreamingState } from "../../types/State";

const contentInset = { top: 20, bottom: 20 };

type Props = {
  chartedAttributes: Array<[string, boolean]>,
  streaming: StreamingState
};

export default class extends React.Component<Props> {
  renderChart() {
    const { chartedAttributes, streaming } = this.props;
    const arrayOfValues = chartedAttributes.map(
      ([key, value]) => (value ? streaming.data[key] : [])
    );
    const dataPoints = [].concat.apply([], arrayOfValues);

    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);

    return (
      <View style={{ flex: 1, flexDirection: "row", margin: 15 }}>
        <YAxis
          style={{ top: 0, bottom: 0 }}
          dataPoints={dataPoints}
          contentInset={contentInset}
          labelStyle={{ color: "white" }}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {chartedAttributes.map(([key, value], index) => {
            if (value === true)
              return (
                <LineChart
                  style={[StyleSheet.absoluteFill, { marginBottom: 20 }]}
                  dataPoints={streaming.data[key]}
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
          <XAxis
            values={streaming.timestamp}
            chartType={XAxis.Type.LINE}
            labelStyle={{ color: "white" }}
            formatLabel={value => dateToSeconds(Number(value))}
          />
        </View>
      </View>
    );
  }

  render() {
    const { streaming } = this.props;
    return Object.keys(streaming).length && streaming.timestamp.length > 1 ? (
      this.renderChart()
    ) : (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <ActivityIndicator size="large" color={"white"} />
      </View>
    );
  }
}
