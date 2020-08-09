import { AnyAction } from 'redux';

// State
export type AuthState = {
  username?: string;
  server?: string;
  accessToken?: string;
  refreshToken?: string;
  isFetching: boolean;
};

// Type names
export enum ResourcesTypes {
  SET_AUTH = 'AUTH_SET_AUTH',
  SET_FETCHING = 'AUTH_SET_FETCHING',
  LOGOUT = 'AUTH_LOGOUT',
  LOGIN = 'AUTH_LOGIN',
  REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN',
}

// Action params
export type SetAuthActionParams = {
  username: AuthState['username'];
  server: AuthState['server'];
  accessToken: AuthState['accessToken'];
  refreshToken: AuthState['refreshToken'];
};

export type SetFetchingActionParams = {
  isFetching: AuthState['isFetching'];
};

export type LoginActionParams = {
  username: string;
  password: string;
  server: string;
};

export type ResourcesActionCreators = {
  setAuth: (payload: SetAuthActionParams) => AnyAction;
  setFetching: (payload: SetFetchingActionParams) => AnyAction;
  logout: () => AnyAction;
  login: (payload: LoginActionParams) => AnyAction;
  refreshToken: () => AnyAction;
};
