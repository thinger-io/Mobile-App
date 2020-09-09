export type Device = ScannedDevice | UserDevice;

type CommonDevice = {
  jwt: string;
  id: string;
  dev: string;
  usr: string;
  iat?: number;
  exp?: number;
  res?: string[];
  name?: string;
  desc?: string;
  isFetching: boolean;
  isOnline: boolean;
  isAuthorized: boolean;
  server: string;
  hasServerConnection: boolean;
};

export type ScannedDevice = CommonDevice;

export type UserDevice = CommonDevice & {
  lastConnection: number;
  desc: string;
  type: string;
};
