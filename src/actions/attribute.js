//@flow

import type { Chart } from "../types/Chart";

type SELECT = { type: "ATTRIBUTE_SELECT", attribute: string, chart: Chart };
type DESELECT = { type: "ATTRIBUTE_DESELECT", attribute: string, chart: Chart };
type LOCK = { type: "ATTRIBUTE_LOCK", attribute: string, chart: Chart };
type UNLOCK = { type: "ATTRIBUTE_UNLOCK", attribute: string, chart: Chart };
type REMOVE_ALL = { type: "ATTRIBUTE_REMOVE_ALL" };

export type AttributeAction = SELECT | DESELECT | LOCK | UNLOCK | REMOVE_ALL;

export function selectAttribute(attribute: string, chart: Chart): SELECT {
  return {
    type: "ATTRIBUTE_SELECT",
    attribute,
    chart
  };
}

export function deselectAttribute(attribute: string, chart: Chart): DESELECT {
  return {
    type: "ATTRIBUTE_DESELECT",
    attribute,
    chart
  };
}

export function lockAttribute(attribute: string, chart: Chart): LOCK {
  return {
    type: "ATTRIBUTE_LOCK",
    attribute,
    chart
  };
}

export function unlockAttribute(attribute: string, chart: Chart): UNLOCK {
  return {
    type: "ATTRIBUTE_UNLOCK",
    attribute,
    chart
  };
}

export function removeAllAttributes(): REMOVE_ALL {
  return {
    type: "ATTRIBUTE_REMOVE_ALL"
  };
}
