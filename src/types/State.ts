import { Orientation } from './Orientation';

export type State = {
  userDevices: Array<string>;
  scannedDevices: Array<string>;
  nav: NavState;
};

export type OrientationState = Orientation;

export type NavState = any;
