//@flow

import update from "immutability-helper";
import type { DeviceAction } from "../actions/device";
import type { DevicesState } from "../types/State";

/* For testing in simulator without Camera */
const initialStateTest: DevicesState = {
  "5a33c4474391fbe37d5ec9e6": {
    dev: "deviceC",
    id: "5a33c4474391fbe37d5ec9e6",
    usr: "jt",
    iat: 1513342023,
    jwt:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJkZXZpY2VDIiwiaWF0IjoxNTEzMzQyMDIzLCJqdGkiOiI1YTMzYzQ0NzQzOTFmYmUzN2Q1ZWM5ZTYiLCJ1c3IiOiJqdCJ9.pny8SEwKAiJ0aFAIATHE9GS3HvwFdRfSqDUg-Mj_IzY",
    isFetching: false,
    isOnline: true,
    isAuthorized: true,
    server: "https://api.thinger.io",
    hasServerConnection: true,
    name: ""
  }
};

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
    case "DEVICE_SET_NAME":
      return update(state, {
        [action.device]: { name: { $set: action.name } }
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
