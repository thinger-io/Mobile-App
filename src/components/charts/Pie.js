import React from "react";
import { PieChart } from "react-native-svg-charts";
import { getColorByIndex } from "../../utils/colors";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { enabledItems, data, deselectItem } = this.props;

    const pieData = Object.entries(enabledItems)
      .filter(([key, value]) => {
        if (data[key].slice(-1)[0] < 0) deselectItem(key);
        return value && data[key].slice(-1)[0] > 0;
      })
      .map(([key, _], index) => ({
        value: data[key].slice(-1)[0],
        color: getColorByIndex(index * 2),
        key
      }));

    return <PieChart style={{ height: 200, margin: 15 }} data={pieData} />;
  }
}
