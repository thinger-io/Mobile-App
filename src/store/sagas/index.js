import { all, takeLatest } from 'redux-saga/effects';
import API from '../../api2';
// Types
import { ResourcesTypes } from '../redux/resources';

// Sagas
import { getAll, get } from './resources';

// Create api
const api = API.create();

export default function* rootSaga() {
  const sagaIndex = [
    // Resources
    takeLatest(ResourcesTypes.GET_ALL, getAll, api),
    takeLatest(ResourcesTypes.GET, get, api),
  ];

  yield all(sagaIndex);
}
