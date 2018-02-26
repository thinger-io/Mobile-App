//@flow

export type Device = {
  jwt: string,
  jti: string,
  dev: string,
  usr: string,
  iat: number,
  exp?: number,
  res?: Array<string>,
  isFetching: boolean,
  isOnline: boolean,
  isAuthorized: boolean,
  server: string,
  hasServerConnection: boolean
};
