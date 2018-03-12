//@flow

import type { AttributeAction } from "../actions/attribute";
import type { LockedAttributesState } from "../types/State";
import update from "immutability-helper/index";

const initialState: LockedAttributesState = {
  Lines: {},
  Pie: {},
  Bars: {}
};

export default function lockedAttributes(
  state: LockedAttributesState = initialState,
  action: AttributeAction
) {
  update.extend("$auto", function(value, object) {
    return object ? update(object, value) : update({}, value);
  });
  switch (action.type) {
    case "ATTRIBUTE_LOCK":
      return update(state, {
        [action.chart]: { $auto: { [action.attribute]: { $set: true } } }
      });
    case "ATTRIBUTE_UNLOCK":
      return update(state, {
        [action.chart]: { $auto: { [action.attribute]: { $set: false } } }
      });
    case "ATTRIBUTE_REMOVE_ALL":
      return initialState;
    default:
      return state;
  }
}
