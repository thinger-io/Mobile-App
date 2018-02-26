//@flow

import React from "react";
import { PieChart } from "react-native-svg-charts";
import { getColorByIndex } from "../../utils/colors";
import type { Chart } from "../../types/Chart";

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
        value: data[key],
        color: getColorByIndex(index * 2),
        key,
        charted: value
      }))
      .filter(({ value, key, charted }) => {
        const numberValue: number = (value: any);
        if (numberValue < 0) lockAttribute(key, "Pie");
        return charted && numberValue > 0;
      });

    console.log(pieData)

    return <PieChart style={{ flex: 1, margin: 15 }} data={pieData} />;
  }
}
