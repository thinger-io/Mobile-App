import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLOR_BACKGROUND } from '../../constants/ThingerColors';

type Props = {
  children: React.ReactNode;
};

export default class Screen extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>{this.props.children}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND,
  },
});
