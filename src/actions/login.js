//@flow

type SET_USER = {
  type: "LOGIN_SET_USER",
  user: string
};
type SET_PASSWORD = {
  type: "LOGIN_SET_PASSWORD",
  password: string
};
type SET_SERVER = {
  type: "LOGIN_SET_SERVER",
  server: string
};
type REQUEST_SESSION = {
  type: "REQUEST_SESSION"
};
type RECEIVE_SESSION = {
  type: "RECEIVE_SESSION",
  accessToken: string,
  refreshToken: string
};
type RECEIVE_SESSION_FAILURE = {
  type: "RECEIVE_SESSION_FAILURE"
};
type REQUEST_DEVICES = {
  type: "LOGIN_REQUEST_DEVICES"
};
type RECEIVE_DEVICES = {
  type: "LOGIN_RECEIVE_DEVICES"
};
type LOG_OUT = {
  type: "LOG_OUT"
};

export type LoginAction =
  | SET_USER
  | SET_PASSWORD
  | SET_SERVER
  | REQUEST_SESSION
  | RECEIVE_SESSION
  | RECEIVE_SESSION_FAILURE
  | REQUEST_DEVICES
  | RECEIVE_DEVICES
  | LOG_OUT;

export function setUser(user: string): SET_USER {
  return { type: "LOGIN_SET_USER", user };
}

export function setPassword(password: string): SET_PASSWORD {
  return { type: "LOGIN_SET_PASSWORD", password };
}

export function setServer(server: string): SET_SERVER {
  return { type: "LOGIN_SET_SERVER", server };
}

export function requestSession(): REQUEST_SESSION {
  return { type: "REQUEST_SESSION" };
}

export function receiveSession(
  accessToken: string,
  refreshToken: string
): RECEIVE_SESSION {
  return { type: "RECEIVE_SESSION", accessToken, refreshToken };
}

export function receiveSessionFailure(): RECEIVE_SESSION_FAILURE {
  return { type: "RECEIVE_SESSION_FAILURE" };
}

export function requestDevices(): REQUEST_DEVICES {
  return { type: "LOGIN_REQUEST_DEVICES" };
}

export function receiveDevices(): RECEIVE_DEVICES {
  return { type: "LOGIN_RECEIVE_DEVICES" };
}

export function logOut(): LOG_OUT {
  return { type: "LOG_OUT" };
}
