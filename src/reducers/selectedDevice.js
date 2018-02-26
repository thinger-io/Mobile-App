//@flow

import type { DeviceAction } from "../actions/device";
import type { SelectedDeviceState } from "../types/State";

const initialState: SelectedDeviceState = "";

export default function selectedDevice(
  state: SelectedDeviceState = initialState,
  action: DeviceAction
) {
  switch (action.type) {
    case "DEVICE_SELECT":
      return action.device;
    default:
      return state;
  }
}
