import { connect } from "react-redux";
import {
  getResourcesFromApi,
  postResource,
  editSimpleResource,
  editComplexResourcePair,
  enableRefresh,
  disableRefresh,
  getResourceFromApi,
  navigate,
  selectResource,
  restartLiveResource,
  selectItem, unselectAllItems
} from "../../actions/actions";
import { FlatList, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import React from "react";
import { SimpleOutputResource } from "../resources/SimpleOutput";
import { ComplexInputResource } from "../resources/ComplexInput";
import { SimpleInputResource } from "../resources/SimpleInput";
import { ComplexOutputResource } from "../resources/ComplexOutput";

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
      type,
      onUpdateClick,
      onPostClick,
      onChartClick,
      onEditSimpleResource,
      onEditComplexResourcePair
    } = this.props;
    if (typeof resources[item] !== "object") {
      switch (type) {
        case "out":
          return (
            <SimpleOutputResource
              name={item}
              value={resources[item]}
              onUpdateClick={onUpdateClick}
              onChartClick={() => onChartClick(item)}
            />
          );
        case "in":
          return (
            <SimpleInputResource
              name={item}
              value={resources[item]}
              onItemChange={onEditSimpleResource}
              onUpdateClick={onUpdateClick}
              onPostClick={onPostClick}
            />
          );
      }
    } else {
      switch (type) {
        case "out":
          return (
            <ComplexOutputResource
              name={item}
              data={resources[item]}
              onUpdateClick={onUpdateClick}
              onChartClick={() => onChartClick(item)}
            />
          );
        case "in":
          return (
            <ComplexInputResource
              name={item}
              data={resources[item]}
              onItemChange={onEditComplexResourcePair}
              onUpdateClick={onUpdateClick}
              onPostClick={onPostClick}
            />
          );
      }
    }
  };

  render() {
    const { resources, refreshing } = this.props;
    return (
      <KeyboardAvoidingView style={styles.body} behavior="padding">
        <FlatList
          data={Object.keys(resources)}
          renderItem={this.renderItem}
          keyExtractor={item => item.key}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
        />
        <View style={{ height: 65 }} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 15
  }
});

const mapStateToProps = (state, ownProps) => {
  const jti = state.selectedDevice;
  const resources = state.resources;
  const type = ownProps.navigation.state.key;

  const mappedResources = {};
  for (const [key, value] of Object.entries(resources)) {
    if (value[type] !== undefined) {
      mappedResources[key] = value[type];
    }
  }

  return {
    device: state.devices[jti],
    resources: mappedResources,
    refreshing: state.refreshing,
    type
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditSimpleResource: (resource, value) => {
      dispatch(editSimpleResource(resource, value));
    },
    onEditComplexResourcePair: (resource, key, value) => {
      dispatch(editComplexResourcePair(resource, key, value));
    },
    onUpdateClick: (device, resource) => {
      dispatch(getResourceFromApi(device, resource));
    },
    onPostClick: (device, key, value) => {
      dispatch(postResource(device, key, value));
    },
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
    onPostClick: resource => {
      const { device, resources } = stateProps;
      const value = resources[resource];
      dispatchProps.onPostClick(device, resource, value);
    }
  });
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  ResourcesScreen
);
