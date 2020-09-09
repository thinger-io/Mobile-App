import React from 'react';
import Device from './Device';

type Props = {
  name: string;
  user: string;
  onClick: () => any;
};

export default class ScannedDevice extends React.Component<Props> {
  render() {
    const { name, user, onClick } = this.props;

    return <Device onClick={onClick} name={name} caption={user} />;
  }
}
