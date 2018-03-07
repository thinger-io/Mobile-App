//@flow

import type { Orientation } from "../types/Orientation";

type SET = { type: "ORIENTATION_SET", orientation: Orientation };

export type OrientationAction = SET;

export function setOrientation(orientation: Orientation): SET {
  return { type: "ORIENTATION_SET", orientation };
}
