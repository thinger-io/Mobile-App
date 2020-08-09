import { ResourceAction } from '../actions/resource';
import { DeviceAction } from '../actions/device';
import { AttributeAction } from '../actions/attribute';

export type Action = DeviceAction | ResourceAction | AttributeAction;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
