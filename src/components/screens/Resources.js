import { connect } from "react-redux";
import {
  getResourcesFromApi,
  postResource,
  getResourceFromApi,
  navigate,
  selectResource,
  restartLiveResource,
  runResource
} from "../../actions/actions";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Text,
  View
} from "react-native";
import React from "react";
import Resource from "../resources/Resource";
import ErrorMessage from "../ErrorMessage";
import { DARK_BLUE } from "../../styles/ThingerColors";

class ResourcesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onRefresh() {
    const { onGetResources, device } = this.props;
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
        data={resources[item].data || {}}
        isFetching={resources[item].isFetching}
        onUpdateClick={onUpdateClick}
        onPostClick={onPostClick}
        onChartClick={() => onChartClick(item)}
        onRun={onRun}
      />
    );
  };

  renderItemList() {
    const { resources, device } = this.props;

    return device.isFetching ? (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={DARK_BLUE} />
      </View>
    ) : (
      <KeyboardAvoidingView behavior="padding">
        <FlatList
          data={Object.keys(resources)}
          renderItem={this.renderItem}
          keyExtractor={item => item}
        />
        <View style={{ height: 65 }} />
      </KeyboardAvoidingView>
    );
  }

  render() {
    const { device } = this.props;

    return device ? (
      !device.authorized ? (
        <ErrorMessage message={device.usr + " isn't authorized"} icon="lock" />
      ) : !device.online ? (
        <ErrorMessage message={device.dev + " is offline"} icon="plug" />
      ) : (
        this.renderItemList()
      )
    ) : null;
  }
}

const mapStateToProps = state => {
  const jti = state.selectedDevice;

  return {
    device: state.devices[jti],
    resources: state.resources
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
      dispatch(getResourcesFromApi(device));
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
