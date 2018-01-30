import styles from "../styles";
import React from "react";
import { View } from "react-native";
import UpdateButton from "../buttons/Update";
import ChartButton from "../buttons/Chart";

export default class OutputResourceFooter extends React.Component {
  render() {
    const { onUpdateClick, onChartClick } = this.props;
    return (
      <View style={styles.footer}>
        <ChartButton onClick={onChartClick} />
        <UpdateButton onClick={onUpdateClick} />
      </View>
    );
  }
}
