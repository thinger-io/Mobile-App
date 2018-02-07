import { TabNavigator } from "react-navigation";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import DeviceInfo from "../screens/DeviceInfo";
import Resources from "../screens/Resources";
import { connect } from "react-redux";

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
    activeTintColor: "#4f8ef7"
  }
);

class DeviceNavigator extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  render() {
    return <Routes />;
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    device: state.devices[jti].dev
  };
};

export default connect(mapStateToProps)(DeviceNavigator);
