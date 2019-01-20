import { call, put, select } from 'redux-saga/effects';
import API from '../../api2';
import { normalize } from '../../utils/normalizer';
import DevicesActions from '../redux/devices';
import { refreshToken } from './auth';

export default function* getDevices(api) {
  const username = yield select(state => state.auth.username);
  const server = yield select(state => state.auth.server);
  const accessToken = yield select(state => state.auth.accessToken);

  API.setBaseURL(server);
  API.setAuthorization(accessToken);
  const { ok, data, status } = yield call(api.devices.getDevices, username);
  if (ok && data) {
    const devices = data.map(device => ({
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
    yield put(DevicesActions.setUserDevices(ids, byId));
  } else if (status === 401) {
    yield refreshToken(api);
    yield getDevices(api);
  }
}
