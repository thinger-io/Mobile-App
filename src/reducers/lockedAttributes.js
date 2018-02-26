//@flow

import update from "update-immutable";
import type { AttributeAction } from "../actions/attribute";
import type { LockedAttributesState } from "../types/State";

const initialState: LockedAttributesState = {
  Lines: {},
  Pie: {},
  Bars: {}
};

export default function lockedAttributes(
  state: LockedAttributesState = initialState,
  action: AttributeAction
) {
  switch (action.type) {
    case "ATTRIBUTE_LOCK":
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: true } }
      });
    case "ATTRIBUTE_UNLOCK":
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: false } }
      });
    case "ATTRIBUTE_REMOVE_ALL":
      return initialState;
    default:
      return state;
  }
}
