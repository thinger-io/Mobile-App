import { all, takeLatest } from 'typed-redux-saga';

import { api } from '../api';

import { AuthTypes, AuthSagas } from './auth';
import { ResourcesTypes, ResourcesSagas } from './resources';
import { DevicesTypes, DevicesSagas } from './devices';

export default function* rootSaga() {
  const sagaIndex = [
    takeLatest(AuthTypes.LOGIN, AuthSagas.login, api),
    takeLatest(AuthTypes.REFRESH_TOKEN, AuthSagas.refreshToken, api),
    takeLatest(DevicesTypes.FETCH_USER_DEVICES, DevicesSagas.fethUserDevices, api),
    takeLatest(ResourcesTypes.FETCH_ALL, ResourcesSagas.fetchAll, api),
    takeLatest(ResourcesTypes.FETCH_ONE, ResourcesSagas.fetchOne, api),
    takeLatest(ResourcesTypes.POST, ResourcesSagas.post, api),
    takeLatest(ResourcesTypes.RUN, ResourcesSagas.run, api),
  ];

  yield all(sagaIndex);
}
