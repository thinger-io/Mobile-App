//@flow

import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import DevicesScreen from "../screens/Devices";
import ShowQRScreen from "../screens/ShowQR";
import QRScannerScreen from "../screens/QRScanner";
import DeviceInfo from "../screens/DeviceInfo";
import Resources from "../screens/Resources";
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";
import type { Dispatch } from "../../types/Dispatch";
import Chart from "../screens/Chart";

export const Routes = StackNavigator(
  {
    Main: { screen: DevicesScreen, key: "Main" },
    Scanner: { screen: QRScannerScreen },
    Device: { screen: Resources },
    Info: { screen: DeviceInfo },
    Chart: { screen: Chart },
    ShowQR: { screen: ShowQRScreen }
  },
  {
    headerMode: "none"
  }
);

type Props = {
  dispatch: Dispatch,
  nav: any
}

class Navigator extends React.Component<Props> {
  render() {
    const { dispatch, nav } = this.props;
    const addListener = createReduxBoundAddListener("root");
    return (
      <Routes
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(Navigator);
