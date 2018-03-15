//@flow

import React from "react";
import { getColorByIndex } from "../../utils/colors";
import { VictoryAxis, VictoryBar, VictoryChart } from "victory-native";
import { PADDING } from "../../constants/ThingerStyles";
import { Text, View } from "react-native";

type Props = {
  chartedAttributes: Array<[string, boolean]>,
  data: { [attribute: string]: string | boolean | number },
  height: number,
  width: number
};

export default class extends React.PureComponent<Props> {
  render() {
    const { chartedAttributes, data, height, width } = this.props;

    const barData = chartedAttributes
      .map(([key, value], index) => [key, value, index])
      .filter(([key, value]) => value)
      .map(([key, , color], x) => ({
        x: x + 1,
        y: data[key],
        fill: getColorByIndex(color * 2)
      }));

    const values: Array<number> = (barData.map(o => o.y): any);
    const max = Math.max(
      Math.max.apply(Math, values),
      Math.abs(Math.min.apply(Math, values))
    );

    if (barData.length <= 1)
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white" }}>Select two or more resources!</Text>
        </View>
      );

    return (
      <VictoryChart
        height={height}
        width={width}
        domain={{ y: [-max, max] }}
        domainPadding={{ x: 50, y: 20 }}
        padding={{
          top: PADDING,
          bottom: PADDING,
          left: PADDING * 4,
          right: PADDING * 2
        }}
      >
        <VictoryBar data={barData} />
        <VictoryAxis
          style={{
            axis: { stroke: "white" }
          }}
          tickFormat={() => null}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[-max, max / 2, 0, -max / 2, max]}
          style={{
            axis: { stroke: "white" },
            tickLabels: { fill: "white", padding: 5 },
            ticks: { size: 10, stroke: "white" }
          }}
        />
      </VictoryChart>
    );
  }
}
