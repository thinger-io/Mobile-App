import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { FONT_SIZE_H1, PADDING } from '../../constants/ThingerStyles';

type Props = {
  icon: string;
  onPress: () => any;
};

const styles = StyleSheet.create({
  icon: {
    color: 'white',
    paddingRight: PADDING,
  },
});

export default class Icon extends React.PureComponent<Props> {
  render() {
    const { icon, onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <FAIcon name={icon} size={FONT_SIZE_H1} style={styles.icon} />
      </TouchableOpacity>
    );
  }
}
