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
  yield put(ResourcesActions.setFetching(id, false));
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
    const resources = yield select(state => state.resources.byId);
    ids.forEach((id) => {
      byId[id] = { ...resources[id], isFetching: false };
    });
    yield put(DevicesActions.setOnline(deviceId));
    yield put(DevicesActions.setResources(deviceId, ids));
    yield put(ResourcesActions.setAll(ids, byId));
    yield all(ids.map(resource => call(get, api, { deviceId, id: resource })));
  } else {
    yield put(DevicesActions.setOffline(deviceId));
  }
  yield put(DevicesActions.setFetching(deviceId, false));
}

export function* post(api, { deviceId, id, values }) {
  yield put(ResourcesActions.setFetching(id));
  const device = yield select(state => state.devices.byId[deviceId]);
  API.setBaseURL(device.server);
  API.setAuthorization(device.jwt);
  const { ok, data } = yield call(api.resources.post, {
    user: device.usr,
    device: device.dev,
    resource: id,
    values,
  });
  if (ok) {
    yield put(DevicesActions.setOnline(deviceId));
    yield put(ResourcesActions.setData(id, { ...data, in: values }));
  } else {
    yield put(DevicesActions.setOffline(deviceId));
  }
  yield put(ResourcesActions.setFetching(id, false));
}

export function* run(api, { deviceId, id }) {
  yield put(ResourcesActions.setFetching(id));
  const device = yield select(state => state.devices.byId[deviceId]);
  API.setBaseURL(device.server);
  API.setAuthorization(device.jwt);
  const { ok } = yield call(api.resources.post, {
    user: device.usr,
    device: device.dev,
    resource: id,
  });
  if (ok) {
    yield put(DevicesActions.setOnline(deviceId));
  } else {
    yield put(DevicesActions.setOffline(deviceId));
  }
  yield put(ResourcesActions.setFetching(id, false));
}
