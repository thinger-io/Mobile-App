import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';

// Initial State
export const initialState = {
  ids: [],
  byId: {},
};

// Types and Action Creators
const { Types, Creators } = createActions(
  {
    clear: null,
    setAll: ['ids', 'byId'],
    setData: ['id', 'data'],
    setFetching: ['id'],
    setNoFetching: ['id'],

    // Sagas
    getAll: ['deviceId'],
    get: ['deviceId', 'id'],
    post: ['deviceId', 'id', 'values'],
  },
  {
    prefix: 'RESOURCES_',
  },
);
export const ResourcesTypes = Types;

// Reducers and Handlers
export const handlers = {
  [Types.CLEAR]: () => initialState,
  [Types.SET_ALL]: (state = initialState, { ids, byId }) => ({ ...state, ids, byId }),
  [Types.SET_DATA]: (state = initialState, { id, data }) => update(state, { byId: { [id]: { data: { $set: data } } } }),
  [Types.SET_FETCHING]: (state = initialState, { id }) => update(state, { byId: { [id]: { isFetching: { $set: true } } } }),
  [Types.SET_NO_FETCHING]: (state = initialState, { id }) => update(state, { byId: { [id]: { isFetching: { $set: false } } } }),
};

export const reducer = createReducer(initialState, handlers);

export default Creators;
