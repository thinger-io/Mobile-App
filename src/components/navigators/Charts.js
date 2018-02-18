import { TabNavigator } from "react-navigation";
import { connect } from "react-redux";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import ChartScreen from "../screens/Chart";
import {
  getResourceFromApi,
  lockAttribute,
  removeItems,
  selectAttribute,
  unlockAttribute
} from "../../actions/actions";
import { BLUE, DARK_BLUE } from "../../constants/ThingerColors";

export const LINES = "LINES";
export const PIE = "PIE";
export const BARS = "BARS";

const types = [LINES, PIE, BARS];

const Routes = TabNavigator(
  {
    [LINES]: {
      screen: ChartScreen,
      navigationOptions: {
        tabBarLabel: "Lines",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="line-chart" size={22} style={{ color: tintColor }} />
        )
      }
    },
    [PIE]: {
      screen: ChartScreen,
      navigationOptions: {
        tabBarLabel: "Pie",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="pie-chart" size={22} style={{ color: tintColor }} />
        )
      }
    },
    [BARS]: {
      screen: ChartScreen,
      navigationOptions: {
        tabBarLabel: "Bars",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="bar-chart" size={22} style={{ color: tintColor }} />
        )
      }
    }
  },
  {
    swipeEnabled: true,
    backBehavior: "none",
    tabBarOptions: {
      activeTintColor: DARK_BLUE,
      inactiveTintColor: "gray",
      style: {
        backgroundColor: "white"
      },
      indicatorStyle: {
        backgroundColor: DARK_BLUE
      }
    }
  }
);

class ChartsNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
  }

  componentDidMount() {
    const { device, resource, onInit, onRefresh } = this.props;
    const delay = 1000;
    onInit(device, resource);
    this.refreshInterval = setInterval(
      () => onRefresh(device, resource),
      delay
    );
  }

  componentWillUnmount() {
    this.props.onFinish(this.refreshInterval);
  }

  render() {
    return <Routes />;
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;
  const resource = state.selectedResource;

  return {
    device: state.devices[jti],
    resource
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRefresh: (device, resource) => {
      dispatch(getResourceFromApi(device, resource)).then(({ value }) => {
        Object.keys(value.out).forEach(key =>
          types.forEach(chart => {
            return typeof value.out[key] === "number"
              ? dispatch(unlockAttribute(key, chart))
              : dispatch(lockAttribute(key, chart));
          })
        );
      });
    },
    onInit: (device, resource) => {
      dispatch(getResourceFromApi(device, resource)).then(({ value }) => {
        Object.keys(value.out).forEach(key =>
          types.forEach(chart => {
            dispatch(selectAttribute(key, chart));
            return typeof value.out[key] === "number"
              ? dispatch(unlockAttribute(key, chart))
              : dispatch(lockAttribute(key, chart));
          })
        );
      });
    },
    onFinish: refreshInterval => {
      dispatch(removeItems());
      clearInterval(refreshInterval);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsNavigator);
