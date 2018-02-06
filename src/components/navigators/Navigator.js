import {
  addNavigationHelpers,
  StackNavigator,
} from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import DevicesScreen from "../screens/Devices";
import QRScannerScreen from "../screens/QRScanner";
import ChartsTabNavigator from "./Charts";
import DeviceTabNavigator from "./Device";


export const Routes = StackNavigator({
  Main: { screen: DevicesScreen },
  Scanner: { screen: QRScannerScreen },
  Device: { screen: DeviceTabNavigator },
  Chart: { screen: ChartsTabNavigator }
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
