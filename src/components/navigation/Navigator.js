//@flow

import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import Devices from "../screens/Devices";
import { createReduxBoundAddListener } from "react-navigation-redux-helpers";
import type { Dispatch } from "../../types/Dispatch";
import QRScanner from "../screens/QRScanner";
import Resources from "../screens/Resources";
import DeviceInfo from "../screens/DeviceInfo";
import Chart from "../screens/Chart";
import ShowQR from "../screens/ShowQR";

export const Routes = StackNavigator(
  {
    Main: { screen: Devices, key: "Main" },
    Scanner: { screen: QRScanner },
    Device: { screen: Resources },
    Info: { screen: DeviceInfo },
    Chart: { screen: Chart },
    ShowQR: { screen: ShowQR }
  },
  {
    headerMode: "none",
    cardStyle: {
      shadowOpacity: 0
    }
  }
);

type Props = {
  dispatch: Dispatch,
  nav: any
};

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
