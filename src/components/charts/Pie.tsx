import React from 'react';
import { PADDING } from '../../constants/ThingerStyles';
import { VictoryPie } from 'victory-native';
import { View, Text } from 'react-native';
import { find } from 'lodash';

type Props = {
  data: { value: number; key: string; color: string }[];
  height: number;
  width: number;
};

const PieChart = ({ data, height, width }: Props) => {
  if (!data.length) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white' }}>Select two or more resources!</Text>
      </View>
    );
  }

  const size = Math.min(width, height);

  return (
    <VictoryPie
      height={size}
      width={size}
      x="key"
      y="value"
      domainPadding={{ x: 50, y: 20 }}
      padding={{
        top: PADDING,
        bottom: PADDING,
      }}
      data={data}
      labels={() => null}
      style={{
        data: {
          fill: ({ datum }) => {
            return find(data, { key: datum.key })?.color;
          },
        },
        labels: {
          fill: 'white',
        },
      }}
    />
  );
};

export default PieChart;
