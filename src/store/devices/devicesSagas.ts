import { call, select, put } from 'typed-redux-saga';
import { normalize } from '../../utils/normalizer';
import { setBaseURL, setAuthorization, ApiEndpoints, isOkResponse } from '../../api';
import { AppState } from '../types';
import { DevicesActions } from './devicesStore';
import { AuthSagas } from '../auth';
import { UserDevice } from '../../types/Device';

function* fethUserDevices(api: ApiEndpoints): Generator<any> {
  yield* put(DevicesActions.setFetching({ isFetching: true }));

  const username = yield* select((state: AppState) => state.auth.username);
  const server = yield* select((state: AppState) => state.auth.server);
  const accessToken = yield* select((state: AppState) => state.auth.accessToken);

  if (!!username && !!server && !!accessToken) {
    setBaseURL(server);
    setAuthorization(accessToken);

    const { ok, data, status } = yield* call(api.devices.fetchUserDevices, { userId: username });

    if (ok && isOkResponse(ok, data)) {
      const devices: UserDevice[] = data.map((device) => ({
        jwt: accessToken,
        id: device.device,
        dev: device.device,
        usr: device.user,
        desc: device.description,
        isFetching: false,
        isOnline: device.connection.active,
        lastConnection: device.connection.ts,
        isAuthorized: true,
        server,
        hasServerConnection: true,
        type: device.type,
      }));
      const { ids, byId } = normalize(devices);
      yield* put(DevicesActions.setUserDevices({ ids, byId }));
    } else if (status === 401) {
      yield* AuthSagas.refreshToken(api);
      yield* fethUserDevices(api);
    }
  }

  yield* put(DevicesActions.setFetching({ isFetching: false }));
}

export const DevicesSagas = {
  fethUserDevices,
};
