import React, { useContext } from 'react';
import { THINGER_SERVER } from '../constants/ThingerConstants';
import { default as ApiFactory } from './Api';

const { api, setBaseURL, setAuthorization, removeAuthorization } = ApiFactory(THINGER_SERVER);
const context = React.createContext(api);

const useApi = () => useContext(context);

export { api, context, setBaseURL, setAuthorization, removeAuthorization, useApi };
export * from './core';
export * from './domains';
export {
  ApiResponse,
  PROBLEM_CODE,
  CANCEL_ERROR,
  CLIENT_ERROR,
  CONNECTION_ERROR,
  DEFAULT_HEADERS,
  NETWORK_ERROR,
  NONE,
  SERVER_ERROR,
  TIMEOUT_ERROR,
  UNKNOWN_ERROR,
} from 'apisauce';
export default context;
