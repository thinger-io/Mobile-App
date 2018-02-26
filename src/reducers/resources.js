//@flow

import update from "update-immutable";
import type { ResourceAction } from "../actions/resource";
import type { ResourcesState } from "../types/State";

const initialState: ResourcesState = {};

export default function resources(
  state: ResourcesState = initialState,
  action: ResourceAction
) {
  switch (action.type) {
    case "RESOURCE_REQUEST":
      return update(state, {
        [action.resource]: { isFetching: { $set: true } }
      });
    case "RESOURCE_RECEIVE":
      const newState = update(state, {
        [action.resource]: { data: { $set: action.value } }
      });
      return update(newState, {
        [action.resource]: { isFetching: { $set: false } }
      });
    case "RESOURCE_REMOVE_ALL":
      return initialState;
    default:
      return state;
  }
}
