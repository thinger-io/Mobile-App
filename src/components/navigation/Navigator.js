//@flow

import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator
} from "react-navigation";
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
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  COLOR_TAB_BAR_ACTIVE,
  COLOR_TAB_BAR_INACTIVE
} from "../../constants/ThingerColors";
import UserDevices from "../screens/User";
import UserSettings from "../screens/UserSettings";

const MainRoutes = TabNavigator(
  {
    UserDevices: {
      screen: UserDevices,
      navigationOptions: {
        title: "User",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" size={22} style={{ color: tintColor }} />
        )
      }
    },
    ScannedDevices: {
      screen: Devices,
      navigationOptions: {
        title: "Scanned",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="devices-other" size={22} style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: COLOR_TAB_BAR_ACTIVE,
      inactiveTintColor: COLOR_TAB_BAR_INACTIVE
    },
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false
  }
);

export const Routes = StackNavigator(
  {
    Main: { screen: MainRoutes, key: "Main" },
    Scanner: { screen: QRScanner },
    Settings: { screen: UserSettings },
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
  isLogged: boolean,
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
          addListener,
          isLogged: this.props.isLogged
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: state.login.isLogged,
    nav: state.nav
  };
};

export default connect(mapStateToProps)(Navigator);
