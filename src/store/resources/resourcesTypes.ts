import { AnyAction } from 'redux';
import { Resource, Attribute } from '../../api';

// State
export type ResourcesState = {
  ids: string[];
  byId: {
    [id: string]: { data: Resource; isFetching: boolean };
  };
};

// Type names
export enum ResourcesTypes {
  CLEAR = 'RESOURCES_CLEAR',
  SET_RESOURCES = 'RESOURCES_SET_RESOURCES',
  ADD_RESOURCE = 'RESOURCES_ADD_RESOURCE',
  SET_FETCHING = 'RESOURCES_SET_FETCHING',
  FETCH_ALL = 'RESOURCES_FETCH_ALL',
  FETCH_ONE = 'RESOURCES_FETCH_ONE',
  POST = 'RESOURCES_POST',
  RUN = 'RESOURCES_RUN',
}

// Action params
export type SetResourcesActionParams = {
  ids: ResourcesState['ids'];
  byId: ResourcesState['byId'];
};

export type AddResourceActionParams = {
  id: string;
  data: ResourcesState['byId'][string]['data'];
};

export type SetFetchingActionParams = {
  id: string;
  isFetching: boolean;
};

export type FetchAllActionParams = {
  deviceId: string;
};

export type FetchOneActionParams = {
  deviceId: string;
  id: string;
};

export type PostActionParams = {
  deviceId: string;
  id: string;
  value: Attribute;
};

export type RunActionParams = {
  deviceId: string;
  id: string;
};

export type ResourcesActionCreators = {
  clean: () => AnyAction;
  setResources: (payload: SetResourcesActionParams) => AnyAction;
  addResource: (payload: AddResourceActionParams) => AnyAction;
  setFetching: (payload: SetFetchingActionParams) => AnyAction;
  fetchAll: (payload: FetchAllActionParams) => AnyAction;
  fetchOne: (payload: FetchOneActionParams) => AnyAction;
  post: (payload: PostActionParams) => AnyAction;
  run: (payload: RunActionParams) => AnyAction;
};
