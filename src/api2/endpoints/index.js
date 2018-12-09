import auth from './auth';
import devices from './devices';
import resources from './resources';

const create = api => ({
  auth: auth(api),
  devices: devices(api),
  resources: resources(api),
});

export default { create };
