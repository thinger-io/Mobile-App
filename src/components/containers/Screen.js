//@flow

import * as React from "react";
import { StyleSheet, View } from "react-native";
import NavigationBar from "../navigation/NavigationBar";

type Props = {
  navigationBar: React.Element<typeof NavigationBar>,
  children: React.Node
};

export default class Screen extends React.Component<Props> {
  render() {
    const { navigationBar } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {navigationBar}
        <View style={styles.container}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});
