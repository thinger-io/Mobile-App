import React from 'react';
import { StyleSheet, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { PADDING } from '../../constants/ThingerStyles';
import { DIVIDER_COLOR } from '../../constants/ThingerColors';
import PText from '../texts/P';

type Props = {
  name: string;
  value: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => any;
};

export default class ItemList extends React.Component<Props> {
  renderContent() {
    const { style, name, value } = this.props;

    return (
      <View style={[styles.container, style]}>
        <PText style={styles.id}>{name}</PText>
        <View style={styles.valueContainer}>{value}</View>
      </View>
    );
  }

  render() {
    const { onPress } = this.props;

    return (
      <View style={styles.border}>
        {onPress ? <TouchableOpacity onPress={onPress}>{this.renderContent()}</TouchableOpacity> : this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: PADDING,
  },
  id: {
    paddingRight: PADDING,
  },
  valueContainer: {
    flex: 1,
  },
});
