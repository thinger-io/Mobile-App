import { TabNavigator } from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import DeviceInfo from "../screens/DeviceInfo";
import Resources from "../screens/Resources";
import { connect } from "react-redux";
import {BLUE, DARK_BLUE} from "../../styles/ThingerColors";
import GradientContainer from "../GradientContainer";

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
    }
  },
  {
    swipeEnabled: true,
    backBehavior: "none",
    tabBarOptions: {
      activeTintColor: DARK_BLUE
    }
  }
);

class DeviceNavigator extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    return (
      <GradientContainer>
        <Routes />
      </GradientContainer>
    );
  }
}

export default connect()(DeviceNavigator);
