import { ApisauceInstance } from 'apisauce';
import AuthEndpointsFactory from './auth/authEndpoints';
import DevicesEndpointsFactory from './devices/devicesEndpoints';
import ResourcesEndpointsFactory from './resources/resourcesEndpoints';

export type ApiEndpoints = ReturnType<typeof ApiEndpointsFactory>;

const ApiEndpointsFactory = (api: ApisauceInstance) => ({
  auth: AuthEndpointsFactory(api),
  devices: DevicesEndpointsFactory(api),
  resources: ResourcesEndpointsFactory(api),
});

export default ApiEndpointsFactory;

// Types
export * from './auth/authTypes';
export * from './devices/devicesTypes';
export * from './resources/resourcesTypes';
