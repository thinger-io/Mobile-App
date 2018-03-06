//@flow

import React from "react";
import { connect } from "react-redux";
import Line from "../charts/Line";
import { getColorByIndex } from "../../utils/colors";
import { FlatList, View, AppState } from "react-native";
import Label from "../Label";
import Pie from "../charts/Pie";
import Bars from "../charts/Bars";
import Screen from "../containers/Screen";
import { DARK_BLUE } from "../../constants/ThingerColors";
import NavigationBar from "../navigation/NavigationBar";
import {
  deselectAttribute,
  lockAttribute,
  removeAllAttributes,
  selectAttribute,
  unlockAttribute
} from "../../actions/attribute";
import type { Dispatch } from "../../types/Dispatch";
import type { Chart } from "../../types/Chart";
import { getResourceFromApi } from "../../actions/fetch";
import type { Device } from "../../types/Device";
import type { Attribute } from "../../types/Attribute";
import type { StreamingState } from "../../types/State";
import TabBar from "../navigation/TabBar";
import update from "update-immutable";
import { restartStreaming } from "../../actions/resource";

const types: Array<Chart> = ["Lines", "Pie", "Bars"];

type Props = {
  device: Device,
  resource: string,
  data: Attribute,
  streaming: StreamingState,
  isFetching: boolean,
  selectedAttributes: { [chart: Chart]: { [attribute: string]: boolean } },
  lockedAttributes: { [chart: Chart]: { [attribute: string]: boolean } },
  onSelectAttribute: (key: string, chart: string) => Dispatch,
  onDeselectAttribute: (key: string, chart: string) => Dispatch,
  onLockAttribute: (key: string, chart: string) => Dispatch,
  onUnlockAttribute: (key: string, chart: string) => Dispatch,
  onInit: (device: Device, resource: string) => Dispatch,
  onRefresh: (device: Device, resource: string) => Dispatch,
  onFinish: (refreshInterval: number) => Dispatch,
  onRestart: () => Dispatch
};

type State = {
  type: Chart,
  refreshInterval: ?number
};

class ChartScreen extends React.Component<Props, State> {
  state = {
    type: "Lines",
    refreshInterval: null
  };

  constructor(props) {
    super(props);
    (this: any).handleOnLabelClick = this.handleOnLabelClick.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    this.handleStreaming();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
    if (this.state.refreshInterval)
      this.props.onFinish(this.state.refreshInterval);
  }

  handleStreaming() {
    const { device, resource, onInit, onRefresh } = this.props;
    const delay = 1000;
    onInit(device, resource);
    this.setState({
      refreshInterval: setInterval(() => onRefresh(device, resource), delay)
    });
  }

  handleAppStateChange = nextAppState => {
    if (nextAppState === "active") {
      this.props.onRestart();
    }
  };

  handleOnLabelClick(key) {
    const {
      selectedAttributes,
      onDeselectAttribute,
      onSelectAttribute
    } = this.props;
    selectedAttributes[this.state.type][key]
      ? onDeselectAttribute(key, this.state.type)
      : onSelectAttribute(key, this.state.type);
  }

  parseChartedAttributes() {
    const { selectedAttributes, lockedAttributes } = this.props;
    const type = this.state.type;
    return Object.keys(selectedAttributes[type]).map(key => [
      key,
      selectedAttributes[type][key] && !lockedAttributes[type][key]
    ]);
  }

  render() {
    const {
      selectedAttributes,
      lockedAttributes,
      data,
      streaming,
      resource,
      onLockAttribute,
      onUnlockAttribute
    } = this.props;
    const type = this.state.type;
    const chartedAttributes = this.parseChartedAttributes();

    return (
      <Screen
        navigationBar={<NavigationBar title={resource} />}
        tabBar={
          typeof data === "object" ? (
            <TabBar
              tabs={[
                {
                  title: "Lines",
                  icon: "line-chart",
                  active: type === "Lines",
                  onPress: () =>
                    this.setState(
                      update(this.state, { type: { $set: "Lines" } })
                    )
                },
                {
                  title: "Pie",
                  icon: "pie-chart",
                  active: type === "Pie",
                  onPress: () =>
                    this.setState(update(this.state, { type: { $set: "Pie" } }))
                },
                {
                  title: "Bars",
                  icon: "bar-chart",
                  active: type === "Bars",
                  onPress: () =>
                    this.setState(
                      update(this.state, { type: { $set: "Bars" } })
                    )
                }
              ]}
            />
          ) : (
            undefined
          )
        }
      >
        <View style={{ height: 250, backgroundColor: DARK_BLUE }}>
          {type === "Lines" && (
            <Line chartedAttributes={chartedAttributes} streaming={streaming} />
          )}
          {type === "Bars" &&
            typeof data === "object" && (
              <Bars chartedAttributes={chartedAttributes} data={data} />
            )}
          {type === "Pie" &&
            typeof data === "object" && (
              <Pie
                chartedAttributes={chartedAttributes}
                data={data}
                lockAttribute={onLockAttribute}
                unlockAttribute={onUnlockAttribute}
              />
            )}
        </View>

        {typeof data === "object" && (
          <FlatList
            data={Object.keys(selectedAttributes[type])}
            keyExtractor={item => item}
            renderItem={({ item, index }) => {
              return (
                <Label
                  id={item}
                  value={data[item]}
                  color={getColorByIndex(index * 2)}
                  selected={selectedAttributes[type][item]}
                  locked={lockedAttributes[type][item]}
                  onClick={this.handleOnLabelClick}
                />
              );
            }}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;
  const resource = state.selectedResource;
  return {
    device: state.devices[jti],
    resource,
    data: state.resources[resource].data.out,
    streaming: state.streaming,
    isFetching: state.resources[resource].isFetching,
    selectedAttributes: state.selectedAttributes,
    lockedAttributes: state.lockedAttributes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectAttribute: (key, chart) => dispatch(selectAttribute(key, chart)),
    onDeselectAttribute: (key, chart) =>
      dispatch(deselectAttribute(key, chart)),
    onLockAttribute: (key, chart) => dispatch(lockAttribute(key, chart)),
    onUnlockAttribute: (key, chart) => dispatch(unlockAttribute(key, chart)),
    onRefresh: (device, resource) =>
      dispatch(getResourceFromApi(device, resource)),
    onInit: (device, resource) => {
      dispatch(getResourceFromApi(device, resource)).then(({ value }) => {
        if (typeof value.out === "number") {
          types.forEach(chart => {
            dispatch(selectAttribute(resource, chart));
            dispatch(unlockAttribute(resource, chart));
          });
        } else {
          Object.keys(value.out).forEach(key =>
            types.forEach(chart => {
              dispatch(selectAttribute(key, chart));
              return typeof value.out[key] === "number"
                ? dispatch(unlockAttribute(key, chart))
                : dispatch(lockAttribute(key, chart));
            })
          );
        }
      });
    },
    onFinish: refreshInterval => {
      dispatch(removeAllAttributes());
      dispatch(restartStreaming());
      clearInterval(refreshInterval);
    },
    onRestart: () => dispatch(restartStreaming())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
