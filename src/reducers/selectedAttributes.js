//@flow

import update from "update-immutable";
import type { AttributeAction } from "../actions/attribute";
import type { SelectedAttributesState } from "../types/State";

const initialState: SelectedAttributesState = {
  Lines: {},
  Pie: {},
  Bars: {}
};

export default function selectedAttributes(
  state: SelectedAttributesState = initialState,
  action: AttributeAction
) {
  switch (action.type) {
    case "ATTRIBUTE_SELECT":
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: true } }
      });
    case "ATTRIBUTE_DESELECT":
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: false } }
      });
    case "ATTRIBUTE_REMOVE_ALL":
      return initialState;
    default:
      return state;
  }
}
