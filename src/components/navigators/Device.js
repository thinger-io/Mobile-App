import { TabNavigator } from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import DeviceInfo from "../screens/DeviceInfo";
import Resources from "../screens/Resources";

const Routes = TabNavigator(
  {
    resources: {
      screen: Resources,
      navigationOptions: {
        tabBarLabel: "Resources",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={22} style={{ color: tintColor }} />
        )
      }
    },
    info: {
      screen: DeviceInfo,
      navigationOptions: {
        tabBarLabel: "Info",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="info" size={22} style={{ color: tintColor }} />
        )
      }
    },
  },
  {
    swipeEnabled: true,
    backBehavior: "none",
    activeTintColor: "#4f8ef7"
  }
);

export default class DeviceNavigator extends React.Component {
  render() {
    return <Routes />;
  }
}