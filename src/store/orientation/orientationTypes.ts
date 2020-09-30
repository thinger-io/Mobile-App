import { AnyAction } from 'redux';

// State
export type OrientationState = 'PORTRAIT' | 'LANDSCAPE';

// Type names
export enum OrientationTypes {
  SET = 'ORIENTATION_SET',
}

// Action params
export type SetOrientationActionParams = {
  orientation: OrientationState;
};

export type ResourcesActionCreators = {
  set: (payload: SetOrientationActionParams) => AnyAction;
};
