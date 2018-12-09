import {
  call, select, put, all,
} from 'redux-saga/effects';
import API from '../../api2';
import DevicesActions from '../redux/devices';
import ResourcesActions from '../redux/resources';

export function* get(api, { deviceId, id }) {
  yield put(ResourcesActions.setFetching(id));
  const device = yield select(state => state.devices.byId[deviceId]);
  API.setBaseURL(device.server);
  API.setAuthorization(device.jwt);
  const { ok, data } = yield call(api.resources.get, {
    user: device.usr,
    device: device.dev,
    resource: id,
  });
  if (ok && data) {
    yield put(DevicesActions.setOnline(deviceId));
    yield put(ResourcesActions.setData(id, data));
  } else {
    yield put(DevicesActions.setOffline(deviceId));
  }
  yield put(ResourcesActions.setNoFetching(id));
}

export function* getAll(api, { deviceId }) {
  yield put(DevicesActions.setFetching(deviceId));
  const device = yield select(state => state.devices.byId[deviceId]);
  API.setBaseURL(device.server);
  API.setAuthorization(device.jwt);
  const { ok, data } = yield call(api.resources.getAll, { device: device.dev, user: device.usr });
  if (ok && data) {
    const ids = Object.keys(data);
    const byId = {};
    ids.forEach((id) => {
      byId[id] = { data: null, isFetching: false };
    });
    yield put(DevicesActions.setOnline(deviceId));
    yield put(DevicesActions.setResources(deviceId, ids));
    yield put(ResourcesActions.setAll(ids, byId));
    yield all(ids.map(resource => call(get, api, { deviceId, id: resource })));
  } else {
    yield put(DevicesActions.setOffline(deviceId));
  }
  yield put(DevicesActions.setNoFetching(deviceId));
}
