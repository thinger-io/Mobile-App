//@flow

import update from "update-immutable";
import type { DeviceAction } from "../actions/device";
import type { DevicesState } from "../types/State";

const initialState: DevicesState = {};

export default function devices(
  state: DevicesState = initialState,
  action: DeviceAction
) {
  switch (action.type) {
    case "DEVICE_ADD":
      return Object.assign({}, state, action.device);
    case "DEVICE_SET_STATUS":
      return update(state, {
        [action.device]: { isOnline: { $set: action.online } }
      });
    case "DEVICE_AUTHORIZE":
      return update(state, {
        [action.device]: { isAuthorized: { $set: true } }
      });
    case "DEVICE_DEAUTHORIZE":
      return update(state, {
        [action.device]: { isAuthorized: { $set: false } }
      });
    case "DEVICE_SET_SERVER":
      return update(state, {
        [action.device]: { server: { $set: action.server } }
      });
    case "DEVICE_SET_SERVER_STATUS":
      return update(state, {
        [action.device]: { hasServerConnection: { $set: action.hasConnection } }
      });
    case "DEVICE_REQUEST":
      return update(state, { [action.device]: { isFetching: { $set: true } } });
    case "DEVICE_RECEIVE":
      return update(state, {
        [action.device]: { isFetching: { $set: false } }
      });
    case "DEVICE_REMOVE":
      const newState = Object.assign({}, state);
      delete newState[action.device];
      return newState;
    default:
      return state;
  }
}
