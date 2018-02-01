import React from "react";
import { PieChart } from "react-native-svg-charts";
import { getColorByIndex, getLightColorByIndex } from "../../utils/colors";
import BarChart from "react-native-svg-charts/src/bar-chart";
import { View } from "react-native";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { enabledItems, data } = this.props;

    const barData = Object.entries(enabledItems)
      .map(([key, value], index) => [key, value, index])
      .filter(([key, value, index]) => value)
      .map(([key, value, index]) => ({
        values: [data[key].slice(-1)[0]],
        positive: {
          fill: getColorByIndex(index * 2)
        },
        negative: {
          fill: getColorByIndex(index * 2)
        }
      }));

    const max = barData.reduce(
      (acc, val) => Math.max(acc, Math.abs(val.values[0])),
      0
    );

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
            height: 200,
            width: Math.min(400, 25 * barData.length),
            margin: 15
          }}
          data={barData}
          showGrid={false}
          gridMin={-max}
          gridMax={max}
        />
      </View>
    );
  }
}
