import React from "react";
import { LineChart, YAxis } from "react-native-svg-charts";
import * as shape from "d3-shape";
import {
  View,
  StyleSheet,
} from "react-native";
import { getColorByIndex } from "../../utils/colors";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { enabledItems, data } = this.props;

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
    );
  }
}
