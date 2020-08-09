import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { COLOR_TAB_BAR_ACTIVE, COLOR_TAB_BAR_INACTIVE } from '../../constants/ThingerColors';
import Chart from '../screens/Chart';
import { RootStackParamList } from './RootStack';
import { RouteProp } from '@react-navigation/native';
import { AppState } from '../../store/types';
import StreamingProvider from '../../providers/chartsProvider';
import { connect } from 'react-redux';

type OwnProps = {
  route: RouteProp<RootStackParamList, 'Charts'>;
};

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const deviceId = ownProps.route.params.deviceId;
  const resourceId = ownProps.route.params.resourceId;

  return {
    device: state.devices.byId[deviceId],
    resourceId,
  };
};

export type ChartsBottomTabsParamList = {
  LinesChart: { deviceId: string; resourceId: string };
  PieChart: { deviceId: string; resourceId: string };
  BarsChart: { deviceId: string; resourceId: string };
};

const BottomTabs = createBottomTabNavigator<ChartsBottomTabsParamList>();

const ChartsBottomTabs = ({ route, device, resourceId }: Props) => {
  return (
    <StreamingProvider device={device} resourceId={resourceId}>
      <BottomTabs.Navigator
        initialRouteName="LinesChart"
        tabBarOptions={{ activeTintColor: COLOR_TAB_BAR_ACTIVE, inactiveTintColor: COLOR_TAB_BAR_INACTIVE }}
      >
        <BottomTabs.Screen
          name="LinesChart"
          component={Chart}
          initialParams={route.params}
          options={{
            title: 'Lines',
            tabBarIcon: ({ color }) => <MaterialIcon name="show-chart" size={22} style={{ color }} />,
          }}
        />
        <BottomTabs.Screen
          name="PieChart"
          component={Chart}
          initialParams={route.params}
          options={{
            title: 'Pie',
            tabBarIcon: ({ color }) => <MaterialIcon name="pie-chart" size={22} style={{ color }} />,
          }}
        />
        <BottomTabs.Screen
          name="BarsChart"
          component={Chart}
          initialParams={route.params}
          options={{
            title: 'Bars',
            tabBarIcon: ({ color }) => <MaterialIcon name="poll" size={22} style={{ color }} />,
          }}
        />
      </BottomTabs.Navigator>
    </StreamingProvider>
  );
};

export default connect(mapStateToProps)(ChartsBottomTabs);
