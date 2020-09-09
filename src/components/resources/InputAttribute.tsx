import React from 'react';
import { StyleSheet, Switch, TextInput } from 'react-native';
import AttributeView from './Attribute';
import { Attribute } from '../../types/Attribute';
import { COLOR_TEXT, COLOR_TEXT_PLACEHOLDER } from '../../constants/ThingerColors';

type Props = {
  id: string;
  isSimple?: boolean;
  value: Attribute;
  inputValue?: Attribute;
  onChange: (id: string, value: Attribute) => any;
};

export default class InputAttribute extends React.Component<Props> {
  renderValue() {
    const { id, value, inputValue, onChange } = this.props;
    switch (typeof value) {
      case 'string':
        return (
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholderTextColor={COLOR_TEXT_PLACEHOLDER}
            value={inputValue as string}
            placeholder={value || id}
            onChangeText={(text) => onChange(id, text)}
          />
        );
      case 'number':
        return (
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            placeholderTextColor={COLOR_TEXT_PLACEHOLDER}
            keyboardType="numeric"
            value={inputValue?.toString()}
            placeholder={value !== undefined ? value.toString() : id}
            onChangeText={(text) => onChange(id, text)}
          />
        );
      case 'boolean':
        return <Switch value={inputValue as boolean} onValueChange={(v) => onChange(id, v)} />;
      default:
        return null;
    }
  }

  render() {
    const { id, isSimple } = this.props;

    return (
      <AttributeView id={id} isSimple={isSimple}>
        {this.renderValue()}
      </AttributeView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
    backgroundColor: '#F5F5F5',
    color: COLOR_TEXT,
    borderRadius: 10,
    padding: 5,
  },
});
