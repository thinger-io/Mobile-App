//@flow

import type { ResourceAction } from "../actions/resource";
import type { SelectedResourceState } from "../types/State";

const initialState: SelectedResourceState = "";

export default function selectedResource(
  state: SelectedResourceState = initialState,
  action: ResourceAction
) {
  switch (action.type) {
    case "RESOURCE_SELECT":
      return action.resource;
    default:
      return state;
  }
}
