import React, { useState, useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { FlatList, View, Dimensions } from 'react-native';
import Line from '../charts/Line';
import Label from '../Label';
import Pie from '../charts/Pie';
import Bars from '../charts/Bars';
import Screen from '../containers/Screen';
import { DARK_BLUE } from '../../constants/ThingerColors';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ChartsBottomTabsParamList } from '../navigation/ChartsBottomTabs';
import { RouteProp } from '@react-navigation/native';
import { AppState } from '../../store/types';
import { useStreamingState } from '../../providers/chartsProvider';

type OwnProps = {
  navigation: BottomTabNavigationProp<ChartsBottomTabsParamList, 'BarsChart' | 'LinesChart' | 'PieChart'>;
  route: RouteProp<ChartsBottomTabsParamList, 'BarsChart' | 'LinesChart' | 'PieChart'>;
};

type Props = ReturnType<typeof mapStateToProps> & OwnProps;

const mapStateToProps = (state: AppState) => {
  return {
    orientation: state.orientation,
  };
};

const ChartScreen = ({ orientation, route }: Props) => {
  const { sequences } = useStreamingState();

  const [unselectedAttributes, setUnselectedAttributes] = useState<string[]>([]);

  const handleOnLabelClick = useCallback(
    (key: string) => {
      if (unselectedAttributes.includes(key)) {
        setUnselectedAttributes(unselectedAttributes.filter((u) => u !== key));
      } else {
        setUnselectedAttributes((u) => [...u, key]);
      }
    },
    [unselectedAttributes],
  );

  const selectedSequences = useMemo(() => {
    return sequences.filter((s) => !unselectedAttributes.includes(s.key));
  }, [sequences, unselectedAttributes]);

  const lastValues: { key: string; value: number; color: string }[] = useMemo(() => {
    return selectedSequences.map((s) => ({ key: s.key, value: s.data.slice(-1)[0].value, color: s.color }));
  }, [selectedSequences]);

  const height = orientation === 'PORTRAIT' ? 250 : Dimensions.get('window').height - 70;
  const width = Dimensions.get('window').width;

  return (
    <Screen>
      <View
        style={{
          height: orientation === 'PORTRAIT' ? 250 : '100%',
          alignItems: 'center',
          backgroundColor: DARK_BLUE,
        }}
      >
        {route.name === 'LinesChart' && <Line data={selectedSequences} height={height} width={width} />}
        {route.name === 'BarsChart' && <Bars data={lastValues} height={height} width={width} />}
        {route.name === 'PieChart' && <Pie data={lastValues} height={height} width={width} />}
      </View>
      {orientation === 'PORTRAIT' ? (
        <FlatList
          data={sequences}
          horizontal={false}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <Label
              id={item.key}
              value={item.data.slice(-1)[0]?.value || 0}
              color={item.color}
              selected={!unselectedAttributes.includes(item.key)}
              locked={false}
              onClick={handleOnLabelClick}
            />
          )}
        />
      ) : undefined}
    </Screen>
  );
};

export default connect(mapStateToProps)(ChartScreen);
