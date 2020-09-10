import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LIGHT_RED, LIGHT_GREEN } from '../../constants/ThingerColors';
import moment from 'moment';
import Device from './Device';

type Props = {
  name: string;
  type: string;
  isOnline: boolean;
  lastConnection: number;
  onClick: () => any;
};

const Status = ({ isOnline, lastConnection }: { isOnline: boolean; lastConnection: number }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
      <View style={isOnline ? styles.dot : { ...styles.dot, ...styles.dotOffline }} />
      <Text style={isOnline ? styles.statusOnline : styles.statusOffline}>
        {moment(lastConnection).format('DD MMM YYYY HH:mm')}
      </Text>
    </View>
  );
};

export default class UserDevice extends React.Component<Props> {
  render() {
    const { name, type, isOnline, lastConnection, onClick } = this.props;

    return (
      <Device onClick={onClick} name={name} caption={type} withAPI={type === 'Generic'}>
        <Status isOnline={isOnline} lastConnection={lastConnection} />
      </Device>
    );
  }
}

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    backgroundColor: LIGHT_GREEN,
    borderRadius: 4,
    marginRight: 8,
    marginTop: 2,
  },
  dotOffline: {
    backgroundColor: LIGHT_RED,
  },
  statusOnline: {
    color: LIGHT_GREEN,
  },
  statusOffline: {
    color: LIGHT_RED,
  },
  actionButtonIcon: {
    fontSize: 24,
    height: 24,
    color: 'black',
  },
});
