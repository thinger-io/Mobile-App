// @flow

import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AttributeView from './Attribute';
import { DARK_BLUE } from '../../constants/ThingerColors';

type Props = {
  id: string,
  run: () => any,
};

export default class RunAttribute extends React.Component<Props> {
  onRun = () => {
    const { run, id } = this.props;
    run(id);
  };

  renderValue() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'flex-end',
          marginRight: 15,
        }}
        onPress={this.onRun}
      >
        <Icon name="paper-plane" size={22} style={{ color: DARK_BLUE }} />
      </TouchableOpacity>
    );
  }

  render() {
    const { id } = this.props;

    return (
      <AttributeView id={id} isSimple>
        {this.renderValue()}
      </AttributeView>
    );
  }
}
