import { ResourcesState } from './resources/resourcesTypes';
import { DevicesState } from './devices/devicesTypes';
import { AuthState } from './auth/authTypes';
import { OrientationState } from './orientation/orientationTypes';

export type AppState = {
  auth: AuthState;
  devices: DevicesState;
  resources: ResourcesState;
  orientation: OrientationState;
};

export type Reducer<S extends keyof AppState, P = null> = (state: AppState[S], action: { payload: P }) => AppState[S];

export type Action<P = null> = {
  type: string;
  payload: P;
};
