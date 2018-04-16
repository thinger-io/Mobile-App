//@flow

import type { Device } from "./Device";
import type { Resource } from "./Resource";
import type { Chart } from "./Chart";
import type { Orientation } from "./Orientation";

export type State = {
  login: LoginState,
  devices: DevicesState,
  userDevices: Array<string>,
  scannedDevices: Array<string>,
  resources: ResourcesState,
  selectedDevice: SelectedDeviceState,
  selectedResource: SelectedResourceState,
  selectedAttributes: SelectedAttributesState,
  lockedAttributes: LockedAttributesState,
  nav: NavState
};

export type LoginState = {
  user: ?string,
  password: ?string,
  server: ?string,
  accessToken: ?string,
  refreshToken: ?string,
  isLogged: boolean,
  isFetching: boolean
};

export type DevicesState = {
  [device: string]: Device
};

export type ResourcesState = {
  [resource: string]: {
    data: Resource,
    isFetching: boolean
  }
};

export type SelectedDeviceState = string;

export type SelectedResourceState = string;

export type SelectedAttributesState = {
  [char: Chart]: {
    [attribute: string]: boolean
  }
};

export type LockedAttributesState = {
  [char: Chart]: {
    [attribute: string]: boolean
  }
};

export type StreamingState = {
  timestamp: Array<number>,
  data: {
    [attribute: string]: Array<number>
  }
};

export type OrientationState = Orientation;

export type NavState = any;
