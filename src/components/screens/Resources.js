// @flow

import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import Icon from '../buttons/Icon';
import ErrorMessage from '../ErrorMessage';
import { DARK_BLUE } from '../../constants/ThingerColors';
import Screen from '../containers/Screen';
import type { Device } from '../../types/Device';
import type { Attribute } from '../../types/Attribute';
import type { ResourcesState } from '../../types/State';
import { isMultipleResource } from '../../utils/resources';
import MultipleResourceView from '../resources/MultipleResource';
import type { MultipleResource, SimpleResource } from '../../types/Resource';
import SimpleResourceView from '../resources/SimpleResource';
import ResourcesActions from '../../store/redux/resources';

type Props = {
  device: Device,
  resources: ResourcesState,
  onChartClick: (resource: string) => any,
  onGetResources: (device: Device) => any,
  onRun: (id: string) => any,
  getAll: (deviceId: string) => any,
  get: (deviceId: string, id: string) => any,
  post: (
    deviceId: string,
    id: string,
    value: Attribute | { [attribute: string]: Attribute },
  ) => any,
};

type State = {
  pullRefresh: boolean,
};

class ResourcesScreen extends React.Component<Props, State> {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerRight: (
      <Icon icon="cog" onPress={() => navigation.navigate('Info', navigation.state.params)} />
    ),
  });

  state = {
    pullRefresh: false,
  };

  constructor(props) {
    super(props);
    (this: any).onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { getAll, device } = this.props;
    getAll(device.id);
  }

  async onRefresh() {
    const { onGetResources, device } = this.props;
    await onGetResources(device);
  }

  async onPullRefresh() {
    const { onGetResources, device } = this.props;
    this.setState({ pullRefresh: true });
    await onGetResources(device);
    this.setState({ pullRefresh: false });
  }

  handleOnPostClick = (id, values) => {
    const { device, post } = this.props;
    post(device.id, id, values);
  };

  renderItem = ({ item: id }) => {
    const {
      resources, onChartClick, onRun, get, device,
    } = this.props;
    const { pullRefresh } = this.state;

    const resource = resources[id];

    if (isMultipleResource(resource.data)) {
      const data: MultipleResource = (resource.data: any);
      return (
        <MultipleResourceView
          resource={id}
          data={data || {}}
          isFetching={resource.isFetching && !pullRefresh}
          onUpdateClick={() => get(device.id, id)}
          onPostClick={this.handleOnPostClick}
          onChartClick={() => onChartClick(id)}
        />
      );
    }
    const data: SimpleResource = (resource.data: any);

    return (
      <SimpleResourceView
        resource={id}
        data={data || {}}
        isFetching={resource.isFetching && !pullRefresh}
        onUpdateClick={() => get(device.id, id)}
        onPostClick={this.handleOnPostClick}
        onChartClick={() => onChartClick(id)}
        onRun={() => onRun(id)}
      />
    );
  };

  render() {
    const { device, resources } = this.props;
    const { pullRefresh } = this.state;

    const shouldRenderIndicator = device.isFetching && !pullRefresh;
    const shouldRenderOfflineError = !device.isFetching && !device.isOnline && device.hasServerConnection && device.isAuthorized;
    const shouldRenderServerError = !device.isFetching && device.isOnline && !device.hasServerConnection && device.isAuthorized;
    const shouldRenderAuthError = !device.isFetching && device.isOnline && device.hasServerConnection && !device.isAuthorized;
    const shouldRenderList = !device.isFetching && device.isOnline && device.hasServerConnection && device.isAuthorized;

    return (
      <Screen>
        {shouldRenderIndicator && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={DARK_BLUE} />
          </View>
        )}
        {shouldRenderOfflineError && (
          <ErrorMessage
            message={`${device.dev} is offline`}
            icon="plug"
            onPressButton={this.onRefresh}
          />
        )}
        {shouldRenderServerError && (
          <ErrorMessage
            message={`Couldn't connect to\n${device.server}`}
            icon="plug"
            onPressButton={this.onRefresh}
          />
        )}
        {shouldRenderAuthError && (
          <ErrorMessage
            message={`${device.usr} isn't authorized`}
            icon="lock"
            onPressButton={this.onRefresh}
          />
        )}
        {shouldRenderList && (
          <KeyboardAwareFlatList
            keyboardOpeningTime={0}
            data={Object.keys(resources)}
            renderItem={this.renderItem}
            keyExtractor={item => item}
            refreshing={device.isFetching}
            onRefresh={(() => this.onPullRefresh(): any)}
          />
        )}
      </Screen>
    );
  }
}

const mapStateToProps = (state, props) => {
  const deviceId = props.navigation.getParam('device');

  return {
    device: state.devices.byId[deviceId],
    resources: state.resources.byId,
  };
};

const mapDispatchToProps = {
  getAll: ResourcesActions.getAll,
  get: ResourcesActions.get,
  post: ResourcesActions.post,
};

// const mapDispatchToProps = dispatch => ({
//   onPostClick: (device, id, value) => dispatch(postResource(device, id, value)),
//   onRun: (device, id) => runResource(device, id),
//   onChartClick: (resource) => {
//     dispatch(restartStreaming());
//     dispatch(selectResource(resource));
//     NavigationActions.navigate('Chart');
//   },
//   onGetResources: device => dispatch(getResourcesFromApi(device)),
//   onSettingsClick: () => NavigationActions.navigate('Info'),
// });

// const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign({}, ownProps, stateProps, dispatchProps, {
//   onPostClick: (id, value) => {
//     const { device } = stateProps;
//     return dispatchProps.onPostClick(device, id, value);
//   },
//   onRun: (id) => {
//     const { device } = stateProps;
//     return dispatchProps.onRun(device, id);
//   },
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResourcesScreen);
