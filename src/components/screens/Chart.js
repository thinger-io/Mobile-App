import React from "react";
import { connect } from "react-redux";
import AreaChart from "../charts/MultipleLine";
import {
  getResourceFromApi,
  selectItem,
  unselectAllItems
} from "../../actions/actions";
import { View } from "react-native";

class ChartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.refreshInterval = null;
  }

  componentDidMount() {
    const { device, resource, onInit, onRefresh } = this.props;
    const delay = 1000;
    onInit(device, resource);
    this.refreshInterval = setInterval(() => onRefresh(device, resource), delay);
  }

  componentWillUnmount() {
    this.props.onFinish(this.refreshInterval);
  }

  render() {
    const { data, resource } = this.props;
    if (Object.keys(data).length === 0 && data.constructor === Object)
      return null;
    return (
      <View style={{ padding: 10 }}>
        <AreaChart resource={resource} data={data} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;
  const resource = state.selectedResource;
  const keys = state.selectedItems;

  let data = {};
  for (key of keys) {
    if (state.liveResource[key] !== undefined)
      data = Object.assign(data, { [key]: state.liveResource[key] });
  }

  return {
    device: state.devices[jti],
    resource,
    data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRefresh: (device, resource) => {
      dispatch(getResourceFromApi(device, resource));
    },
    onInit: (device, resource) => {
      dispatch(getResourceFromApi(device, resource)).then(({ value }) => {
        Object.keys(value["out"]).forEach(key => dispatch(selectItem(key)));
      });
    },
    onFinish: (refreshInterval) => {
      dispatch(unselectAllItems());
      clearInterval(refreshInterval);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
