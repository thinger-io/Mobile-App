import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet } from 'react-native';
import { FONT_SIZE_P, MARGIN } from '../constants/ThingerStyles';
import { DARK_BLUE } from '../constants/ThingerColors';
import RoundedButton from './buttons/RoundedButton';

type Props = {
  message: string;
  icon?: string;
  onPressButton?: () => any;
};

const styles = StyleSheet.create({
  message: {
    margin: MARGIN,
    fontSize: FONT_SIZE_P,
    color: DARK_BLUE,
  },
});

export default class ErrorMessage extends React.PureComponent<Props> {
  static defaultProps = {
    icon: null,
    onPressButton: null,
  };

  render() {
    const { icon, message, onPressButton } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {icon && <Icon name={icon} size={30} style={{ color: DARK_BLUE, margin: MARGIN }} />}
        <Text style={styles.message}>{message}</Text>
        {onPressButton && <RoundedButton color={DARK_BLUE} text="Reload" onPress={onPressButton} />}
      </View>
    );
  }
}
