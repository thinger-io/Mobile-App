import { createReducer, createActions } from 'reduxsauce';
import { union } from 'lodash';
import update from 'immutability-helper';

// Initial State
export const initialState = {
  ids: ['5a33c4474391fbe37d5ec9e6'],
  userIds: [],
  byId: {
    '5a33c4474391fbe37d5ec9e6': {
      dev: 'deviceC',
      id: '5a33c4474391fbe37d5ec9e6',
      usr: 'jt',
      iat: 1513342023,
      jwt:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkZXZpY2VDIiwiaWF0IjoxNTEzMzQyMDIzLCJqdGkiOiI1YTMzYzQ0NzQzOTFmYmUzN2Q1ZWM5ZTYiLCJ1c3IiOiJqdCJ9.pny8SEwKAiJ0aFAIATHE9GS3HvwFdRfSqDUg-Mj_IzY',
      isFetching: false,
      isOnline: true,
      isAuthorized: true,
      server: 'https://api.thinger.io',
      hasServerConnection: true,
      name: '',
    },
  },
  selected: null,
};

// Types and Action Creators
const { Types, Creators } = createActions(
  {
    add: ['device'],
    remove: ['id'],
    select: ['id'],
    setName: ['id', 'name'],
    setServer: ['id', 'server'],
    setResources: ['id', 'resources'],
    setOnline: ['id'],
    setOffline: ['id'],
    setFetching: ['id'],
    setNoFetching: ['id'],
    authorize: ['id'],
    deauthorize: ['id'],
  },
  {
    prefix: 'DEVICES_',
  },
);
export const DevicesTypes = Types;

// Reducers and Handlers
export const handlers = {
  [Types.ADD]: (state = initialState, { device }) => ({
    ...state,
    ids: union(state.ids, device.id),
    byId: { ...state.byId, [device.id]: device },
  }),
  [Types.REMOVE]: (state = initialState, { id }) => update(state, {
    ids: { $unset: [id] },
    byId: { $remove: [id] },
  }),
  [Types.SELECT]: (state = initialState, { id }) => update(state, { selected: { $set: id } }),
  [Types.SET_NAME]: (state = initialState, { id, name }) => update(state, { byId: { [id]: { name: { $set: name } } } }),
  [Types.SET_SERVER]: (state = initialState, { id, server }) => update(state, { byId: { [id]: { server: { $set: server } } } }),
  [Types.SET_RESOURCES]: (state = initialState, { id, resources }) => update(state, { byId: { [id]: { resources: { $set: resources } } } }),
  [Types.SET_ONLINE]: (state = initialState, { id }) => update(state, { byId: { [id]: { isOnline: { $set: true } } } }),
  [Types.SET_OFFLINE]: (state = initialState, { id }) => update(state, { byId: { [id]: { isOnline: { $set: false } } } }),
  [Types.SET_FETCHING]: (state = initialState, { id }) => update(state, { byId: { [id]: { isFetching: { $set: true } } } }),
  [Types.SET_NO_FETCHING]: (state = initialState, { id }) => update(state, { byId: { [id]: { isFetching: { $set: false } } } }),
  [Types.AUTHORIZE]: (state = initialState, { id }) => update(state, { byId: { [id]: { isAuthorized: { $set: true } } } }),
  [Types.DEAUTHORIZE]: (state = initialState, { id }) => update(state, { byId: { [id]: { isAuthorized: { $set: false } } } }),
};

export const reducer = createReducer(initialState, handlers);

export default Creators;
