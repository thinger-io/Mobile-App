//@flow

import React from "react";
import { getColorByIndex } from "../../utils/colors";
import BarChart from "react-native-svg-charts/src/bar-chart";
import { View } from "react-native";

type Props = {
  chartedAttributes: Array<[string, boolean]>,
  data: { [attribute: string]: string | boolean | number }
};

export default class extends React.PureComponent<Props> {
  render() {
    const { chartedAttributes, data } = this.props;

    const barData = chartedAttributes
      .map(([key, value], index) => [key, value, index])
      .filter(([key, value]) => value)
      .map(([key, , index]) => ({
        values: [data[key]],
        positive: {
          fill: getColorByIndex(index * 2)
        },
        negative: {
          fill: getColorByIndex(index * 2)
        }
      }));

    // TODO: max

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <BarChart
          style={{
            flex: 1,
            width: Math.min(400, 25 * barData.length),
            margin: 15
          }}
          data={barData}
          showGrid={false}
        />
      </View>
    );
  }
}
