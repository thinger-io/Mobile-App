import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import DevicesScreen from "../screens/Devices";
import QRScannerScreen from "../screens/QRScanner";
import ChartsTabNavigator from "./Charts";
import DeviceTabNavigator from "./Device";
import { DARK_BLUE } from "../../styles/ThingerColors";

const navigationOptions = {
  headerStyle: {
    backgroundColor: DARK_BLUE
  },
  headerTintColor: "white"
};

export const Routes = StackNavigator({
  Main: { screen: DevicesScreen, navigationOptions },
  Scanner: { screen: QRScannerScreen, navigationOptions },
  Device: { screen: DeviceTabNavigator, navigationOptions },
  Chart: { screen: ChartsTabNavigator, navigationOptions }
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
