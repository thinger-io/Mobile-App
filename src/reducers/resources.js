//@flow

import update from "immutability-helper";
import type { ResourceAction } from "../actions/resource";
import type { ResourcesState } from "../types/State";

const initialState: ResourcesState = {};

export default function resources(
  state: ResourcesState = initialState,
  action: ResourceAction
) {
  update.extend("$auto", function(value, object) {
    return object ? update(object, value) : update({}, value);
  });

  switch (action.type) {
    case "RESOURCE_REQUEST":
      return update(state, {
        $auto: {
          [action.resource]: { $auto: { isFetching: { $set: true } } }
        }
      });
    case "RESOURCE_RECEIVE":
      const newState = update(state, {
        [action.resource]: {
          $auto: { data: { $set: action.value } }
        }
      });
      return update(newState, {
        [action.resource]: { $auto: { isFetching: { $set: false } } }
      });
    case "RESOURCE_REMOVE_ALL":
      return initialState;
    default:
      return state;
  }
}
