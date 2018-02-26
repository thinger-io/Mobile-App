//@flow

import React from "react";
import { connect } from "react-redux";
import Line from "../charts/Line";
import { getColorByIndex } from "../../utils/colors";
import { FlatList, View } from "react-native";
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
import type {StreamingState} from "../../types/State";

const types: Array<Chart> = ["Lines", "Pie", "Bars"];

type Props = {
  device: Device,
  resource: string,
  data: Attribute,
  streaming: StreamingState,
  isFetching: boolean,
  type: Chart,
  selectedAttributes: { [attribute: string]: boolean },
  lockedAttributes: { [attribute: string]: boolean },
  onSelectAttribute: (key: string, chart: string) => Dispatch,
  onDeselectAttribute: (key: string, chart: string) => Dispatch,
  onLockAttribute: (key: string, chart: string) => Dispatch,
  onUnlockAttribute: (key: string, chart: string) => Dispatch,
  onInit: (device: Device, resource: string) => Dispatch,
  onRefresh: (device: Device, resource: string) => Dispatch,
  onFinish: (refreshInterval: number) => Dispatch
};

type State = {
  refreshInterval: number
};

class ChartScreen extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    (this: any).handleOnLabelClick = this.handleOnLabelClick.bind(this);
  }

  componentDidMount() {
    const { device, resource, onInit, onRefresh } = this.props;
    const delay = 1000;
    onInit(device, resource);
    this.setState({
      refreshInterval: setInterval(() => onRefresh(device, resource), delay)
    });
  }

  componentWillUnmount() {
    this.props.onFinish(this.state.refreshInterval);
  }

  handleOnLabelClick(key) {
    const {
      selectedAttributes,
      type,
      onDeselectAttribute,
      onSelectAttribute
    } = this.props;
    selectedAttributes[key]
      ? onDeselectAttribute(key, type)
      : onSelectAttribute(key, type);
  }

  parseChartedAttributes() {
    const { selectedAttributes, lockedAttributes } = this.props;
    return Object.keys(selectedAttributes).map(key => [
      key,
      selectedAttributes[key] && !lockedAttributes[key]
    ]);
  }

  render() {
    const {
      selectedAttributes,
      lockedAttributes,
      data,
      streaming,
      resource,
      type,
      onLockAttribute,
      onUnlockAttribute
    } = this.props;
    const chartedAttributes = this.parseChartedAttributes();

    return (
      <Screen navigationBar={<NavigationBar title={resource} />}>
        <View style={{ height: 250, backgroundColor: DARK_BLUE }}>
          {type === "Lines" && (
              <Line chartedAttributes={chartedAttributes} data={streaming} />
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
            data={Object.keys(selectedAttributes)}
            keyExtractor={item => item}
            renderItem={({ item, index }) => {
              return (
                <Label
                  id={item}
                  value={data[item]}
                  color={getColorByIndex(index * 2)}
                  selected={selectedAttributes[item]}
                  locked={lockedAttributes[item]}
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

const mapStateToProps = (state, ownProps) => {
  const jti = state.selectedDevice;
  const resource = state.selectedResource;
  const type = "Lines";
  return {
    device: state.devices[jti],
    resource,
    data: state.resources[resource].data.out,
    streaming: state.streaming,
    isFetching: state.resources[resource].isFetching,
    selectedAttributes: state.selectedAttributes[type],
    lockedAttributes: state.lockedAttributes[type],
    type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectAttribute: (key, chart) => dispatch(selectAttribute(key, chart)),
    onDeselectAttribute: (key, chart) =>
      dispatch(deselectAttribute(key, chart)),
    onLockAttribute: (key, chart) => dispatch(lockAttribute(key, chart)),
    onUnlockAttribute: (key, chart) => dispatch(unlockAttribute(key, chart)),
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
      dispatch(removeAllAttributes());
      clearInterval(refreshInterval);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
