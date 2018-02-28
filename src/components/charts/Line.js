//@flow

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { getColorByIndex } from "../../utils/colors";
import type { StreamingState } from "../../types/State";
import { PADDING } from "../../constants/ThingerStyles";
import {
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryLine
} from "victory-native";
import {dateToString} from "../../utils/dates";

type Props = {
  chartedAttributes: Array<[string, boolean]>,
  streaming: StreamingState
};

export default class extends React.Component<Props> {
  renderChart() {
    const { chartedAttributes, streaming } = this.props;

    const data = chartedAttributes.map(([key, value], color) => {
      if (value) {
        return {
          data: streaming.data[key].map((y, index) => ({
            x: streaming.timestamp[index],
            y
          })),
          color: getColorByIndex(color * 2)
        };
      }
    });

    return (
      <VictoryChart
        height={250}
        domainPadding={{ y: 20 }}
        padding={{
          top: PADDING,
          bottom: PADDING * 3,
          left: PADDING * 4,
          right: PADDING * 2
        }}
      >
        <VictoryGroup>
          {data.map(serie => {
            return serie && (
              <VictoryLine
                data={serie.data}
                animate={{
                  duration: 800,
                  onLoad: { duration: 800 }
                }}
                style={{
                  data: {
                    stroke: serie.color,
                    strokeWidth: 3
                  }
                }}
              />
            );
          })}
        </VictoryGroup>
        <VictoryAxis
          padding={{ left: 100 }}
          animate={{
            onLoad: { duration: 800 }
          }}
          style={{
            axis: { stroke: "white" },
            tickLabels: { fill: "white", padding: 5, angle: 45 },
            ticks: { size: 10, stroke: "white" }
          }}
          tickFormat={(timestamp) => dateToString(timestamp).slice(-5)}
        />
        <VictoryAxis
          dependentAxis
          animate={{
            onLoad: { duration: 800 }
          }}
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
