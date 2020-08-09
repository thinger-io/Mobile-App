import { createReducer, createActions } from 'reduxsauce';
import {
  ResourcesTypes as Types,
  ResourcesActionCreators,
  SetFetchingActionParams,
  SetAuthActionParams,
  AuthState,
} from './authTypes';
import { Reducer } from '../types';

// Initial State
export const initialState: AuthState = {
  isFetching: false,
};

// Action Creators
const { Creators } = createActions<Types, ResourcesActionCreators>(
  {
    setAuth: ['payload'],
    setFetching: ['payload'],
    logout: ['payload'],

    // Sagas
    login: ['payload'],
    refreshToken: ['payload'],
  },
  {
    prefix: 'AUTH_',
  },
);

// Reducers
const setAuth: Reducer<'auth', SetAuthActionParams> = (state = initialState, { payload }) => ({
  ...state,
  username: payload.username,
  server: payload.server,
  accessToken: payload.accessToken,
  refreshToken: payload.refreshToken,
});

const setFetching: Reducer<'auth', SetFetchingActionParams> = (state = initialState, { payload }) => ({
  ...state,
  isFetching: payload.isFetching,
});

const logout: Reducer<'auth'> = () => ({ ...initialState });

const handlers = {
  [Types.SET_AUTH]: setAuth,
  [Types.SET_FETCHING]: setFetching,
  [Types.LOGOUT]: logout,
};

export const AuthTypes = Types;
export const AuthActions = Creators;
export const reducer = createReducer<AuthState, { type: string; payload: any }>(initialState, handlers);
