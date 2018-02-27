//@flow

import update from "update-immutable";
import type { ResourceAction } from "../actions/resource";
import type { StreamingState } from "../types/State";

const initialState: StreamingState = {
  data: {},
  timestamp: []
};

export default function streaming(
  state: StreamingState = initialState,
  action: ResourceAction
) {
  switch (action.type) {
    case "RESOURCE_RECEIVE":
      const timestamp = Date.now();
      if (action.value.hasOwnProperty("out")) {
        const output = action.value.out;
        if (typeof output === "object") {
          const keys = Object.keys(output);
          let newState;
          for (const key of keys) {
            newState = update(newState ? newState : state, {
              data: { [key]: { $push: [output[key]] } }
            });
            newState = update(newState, {
              data: {
                [key]: { $set: newState.data[key].slice(-10) }
              }
            });
          }
          newState = update(newState, {
            timestamp: { $push: [timestamp] }
          });
          newState = update(newState, {
            timestamp: { $set: newState.timestamp.slice(-10) }
          });
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
