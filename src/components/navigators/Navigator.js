import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import DevicesScreen from "../screens/Devices";
import ShowQRScreen from "../screens/ShowQR";
import QRScannerScreen from "../screens/QRScanner";
import ChartsTabNavigator from "./Charts";
import DeviceInfo from "../screens/DeviceInfo";
import Resources from "../screens/Resources";

export const Routes = StackNavigator(
  {
    Main: { screen: DevicesScreen, key: "Main" },
    Scanner: { screen: QRScannerScreen },
    Device: { screen: Resources },
    Info: { screen: DeviceInfo },
    Chart: { screen: ChartsTabNavigator },
    ShowQR: { screen: ShowQRScreen }
  },
  {
    headerMode: "none"
  }
);

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
