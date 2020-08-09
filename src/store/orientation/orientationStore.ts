import { createReducer, createActions } from 'reduxsauce';
import {
  OrientationTypes as Types,
  ResourcesActionCreators,
  OrientationState,
  SetOrientationActionParams,
} from './orientationTypes';
import { Reducer } from '../types';

// Initial State
export const initialState: OrientationState = 'PORTRAIT';

// Action Creators
const { Creators } = createActions<Types, ResourcesActionCreators>(
  {
    set: ['payload'],
  },
  {
    prefix: 'ORIENTATION_',
  },
);

// Reducers
const set: Reducer<'orientation', SetOrientationActionParams> = (state, { payload }) => payload.orientation;

const handlers = {
  [Types.SET]: set,
};

export const OrientationTypes = Types;
export const OrientationActions = Creators;
export const reducer = createReducer<OrientationState, { type: string; payload: any }>(initialState, handlers);
