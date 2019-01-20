import { all, takeLatest } from 'redux-saga/effects';
import API from '../../api2';
// Types
import { AuthTypes } from '../redux/auth';
import { DevicesTypes } from '../redux/devices';
import { ResourcesTypes } from '../redux/resources';

// Sagas
import { login, refreshToken } from './auth';
import getDevices from './devices';
import { getAll, get, post, run } from './resources';

// Create api
const api = API.create();

export default function* rootSaga() {
  const sagaIndex = [
    takeLatest(AuthTypes.LOGIN, login, api),
    takeLatest(AuthTypes.REFRESH_TOKEN, refreshToken, api),
    takeLatest(DevicesTypes.GET_DEVICES, getDevices, api),
    takeLatest(ResourcesTypes.GET_ALL, getAll, api),
    takeLatest(ResourcesTypes.GET, get, api),
    takeLatest(ResourcesTypes.POST, post, api),
    takeLatest(ResourcesTypes.RUN, run, api),
  ];

  yield all(sagaIndex);
}
