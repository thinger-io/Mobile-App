//@flow

import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { PADDING } from '../../constants/ThingerStyles';
import { VictoryAxis, VictoryChart, VictoryGroup, VictoryLine } from 'victory-native';
import { getMinutes, getSeconds } from '../../utils/dates';
import { useStreamingResourceReturnProps } from '../../hooks/useStremingResource';

type Props = {
  data: useStreamingResourceReturnProps['sequences'];
  height: number;
  width: number;
};

const LinesChart = ({ data, height, width }: Props) => {
  if (!data.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Select at least one resource!</Text>
      </View>
    );
  }

  return data && data[0]?.data.length > 1 ? (
    <VictoryChart
      width={width}
      height={height}
      domainPadding={{ y: 20 }}
      padding={{
        top: PADDING,
        bottom: PADDING * 2,
        left: PADDING * 4,
        right: PADDING * 2,
      }}
    >
      <VictoryGroup>
        {data.map((sequence) => {
          return (
            sequence && (
              <VictoryLine
                interpolation="natural"
                data={sequence.data}
                x="timestamp"
                y="value"
                style={{
                  data: {
                    stroke: sequence.color,
                    strokeWidth: 3,
                  },
                }}
              />
            )
          );
        })}
      </VictoryGroup>
      <VictoryAxis
        crossAxis
        orientation={'bottom'}
        padding={{ left: 100 }}
        style={{
          axis: { stroke: 'white' },
          tickLabels: { fill: 'white', padding: 5 },
          ticks: { size: 10, stroke: 'white' },
        }}
        tickFormat={(timestamp) => {
          const minutes = getMinutes(timestamp);
          const seconds = getSeconds(timestamp);
          return minutes + "'" + seconds + '"';
        }}
      />
      <VictoryAxis
        crossAxis
        dependentAxis
        orientation={'left'}
        style={{
          axis: { stroke: 'white' },
          tickLabels: { fill: 'white', padding: 5 },
          ticks: { size: 10, stroke: 'white' },
        }}
      />
    </VictoryChart>
  ) : (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color={'white'} />
    </View>
  );
};

export default LinesChart;
