//@flow

import type { ResourceAction } from "../actions/resource";
import type { DeviceAction } from "../actions/device";
import type { AttributeAction } from "../actions/attribute";
import type { NavAction } from "../actions/nav";
import type { LoginAction } from "../actions/login";

export type Action =
  | LoginAction
  | DeviceAction
  | ResourceAction
  | AttributeAction
  | NavAction;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch) => any;
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;
