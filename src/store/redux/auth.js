import { createReducer, createActions } from 'reduxsauce';

// Initial State
export const initialState = {
  username: undefined,
  server: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  isFetching: false,
};

// Types and Action Creators
const { Types, Creators } = createActions(
  {
    setAuth: ['username', 'server', 'accessToken', 'refreshToken'],
    setFetching: ['isFetching'],
    logout: null,

    // Sagas
    login: ['username', 'password', 'server'],
    refreshToken: null,
  },
  {
    prefix: 'AUTH_',
  },
);
export const AuthTypes = Types;

// Reducers and Handlers
export const handlers = {
  [Types.SET_AUTH]: (state = initialState, {
    username, server, accessToken, refreshToken,
  }) => ({
    ...state,
    username,
    server,
    accessToken,
    refreshToken,
  }),
  [Types.SET_FETCHING]: (state = initialState, { isFetching }) => ({ ...state, isFetching }),
  [Types.LOGOUT]: () => ({ ...initialState }),
};

export const reducer = createReducer(initialState, handlers);

export default Creators;
