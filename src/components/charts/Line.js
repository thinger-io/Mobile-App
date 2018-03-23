//@flow

import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { getColorByIndex } from "../../utils/colors";
import type { StreamingState } from "../../types/State";
import { PADDING } from "../../constants/ThingerStyles";
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine
} from "victory-native";
import { getMinutes, getSeconds } from "../../utils/dates";
import { calculateDomain } from "../../utils/charts";

type Props = {
  chartedAttributes: Array<[string, boolean]>,
  streaming: StreamingState,
  height: number,
  width: number
};

export default class extends React.Component<Props> {
  renderChart() {
    const { chartedAttributes, streaming, height, width } = this.props;

    const data = chartedAttributes
      .map(([key, value], color) => [key, value, color])
      .filter(([_, value]) => value)
      .map(([key, value, color]) => {
        return {
          data: streaming.data[key].slice(-20).map((y, index) => ({
            x: streaming.timestamp.slice(-20)[index],
            y
          })),
          color: getColorByIndex(color * 2)
        };
      });

    if (!data.length)
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white" }}>Select at least one resource!</Text>
        </View>
      );

    const sequences: Array<Array<number>> = data.map(sequence =>
      sequence.data.map(point => point.y)
    );

    const allPoints: Array<number> = [].concat.apply([], sequences);
    const { min, max } = calculateDomain(allPoints);
    return (
      <VictoryChart
        width={width}
        height={height}
        domain={{ y: [min, max] }}
        domainPadding={{ y: 20 }}
        padding={{
          top: PADDING,
          bottom: PADDING * 2,
          left: PADDING * 4,
          right: PADDING * 2
        }}
      >
        <VictoryGroup>
          {data.map(sequence => {
            return (
              sequence && (
                <VictoryLine
                  interpolation="natural"
                  data={sequence.data}
                  style={{
                    data: {
                      stroke: sequence.color,
                      strokeWidth: 3
                    }
                  }}
                />
              )
            );
          })}
        </VictoryGroup>
        <VictoryAxis
          crossAxis
          orientation={"bottom"}
          padding={{ left: 100 }}
          style={{
            axis: { stroke: "white" },
            tickLabels: { fill: "white", padding: 5 },
            ticks: { size: 10, stroke: "white" }
          }}
          tickFormat={timestamp => {
            const minutes = getMinutes(timestamp);
            const seconds = getSeconds(timestamp);
            return minutes + "'" + seconds + '"';
          }}
        />
        <VictoryAxis
          crossAxis
          dependentAxis
          orientation={"left"}
          style={{
            axis: { stroke: "white" },
            tickLabels: { fill: "white", padding: 5 },
            ticks: { size: 10, stroke: "white" }
          }}
        />
      </VictoryChart>
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
