import { call, select, put } from 'typed-redux-saga';
import { normalize } from '../../utils/normalizer';
import { setBaseURL, setAuthorization, ApiEndpoints, isOkResponse } from '../../api';
import { AppState } from '../types';
import { DevicesActions } from './devicesStore';
import { AuthSagas } from '../auth';

function* fethUserDevices(api: ApiEndpoints) {
  const username = yield* select((state: AppState) => state.auth.username);
  const server = yield* select((state: AppState) => state.auth.server);
  const accessToken = yield* select((state: AppState) => state.auth.accessToken);

  setBaseURL(server);
  setAuthorization(accessToken);
  const { ok, data, status } = yield* call(api.devices.fetchUserDevices, { userId: username });
  if (ok && isOkResponse(ok, data)) {
    const devices = data.map((device) => ({
      jwt: accessToken,
      id: device.device,
      dev: device.device,
      usr: username,
      desc: device.description,
      isFetching: false,
      isOnline: device.connection === 'active',
      isAuthorized: true,
      server,
      hasServerConnection: true,
    }));
    const { ids, byId } = normalize(devices);
    yield* put(DevicesActions.setUserDevices({ ids, byId }));
  } else if (status === 401) {
    yield* AuthSagas.refreshToken(api);
    yield* fethUserDevices(api);
  }
}

export const DevicesSagas = {
  fethUserDevices,
};
