import React from "react";
import { LineChart, XAxis, YAxis  } from "react-native-svg-charts";
import * as shape from "d3-shape";
import { View, StyleSheet } from "react-native";
import { getColorByIndex } from "../../utils/colors";
import { dateToSeconds } from "../../utils/dates";

export default class extends React.Component {
  render() {
    const { chartedAttributes, data } = this.props;

    let xData = [];
    if (data && Object.values(data).length > 0) xData = Object.values(data)[0];
    xData = Object.keys(xData);

    const contentInset = { top: 20, bottom: 20 };
    const dataPoints = [].concat.apply(
      [],
      chartedAttributes.map(
        ([key, value]) => (value ? Object.values(data[key]) : [])
      )
    );

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
                  dataPoints={Object.values(data[key])}
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
            values={xData}
            chartType={XAxis.Type.LINE}
            labelStyle={{ color: "white" }}
            formatLabel={value => dateToSeconds(Number(value))}
          />
        </View>
      </View>
    );
  }
}
