import React from "react";
import { PieChart } from "react-native-svg-charts";
import { getColorByIndex } from "../../utils/colors";
import { PIE } from "../navigators/Charts";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { enabledItems, data, deselectAttribute } = this.props;

    const pieData = Object.entries(enabledItems)
      .map(([key, value], index) => ({
        value: data[key].slice(-1)[0],
        color: getColorByIndex(index * 2),
        key,
        enabled: value
      }))
      .filter(({value, key, enabled}) => {
        if (value < 0) deselectAttribute(key, PIE);
        return enabled && value > 0;
      });

    return <PieChart style={{ height: 200, margin: 15 }} data={pieData} />;
  }
}
