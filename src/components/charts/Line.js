import React from "react";
import { LineChart, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { View, StyleSheet } from "react-native";
import { getColorByIndex } from "../../utils/colors";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { enabledItems, data } = this.props;

    const contentInset = { top: 20, bottom: 20 };
    const dataPoints = [].concat.apply(
      [],
      Object.entries(enabledItems).map(
        ([key, value]) => (value ? data[key] : [])
      )
    );

    const min = Math.min(...dataPoints);
    const max = Math.max(...dataPoints);

    return (
      <View style={{ height: 200, flexDirection: "row", margin: 15 }}>
        <YAxis
          style={{ top: 0, bottom: 0 }}
          dataPoints={dataPoints}
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
    );
  }
}
