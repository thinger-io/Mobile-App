import React from "react";
import { connect } from "react-redux";
import MultipleLine from "../charts/MultipleLine";
import {
  getResourceFromApi,
  selectItem,
  deselectItem,
  removeItems
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
    this.refreshInterval = setInterval(
      () => onRefresh(device, resource),
      delay
    );
  }

  componentWillUnmount() {
    this.props.onFinish(this.refreshInterval);
  }

  render() {
    const {
      enabledItems,
      data,
      resource,
      onSelectItem,
      onDeselectItem
    } = this.props;
    if (Object.keys(data).length === 0 && data.constructor === Object)
      return null;
    return (
      <MultipleLine
        resource={resource}
        enabledItems={enabledItems}
        data={data}
        onSelectItem={onSelectItem}
        onDeselectItem={onDeselectItem}
      />
    );
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;
  const resource = state.selectedResource;
  const enabledItems = state.selectedItems;
  const data = state.liveResource;

  return {
    device: state.devices[jti],
    resource,
    data,
    enabledItems
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
    onFinish: refreshInterval => {
      dispatch(removeItems());
      clearInterval(refreshInterval);
    },
    onSelectItem: key => {
      dispatch(selectItem(key));
    },
    onDeselectItem: key => {
      dispatch(deselectItem(key));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartScreen);
