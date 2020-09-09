import { AnyAction } from 'redux';
import { Device } from '../../types/Device';

// State
export type DevicesState = {
  isFetching: boolean;
  ids: string[];
  userIds: string[];
  byId: {
    [id: string]: Device;
  };
};

// Type names
export enum DevicesTypes {
  SET_FETCHING = 'DEVICES_SET_FETCHING',
  ADD = 'DEVICES_ADD',
  SET_USER_DEVICES = 'DEVICES_SET_USER_DEVICES',
  REMOVE = 'DEVICES_REMOVE',
  UPDATE = 'DEVICES_UPDATE',
  FETCH_USER_DEVICES = 'DEVICES_FETCH_USER_DEVICES',
}

// Action params
export type SetFetchingActionParams = {
  isFetching: DevicesState['isFetching'];
};

export type AddActionParams = {
  device: DevicesState['byId'][string];
};

export type SetUserDevicesActionParams = {
  ids: DevicesState['ids'];
  byId: DevicesState['byId'];
};

export type RemoveActionParams = {
  id: string;
};

export type UpdateActionParams = {
  id: string;
  key: keyof Device;
  value: Device[keyof Device];
};

export type DevicesActionCreators = {
  setFetching: (payload: SetFetchingActionParams) => AnyAction;
  add: (payload: AddActionParams) => AnyAction;
  setUserDevices: (payload: SetUserDevicesActionParams) => AnyAction;
  remove: (payload: RemoveActionParams) => AnyAction;
  update: (payload: UpdateActionParams) => AnyAction;
  fetchUserDevices: () => AnyAction;
};
