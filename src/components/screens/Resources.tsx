import { connect } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import React, { Dispatch } from 'react';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import ErrorMessage from '../ErrorMessage';
import { DARK_BLUE } from '../../constants/ThingerColors';
import Screen from '../containers/Screen';
import { isMultipleResource } from '../../utils/resources';
import MultipleResourceView from '../resources/MultipleResource';
import { MultipleResource, SimpleResource } from '../../types/Resource';
import SimpleResourceView from '../resources/SimpleResource';
import {
  PostActionParams,
  FetchAllActionParams,
  FetchOneActionParams,
  RunActionParams,
} from '../../store/resources/resourcesTypes';
import { ResourcesActions } from '../../store/resources';
import { AppState } from '../../store/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootStack';
import { RouteProp } from '@react-navigation/native';
import { Attribute } from '../../types/Attribute';

type OwnProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Device'>;
  route: RouteProp<RootStackParamList, 'Device'>;
};
type Props = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps> & OwnProps;
type State = { pullRefresh: boolean };

const mapStateToProps = (state: AppState, props: OwnProps) => {
  const deviceId = props.route.params.deviceId;

  return {
    device: state.devices.byId[deviceId],
    resources: state.resources.byId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: OwnProps) => ({
  fetchAll: (payload: FetchAllActionParams) => dispatch(ResourcesActions.fetchAll(payload)),
  fetchOne: (payload: FetchOneActionParams) => dispatch(ResourcesActions.fetchOne(payload)),
  post: (payload: PostActionParams) => dispatch(ResourcesActions.post(payload)),
  run: (payload: RunActionParams) => dispatch(ResourcesActions.run(payload)),
  onChartClick: (resourceId: string) => {
    ownProps.navigation.navigate('Charts', { deviceId: ownProps.route.params.deviceId, resourceId: resourceId });
  },
});

class ResourcesScreen extends React.Component<Props, State> {
  state = {
    pullRefresh: false,
  };

  constructor(props: Props) {
    super(props);
    (this as any).onRefresh = this.onRefresh.bind(this);
  }

  componentDidMount() {
    const { fetchAll, device } = this.props;
    fetchAll({ deviceId: device.id });
  }

  async onRefresh() {
    const { fetchAll, device } = this.props;
    await fetchAll({ deviceId: device.id });
  }

  async onPullRefresh() {
    const { fetchAll, device } = this.props;
    this.setState({ pullRefresh: true });
    await fetchAll({ deviceId: device.id });
    this.setState({ pullRefresh: false });
  }

  handleOnPostClick = (id: string, value: Attribute) => {
    const { device, post } = this.props;
    post({ deviceId: device.id, id, value });
  };

  handleOnRunClick = (id: string) => {
    const { device, run } = this.props;
    run({ deviceId: device.id, id });
  };

  renderItem = ({ item: id }) => {
    const { resources, onChartClick, fetchOne, device } = this.props;
    const { pullRefresh } = this.state;
    const resource = resources[id];

    if (isMultipleResource(resource.data)) {
      const data: MultipleResource = resource.data;
      return (
        <MultipleResourceView
          resource={id}
          data={data || {}}
          isFetching={resource.isFetching && !pullRefresh}
          onUpdateClick={() => fetchOne({ deviceId: device.id, id })}
          onPostClick={this.handleOnPostClick}
          onChartClick={() => onChartClick(id)}
        />
      );
    }
    const data: SimpleResource = resource.data;

    return (
      <SimpleResourceView
        resource={id}
        data={data || {}}
        isFetching={resource.isFetching && !pullRefresh}
        onUpdateClick={() => fetchOne({ deviceId: device.id, id })}
        onPostClick={this.handleOnPostClick}
        onChartClick={() => onChartClick(id)}
        run={this.handleOnRunClick}
      />
    );
  };

  render() {
    const { device, resources } = this.props;
    const { pullRefresh } = this.state;

    const shouldRenderIndicator = device.isFetching && !pullRefresh;
    const shouldRenderOfflineError =
      !device.isFetching && !device.isOnline && device.hasServerConnection && device.isAuthorized;
    const shouldRenderServerError =
      !device.isFetching && device.isOnline && !device.hasServerConnection && device.isAuthorized;
    const shouldRenderAuthError = !device.isFetching && device.hasServerConnection && !device.isAuthorized;
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
          <ErrorMessage message={`${device.dev} is offline`} icon="plug" onPressButton={this.onRefresh} />
        )}
        {shouldRenderServerError && (
          <ErrorMessage message={`Couldn't connect to\n${device.server}`} icon="plug" onPressButton={this.onRefresh} />
        )}
        {shouldRenderAuthError && <ErrorMessage message="not authorized" icon="lock" onPressButton={this.onRefresh} />}
        {shouldRenderList && (
          <KeyboardAwareFlatList
            keyboardOpeningTime={0}
            data={Object.keys(resources)}
            renderItem={this.renderItem}
            keyExtractor={(item) => item}
            refreshing={device.isFetching}
            onRefresh={() => this.onPullRefresh()}
          />
        )}
      </Screen>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesScreen);
