import { call, select, put, all } from 'typed-redux-saga';
import { setAuthorization, setBaseURL, ApiEndpoints, isOkResponse } from '../../api';
import { AppState } from '../types';
import {
  FetchOneActionParams,
  FetchAllActionParams,
  PostActionParams,
  RunActionParams,
  ResourcesState,
} from './resourcesTypes';
import { ResourcesActions } from './resourcesStore';
import { DevicesActions } from '../devices';
import { Device } from '../../types/Device';
import { AuthSagas } from '../auth';

function* handleResponseStatus({ deviceId, status }: { deviceId: Device['id']; status?: number }) {
  if (status === 200) {
    yield* put(DevicesActions.update({ id: deviceId, key: 'hasServerConnection', value: true }));
    yield* put(DevicesActions.update({ id: deviceId, key: 'isAuthorized', value: true }));
    yield* put(DevicesActions.update({ id: deviceId, key: 'isOnline', value: true }));
  } else if (status === 401 || status === 403) {
    yield* put(DevicesActions.update({ id: deviceId, key: 'hasServerConnection', value: true }));
    yield* put(DevicesActions.update({ id: deviceId, key: 'isAuthorized', value: false }));
  } else if (status === 404) {
    yield* put(DevicesActions.update({ id: deviceId, key: 'hasServerConnection', value: true }));
    yield* put(DevicesActions.update({ id: deviceId, key: 'isAuthorized', value: true }));
    yield* put(DevicesActions.update({ id: deviceId, key: 'isOnline', value: false }));
  } else if (!status || status > 500) {
    yield* put(DevicesActions.update({ id: deviceId, key: 'hasServerConnection', value: false }));
  }
}

function* fetchOne(api: ApiEndpoints, { payload }: { payload: FetchOneActionParams }) {
  yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: true }));
  const device = yield* select((state: AppState) => state.devices.byId[payload.deviceId]);
  setBaseURL(device.server);
  setAuthorization(device.jwt);
  const { ok, data, status } = yield* call(api.resources.fetchOne, {
    userId: device.usr,
    deviceId: device.dev,
    resource: payload.id,
  });
  yield* call(handleResponseStatus, { deviceId: device.id, status });

  if (ok && isOkResponse(ok, data)) {
    yield* put(ResourcesActions.addResource({ id: payload.id, data: { ...(data || {}) } }));
  } else if (status === 401) {
    yield* AuthSagas.refreshToken(api);
    yield* fetchOne(api, { payload });
  }
  yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: false }));
}

function* fetchAll(api: ApiEndpoints, { payload }: { payload: FetchAllActionParams }) {
  yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isFetching', value: true }));
  const device = yield* select((state: AppState) => state.devices.byId[payload.deviceId]);
  setBaseURL(device.server);
  setAuthorization(device.jwt);

  let resourceIds: string[] = [];
  if (device.res) {
    resourceIds = device.res;
  } else {
    const { ok, data, status } = yield* call(api.resources.fetchAll, { deviceId: device.dev, userId: device.usr });
    yield* call(handleResponseStatus, { deviceId: device.id, status });
    if (ok && data) {
      resourceIds = Object.keys(data);
    } else if (status === 401) {
      yield* AuthSagas.refreshToken(api);
      yield* fetchAll(api, { payload });
    }
  }

  const ids = resourceIds.filter((id) => !id.startsWith('$'));

  const byId: ResourcesState['byId'] = {};
  const resources = yield* select((state: AppState) => state.resources.byId);
  ids.forEach((id) => {
    byId[id] = { ...resources[id], isFetching: false };
  });

  yield* put(ResourcesActions.setResources({ ids, byId }));
  yield* all(ids.map((resource) => call(fetchOne, api, { payload: { deviceId: payload.deviceId, id: resource } })));

  yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isFetching', value: false }));
}

function* post(api: ApiEndpoints, { payload }: { payload: PostActionParams }) {
  yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: true }));
  const device = yield* select((state: AppState) => state.devices.byId[payload.deviceId]);
  setBaseURL(device.server);
  setAuthorization(device.jwt);
  const { ok, data } = yield* call(api.resources.post, {
    userId: device.usr,
    deviceId: device.dev,
    resource: payload.id,
    value: { in: payload.value },
  });
  if (ok && isOkResponse(ok, data)) {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: true }));
    yield* put(ResourcesActions.addResource({ id: payload.id, data: { ...data, in: payload.value } }));
  } else {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: false }));
    yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: false }));
  }
}

function* run(api: ApiEndpoints, { payload }: { payload: RunActionParams }) {
  yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: true }));
  const device = yield* select((state: AppState) => state.devices.byId[payload.deviceId]);
  setBaseURL(device.server);
  setAuthorization(device.jwt);
  const { ok } = yield* call(api.resources.run, {
    userId: device.usr,
    deviceId: device.dev,
    resource: payload.id,
  });
  if (ok) {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: true }));
  } else {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: false }));
  }
  yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: false }));
}

export const ResourcesSagas = {
  fetchOne,
  fetchAll,
  post,
  run,
};
