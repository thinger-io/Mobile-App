import React, { useMemo } from 'react';
import { VictoryAxis, VictoryBar, VictoryChart } from 'victory-native';
import { PADDING } from '../../constants/ThingerStyles';
import { Text, View } from 'react-native';
import { find } from 'lodash';

type Props = {
  data: { value: number; key: string; color: string }[];
  height: number;
  width: number;
};

const BarsChart = ({ data, height, width }: Props) => {
  const max = useMemo(() => {
    return Math.max(...data.map((d) => Math.abs(d.value)));
  }, [data]);

  if (!data.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Select two or more resources!</Text>
      </View>
    );
  }

  return (
    <VictoryChart
      height={height}
      width={width}
      domain={{ y: [-max, max] }}
      domainPadding={{ x: 50, y: 20 }}
      padding={{
        top: PADDING,
        bottom: PADDING,
        left: PADDING * 4,
        right: PADDING * 2,
      }}
    >
      <VictoryBar
        categories={{ x: data.map((d) => d.key) }}
        x="key"
        y="value"
        data={data}
        style={{
          data: {
            fill: ({ datum }) => {
              return find(data, { key: datum.key })?.color;
            },
          },
        }}
      />
      <VictoryAxis
        tickFormat={() => ''}
        style={{
          axis: { stroke: 'white' },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={[-max, max / 2, 0, -max / 2, max]}
        style={{
          axis: { stroke: 'white' },
          tickLabels: { fill: 'white', padding: 5 },
          ticks: { size: 10, stroke: 'white' },
        }}
      />
    </VictoryChart>
  );
};

export default BarsChart;
