import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { FONT_SIZE_H2, FONT_SIZE_P } from '../../constants/ThingerStyles';
import { DARK_BLUE, COLOR_TEXT } from '../../constants/ThingerColors';

type Props = {
  name: string;
  caption: string;
  withAPI?: boolean;
  children?: React.ReactNode;
  onClick: () => any;
};

const Device = ({ name, caption, withAPI = true, onClick, children }: Props) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.wrapper} disabled={!withAPI}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.caption}>{caption}</Text>
        {children}
      </View>
      {withAPI && <MaterialIcon name="chevron-right" style={styles.chevronIcon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: FONT_SIZE_H2,
    color: DARK_BLUE,
    marginRight: 8,
    fontWeight: '600',
  },
  caption: {
    fontSize: FONT_SIZE_P,
    color: COLOR_TEXT,
    fontWeight: '300',
    marginTop: 2,
  },
  chevronIcon: {
    fontSize: 24,
    height: 24,
    color: 'black',
  },
});

export default Device;
