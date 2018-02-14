import React from "react";
import { PieChart } from "react-native-svg-charts";
import { getColorByIndex } from "../../utils/colors";
import { PIE } from "../navigators/Charts";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      chartedAttributes,
      data,
      lockAttribute,
      unlockAttribute
    } = this.props;

    const pieData = chartedAttributes
      .map(([key, value], index) => ({
        value: data[key].slice(-1)[0],
        color: getColorByIndex(index * 2),
        key,
        charted: value
      }))
      .filter(({ value, key, charted }) => {
        if (value < 0) lockAttribute(key, PIE);
        else if (typeof value === "number") unlockAttribute(key, PIE);
        return charted && value > 0;
      });

    return <PieChart style={{ flex: 1, margin: 15 }} data={pieData} />;
  }
}
