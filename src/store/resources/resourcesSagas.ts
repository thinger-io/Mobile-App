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

function* fetchOne(api: ApiEndpoints, { payload }: { payload: FetchOneActionParams }) {
  yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: true }));
  const device = yield* select((state: AppState) => state.devices.byId[payload.deviceId]);
  setBaseURL(device.server);
  setAuthorization(device.jwt);
  const { ok, data } = yield* call(api.resources.fetchOne, {
    userId: device.usr,
    deviceId: device.dev,
    resource: payload.id,
  });
  if (ok && isOkResponse(ok, data) && data) {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: true }));
    yield* put(ResourcesActions.addResource({ id: payload.id, data: { ...data } }));
  } else {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: false }));
    yield* put(ResourcesActions.setFetching({ id: payload.id, isFetching: false }));
  }
}

function* fetchAll(api: ApiEndpoints, { payload }: { payload: FetchAllActionParams }) {
  yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isFetching', value: true }));
  const device = yield* select((state: AppState) => state.devices.byId[payload.deviceId]);
  setBaseURL(device.server);
  setAuthorization(device.jwt);
  const { ok, data } = yield* call(api.resources.fetchAll, { deviceId: device.dev, userId: device.usr });
  if (ok && data) {
    const ids = Object.keys(data);
    const byId: ResourcesState['byId'] = {};
    const resources = yield* select((state: AppState) => state.resources.byId);
    ids.forEach((id) => {
      byId[id] = { ...resources[id], isFetching: false };
    });
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: true }));
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'res', value: ids }));
    yield* put(ResourcesActions.setResources({ ids, byId }));
    yield* all(ids.map((resource) => call(fetchOne, api, { payload: { deviceId: payload.deviceId, id: resource } })));
  } else {
    yield* put(DevicesActions.update({ id: payload.deviceId, key: 'isOnline', value: false }));
  }
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
