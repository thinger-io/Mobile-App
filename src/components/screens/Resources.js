import { connect } from "react-redux";
import {
  getResourcesFromApi,
  postResource,
  enableRefresh,
  disableRefresh,
  getResourceFromApi,
  navigate,
  selectResource,
  restartLiveResource,
  runResource
} from "../../actions/actions";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import React from "react";
import Resource from "../resources/Resource";

class ResourcesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    const { onGetResources, device, enableRefresh } = this.props;
    enableRefresh();
    onGetResources(device);
  }

  renderItem = ({ item }) => {
    const {
      resources,
      onUpdateClick,
      onPostClick,
      onChartClick,
      onRun
    } = this.props;

    return (
      <Resource
        id={item}
        data={resources[item]}
        onUpdateClick={onUpdateClick}
        onPostClick={onPostClick}
        onChartClick={() => onChartClick(item)}
        onRun={onRun}
      />
    );
  };

  render() {
    const { resources, refreshing } = this.props;
    return (
      <KeyboardAvoidingView behavior="padding">
        <FlatList
          data={Object.keys(resources)}
          renderItem={this.renderItem}
          keyExtractor={item => item}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />
        <View style={{ height: 65 }} />
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    device: state.devices[jti],
    resources: state.resources,
    refreshing: state.refreshing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateClick: (device, resource) => {
      dispatch(getResourceFromApi(device, resource));
    },
    onPostClick: (device, id, value) =>
      dispatch(postResource(device, id, value)),
    onRun: (device, id) => runResource(device, id),
    onChartClick: resource => {
      dispatch(restartLiveResource());
      dispatch(selectResource(resource));
      dispatch(navigate("Chart"));
    },
    onGetResources: device => {
      dispatch(getResourcesFromApi(device)).then(dispatch(disableRefresh()));
    },
    enableRefresh: () => {
      dispatch(enableRefresh());
    }
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    onUpdateClick: resource => {
      const { device } = stateProps;
      dispatchProps.onUpdateClick(device, resource);
    },
    onPostClick: (id, value) => {
      const { device } = stateProps;
      return dispatchProps.onPostClick(device, id, value);
    },
    onRun: id => {
      const { device } = stateProps;
      return dispatchProps.onRun(device, id);
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ResourcesScreen
);
