//@flow

import update from "update-immutable";
import type { ResourceAction } from "../actions/resource";
import { sliceObject } from "../utils/objects";
import type {StreamingState} from "../types/State";

const initialState: StreamingState = {};

export default function streaming(
  state: StreamingState = initialState,
  action: ResourceAction
) {
  switch (action.type) {
    case "RESOURCE_RECEIVE":
      const timestamp = Date.now();
      if (action.value.out) {
        const output = action.value.out;
        if (typeof output === "object") {
          const keys = Object.keys(output);
          let newState;
          for (const key of keys) {
            newState = update(newState ? newState : state, {
              [key]: { $merge: { [timestamp]: output[key] } }
            });
            newState = update(newState, {
              [key]: { $set: sliceObject(newState[key], -10) }
            });
          }
          return newState;
        } else {
          return update(state, {
            [action.resource]: { $merge: { [timestamp]: output } }
          });
        }
      } else return state;
    case "RESOURCE_RESTART_LIVE":
      return {};
    default:
      return state;
  }
}
