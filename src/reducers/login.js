//@flow

import update from "immutability-helper";
import type { LoginState } from "../types/State";
import type { LoginAction } from "../actions/login";
import { THINGER_SERVER } from "../constants/ThingerConstants";

const initialState: LoginState = {
  user: undefined,
  password: undefined,
  server: THINGER_SERVER,
  isLogged: false,
  accessToken: undefined,
  refreshToken: undefined,
  isFetching: false
};

export default function devices(
  state: LoginState = initialState,
  action: LoginAction
) {
  switch (action.type) {
    case "LOGIN_SET_USER":
      return update(state, {
        user: { $set: action.user }
      });
    case "LOGIN_SET_PASSWORD":
      return update(state, {
        password: { $set: action.password }
      });
    case "LOGIN_SET_SERVER":
      return update(state, {
        server: { $set: action.server }
      });
    case "REQUEST_SESSION":
      return update(state, {
        isFetching: { $set: true }
      });
    case "RECEIVE_SESSION":
      return update(state, {
        accessToken: { $set: action.accessToken },
        refreshToken: { $set: action.refreshToken },
        isLogged: { $set: true },
        isFetching: { $set: false }
      });
    case "RECEIVE_SESSION_FAILURE":
      return update(state, {
        isFetching: { $set: false }
      });
    case "LOGIN_REQUEST_DEVICES":
      return update(state, {
        isFetching: { $set: true }
      });
    case "LOGIN_RECEIVE_DEVICES":
      return update(state, {
        isFetching: { $set: false }
      });
    case "LOG_OUT":
      return initialState;
    default:
      return state;
  }
}
