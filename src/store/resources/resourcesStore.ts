import { createReducer, createActions } from 'reduxsauce';
import update from 'immutability-helper';
import {
  ResourcesTypes as Types,
  ResourcesActionCreators,
  SetResourcesActionParams,
  ResourcesState,
  AddResourceActionParams,
  SetFetchingActionParams,
} from './resourcesTypes';
import { Reducer } from '../types';

// Initial State
export const initialState: ResourcesState = {
  ids: [],
  byId: {},
};

// Action Creators
const { Creators } = createActions<Types, ResourcesActionCreators>(
  {
    clear: ['payload'],
    setResources: ['payload'],
    addResource: ['payload'],
    setFetching: ['payload'],

    // Sagas
    fetchAll: ['payload'],
    fetchOne: ['payload'],
    post: ['payload'],
    run: ['payload'],
  },
  {
    prefix: 'RESOURCES_',
  },
);

// Reducers
const clear: Reducer<'resources'> = () => ({ ...initialState });

const setResources: Reducer<'resources', SetResourcesActionParams> = (state = initialState, { payload }) => ({
  ...state,
  ids: payload.ids,
  byId: payload.byId,
});

const addResource: Reducer<'resources', AddResourceActionParams> = (state = initialState, { payload }) =>
  update(state, { byId: { [payload.id]: { data: { $set: payload.data }, isFetching: { $set: false } } } });

const setFetching: Reducer<'resources', SetFetchingActionParams> = (state = initialState, { payload }) =>
  update(state, { byId: { [payload.id]: { isFetching: { $set: payload.isFetching } } } });

const handlers = {
  [Types.CLEAR]: clear,
  [Types.SET_RESOURCES]: setResources,
  [Types.ADD_RESOURCE]: addResource,
  [Types.SET_FETCHING]: setFetching,
};

export const ResourcesTypes = Types;
export const ResourcesActions = Creators;
export const reducer = createReducer<ResourcesState, { type: string; payload: any }>(initialState, handlers);
