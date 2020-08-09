import { createReducer, createActions } from 'reduxsauce';
import { union } from 'lodash';
import update from 'immutability-helper';
import {
  DevicesState,
  DevicesTypes as Types,
  AddActionParams,
  SetUserDevicesActionParams,
  UpdateActionParams,
  RemoveActionParams,
  DevicesActionCreators,
} from '../devices/devicesTypes';
import { Reducer } from '../types';

// Initial State
export const initialState: DevicesState = {
  ids: ['5a33c4474391fbe37d5ec9e6'],
  userIds: [],
  byId: {
    '5a33c4474391fbe37d5ec9e6': {
      dev: 'deviceA',
      id: '5a33c4474391fbe37d5ec9e6',
      usr: 'jt',
      iat: 1513342023,
      jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkZXZpY2VBIiwiaWF0IjoxNTkxODAzOTEwLCJqdGkiOiI1ZWUxMDAwNmU3YzU3ZjZmNzM3ZDBlNGMiLCJ1c3IiOiJqdCJ9.1NKmuL2kkFSAc7UKwpElP7uooSw8WWCLiudQhw0PAiY',
      isFetching: false,
      isOnline: true,
      isAuthorized: true,
      server: 'https://api.thinger.io',
      hasServerConnection: true,
    },
  },
};

// Action Creators
const { Creators } = createActions<Types, DevicesActionCreators>(
  {
    add: ['payload'],
    setUserDevices: ['payload'],
    remove: ['payload'],
    update: ['payload'],

    //  Sagas
    fetchUserDevices: ['payload'],
  },
  {
    prefix: 'DEVICES_',
  },
);

// Reducers
const add: Reducer<'devices', AddActionParams> = (state = initialState, { payload }) => ({
  ...state,
  ids: union(state.ids, payload.device.id),
  byId: { ...state.byId, [payload.device.id]: payload.device },
});

const setUserDevices: Reducer<'devices', SetUserDevicesActionParams> = (state = initialState, { payload }) => ({
  ...state,
  userIds: payload.ids,
  byId: { ...state.byId, ...payload.byId },
});

const remove: Reducer<'devices', RemoveActionParams> = (state = initialState, { payload }) =>
  update(state, {
    ids: { $unshift: [payload.id] },
    byId: { $unset: [payload.id] },
  });

const updateDevice: Reducer<'devices', UpdateActionParams> = (state = initialState, { payload }) =>
  update(state, { byId: { [payload.id]: { [payload.key]: { $set: payload.value } } } });

// Handlers
export const handlers = {
  [Types.ADD]: add,
  [Types.SET_USER_DEVICES]: setUserDevices,
  [Types.REMOVE]: remove,
  [Types.UPDATE]: updateDevice,
};

export const DevicesTypes = Types;
export const DevicesActions = Creators;
export const reducer = createReducer<DevicesState, { type: string; payload: any }>(initialState, handlers);
