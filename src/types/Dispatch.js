//@flow

import type { ResourceAction } from "../actions/resource";
import type { DeviceAction } from "../actions/device";
import type { AttributeAction } from "../actions/attribute";
import type { NavAction } from "../actions/nav";

export type Action =
  | DeviceAction
  | ResourceAction
  | AttributeAction
  | NavAction;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch) => any;
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
