import React from 'react';
import { StatusBar, StatusBarProps } from 'react-native';

const AppStatusBar = ({ backgroundColor, ...props }: StatusBarProps) => {
  return <StatusBar backgroundColor={backgroundColor} {...props} />;
};

export default AppStatusBar;
