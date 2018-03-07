//@flow

import type { OrientationAction } from "../actions/orientation";
import type { OrientationState } from "../types/State";

const initialState: OrientationState = "PORTRAIT";

export default function orientation(
  state: OrientationState = initialState,
  action: OrientationAction
) {
  switch (action.type) {
    case "ORIENTATION_SET":
      return action.orientation;
    default:
      return state;
  }
}
