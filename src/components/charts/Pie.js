//@flow

import React from "react";
import { getColorByIndex } from "../../utils/colors";
import type { Chart } from "../../types/Chart";
import { PADDING } from "../../constants/ThingerStyles";
import { VictoryPie } from "victory-native";
import { View, Text } from "react-native";

type Props = {
  chartedAttributes: Array<[string, boolean]>,
  data: { [attribute: string]: string | boolean | number },
  lockAttribute: (attribute: string, chart: Chart) => any
};

export default class extends React.PureComponent<Props> {
  render() {
    const { chartedAttributes, data, lockAttribute } = this.props;

    const pieData = chartedAttributes
      .map(([key, value], index) => ({
        x: key,
        y: data[key],
        fill: getColorByIndex(index * 2),
        charted: value
      }))
      .filter(({ x, y, fill, charted }) => {
        const numberValue: number = (y: any);
        if (numberValue < 0) lockAttribute(x, "Pie");
        return charted && numberValue > 0;
      });

    if (pieData.length <= 1)
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: "white" }}>Select two or more resources!</Text>
        </View>
      );

    return (
      <VictoryPie
        height={250}
        domainPadding={{ x: 50, y: 20 }}
        padding={{
          top: PADDING,
          bottom: PADDING
        }}
        data={pieData}
        labels={() => null}
        animate={{
          duration: 1000,
          onLoad: { duration: 1000 }
        }}
        style={{
          labels: {
            fill: "white"
          }
        }}
      />
    );
  }
}
