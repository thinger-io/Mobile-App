//@flow

export type Device = {
  jwt: string,
  id: string,
  dev: string,
  usr: string,
  iat?: number,
  exp?: number,
  res?: Array<string>,
  name?: string,
  desc?: string,
  isFetching: boolean,
  isOnline: boolean,
  isAuthorized: boolean,
  server: string,
  hasServerConnection: boolean
};
