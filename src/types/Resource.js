//@flow

import type { Attribute } from "./Attribute";

export type Resource = {
  in?: Attribute | { [attribute: string]: Attribute },
  out?: Attribute | { [attribute: string]: Attribute }
};

export type SimpleResource = { [type: "in" | "out"]: Attribute };

export type MultipleResource = {
  in?: { [attribute: string]: Attribute },
  out?: { [attribute: string]: Attribute }
};

export type OutputResource = {
  out: Attribute | { [attribute: string]: Attribute }
};

export type MultipleOutputResource = {
  out: { [attribute: string]: Attribute }
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
