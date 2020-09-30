import React, { useMemo } from 'react';
import Device from './Device';
import { Text } from 'react-native';
import { LIGHT_RED } from '../../constants/ThingerColors';

type Props = {
  name: string;
  user: string;
  exp?: number;
  onClick: () => any;
};

const ScannedDevice = ({ name, user, exp, onClick }: Props) => {
  const hasExpired = useMemo(() => {
    const now = Math.floor(Date.now() / 1000);
    return exp ? exp < now : false;
  }, [exp]);

  return (
    <Device onClick={onClick} name={name} caption={user}>
      {hasExpired && <Text style={{ color: LIGHT_RED, marginTop: 8 }}>Your token has expired</Text>}
    </Device>
  );
};

export default ScannedDevice;
