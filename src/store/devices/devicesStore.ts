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
  SetFetchingActionParams,
} from '../devices/devicesTypes';
import { Reducer } from '../types';

// Initial State
export const initialState: DevicesState = {
  isFetching: false,
  ids: [],
  userIds: [],
  byId: {},
};

// Action Creators
const { Creators } = createActions<Types, DevicesActionCreators>(
  {
    setFetching: ['payload'],
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
const setFetching: Reducer<'devices', SetFetchingActionParams> = (state = initialState, { payload }) => ({
  ...state,
  isFetching: payload.isFetching,
});

const add: Reducer<'devices', AddActionParams> = (state = initialState, { payload }) => ({
  ...state,
  ids: union(state.ids, [payload.device.id]),
  byId: { ...state.byId, [payload.device.id]: payload.device },
});

const setUserDevices: Reducer<'devices', SetUserDevicesActionParams> = (state = initialState, { payload }) => ({
  ...state,
  userIds: payload.ids,
  byId: { ...state.byId, ...payload.byId },
});

const remove: Reducer<'devices', RemoveActionParams> = (state = initialState, { payload }) =>
  update(state, {
    ids: (arr) => arr.filter((id) => id !== payload.id),
    byId: { $unset: [payload.id] },
  });

const updateDevice: Reducer<'devices', UpdateActionParams> = (state = initialState, { payload }) =>
  update(state, { byId: { [payload.id]: { [payload.key]: { $set: payload.value } } } });

// Handlers
export const handlers = {
  [Types.SET_FETCHING]: setFetching,
  [Types.ADD]: add,
  [Types.SET_USER_DEVICES]: setUserDevices,
  [Types.REMOVE]: remove,
  [Types.UPDATE]: updateDevice,
};

export const DevicesTypes = Types;
export const DevicesActions = Creators;
export const reducer = createReducer<DevicesState, { type: string; payload: any }>(initialState, handlers);
