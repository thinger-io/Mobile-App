//@flow

import update from "immutability-helper";
import type { DeviceAction } from "../actions/device";

const initialState: Array<string> = [];

export default function userDevices(
  state: Array<string> = initialState,
  action: DeviceAction
) {
  switch (action.type) {
    case "DEVICE_ADD":
      if (action.isUserDevice) {
        return update(state, {
          $push: [Object.keys(action.device)[0]]
        });
      } else {
        return state;
      }
    default:
      return state;
  }
}
