import { call, put, select } from 'redux-saga/effects';
import API from '../../api2';
import AuthActions from '../redux/auth';

export function* login(api, { username, password, server }) {
  yield put(AuthActions.setFetching(true));
  API.setBaseURL(server);
  API.setEncodeHeader();
  const { ok, data } = yield call(api.auth.login, username, password);
  if (ok && data) {
    yield put(AuthActions.setAuth(username, server, data.access_token, data.refresh_token));
  } else {
    // TODO: error al hacer login
  }
  API.setJSONHeader();
  yield put(AuthActions.setFetching(false));
}

export function* refreshToken(api) {
  yield put(AuthActions.setFetching(true));
  const username = yield select(state => state.auth.username);
  const server = yield select(state => state.auth.server);
  const token = yield select(state => state.auth.refreshToken);
  API.setBaseURL(server);
  API.setEncodeHeader();
  const { ok, data } = yield call(api.auth.refreshToken, token);
  if (ok && data) {
    yield put(AuthActions.setAuth(username, server, data.access_token, data.refresh_token));
  } else {
    yield put(AuthActions.logout());
  }
  API.setJSONHeader();
  yield put(AuthActions.setFetching(false));
}
