import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import DevicesScreen from "./Devices";
import QRScannerScreen from "./QRScanner";
import ResourcesScreen from "./Resources";
import ChartScreen from "./Chart";

const tabNavigator = TabNavigator(
  {
    out: {
      screen: ResourcesScreen,
      navigationOptions: {
        tabBarLabel: "Outputs",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pie-chart" size={22} style={{ color: tintColor }} />
        )
      }
    },
    in: {
      screen: ResourcesScreen,
      navigationOptions: {
        tabBarLabel: "Inputs",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="send" size={22} style={{ color: tintColor }} />
        )
      }
    },
    run: {
      screen: ResourcesScreen,
      navigationOptions: {
        tabBarLabel: "Runs",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="flash" size={22} style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    swipeEnabled: true,
    backBehavior: 'none',
    activeTintColor: "#4f8ef7"
  }
);

export const Routes = StackNavigator({
  Main: { screen: DevicesScreen },
  Scanner: { screen: QRScannerScreen },
  Resources: { screen: tabNavigator },
  Chart: { screen: ChartScreen }
});

class Navigator extends React.Component {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <Routes navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(Navigator);
