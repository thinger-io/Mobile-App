import { call, put, select } from 'typed-redux-saga';
import { setBaseURL, ApiEndpoints, isOkResponse } from '../../api';
import Toast from 'react-native-simple-toast';
import { LoginActionParams } from './authTypes';
import { AuthActions } from './authStore';

function* login(api: ApiEndpoints, { payload }: { payload: LoginActionParams }) {
  yield* put(AuthActions.setFetching({ isFetching: true }));
  setBaseURL(payload.server);
  const { ok, data } = yield* call(api.auth.signin, { username: payload.username, password: payload.password });

  if (ok && data && isOkResponse(ok, data)) {
    yield* put(
      AuthActions.setAuth({
        username: payload.username,
        server: payload.server,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }),
    );
  } else {
    Toast.show('Bad credentials', Toast.SHORT);
  }
  yield* put(AuthActions.setFetching({ isFetching: false }));
}

function* refreshToken(api: ApiEndpoints) {
  yield* put(AuthActions.setFetching({ isFetching: true }));
  const username = yield* select((state) => state.auth.username);
  const server = yield* select((state) => state.auth.server);
  const token = yield* select((state) => state.auth.refreshToken);
  setBaseURL(server);
  const { ok, data } = yield* call(api.auth.refreshToken, { token });
  if (ok && data && isOkResponse(ok, data)) {
    yield* put(
      AuthActions.setAuth({
        username,
        server,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      }),
    );
  } else {
    yield* put(AuthActions.logout());
  }
  yield* put(AuthActions.setFetching({ isFetching: false }));
}

export const AuthSagas = {
  login,
  refreshToken,
};
