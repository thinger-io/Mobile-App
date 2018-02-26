//@flow

import type { Attribute } from "./Attribute";

export type Resource = {
  in?: Attribute,
  out?: Attribute
};

export type MultipleResource = {
  in?: { [attribute: string]: string | boolean | number },
  out?: { [attribute: string]: string | boolean | number }
};

export type OutputResource = {
  out: Attribute
};

export type MultipleOutputResource = {
  out: { [attribute: string]: string | boolean | number }
};

export function isMultipleResource(resource: Resource): boolean {
  return (
    (resource.hasOwnProperty("in") && typeof resource.in === "object") ||
    (resource.hasOwnProperty("out") && typeof resource.out === "object")
  );
}

export function isMultipleOutputResource(resource: Resource): boolean {
  return resource.hasOwnProperty("out") && typeof resource.out === "object";
}
