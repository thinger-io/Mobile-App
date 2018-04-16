//@flow

import type { Device } from "../types/Device";

type ADD = { type: "DEVICE_ADD", device: Device, isUserDevice: boolean };
type REMOVE = { type: "DEVICE_REMOVE", device: string };
type SELECT = { type: "DEVICE_SELECT", device: string };
type SET_STATUS = {
  type: "DEVICE_SET_STATUS",
  device: string,
  online: boolean
};
type AUTHORIZE = { type: "DEVICE_AUTHORIZE", device: string };
type DEAUTHORIZE = { type: "DEVICE_DEAUTHORIZE", device: string };
type SET_NAME = {
  type: "DEVICE_SET_NAME",
  device: string,
  name: string
};
type SET_SERVER = {
  type: "DEVICE_SET_SERVER",
  device: string,
  server: string
};
type SET_SERVER_STATUS = {
  type: "DEVICE_SET_SERVER_STATUS",
  device: string,
  hasConnection: boolean
};
type REQUEST = { type: "DEVICE_REQUEST", device: string };
type RECEIVE = { type: "DEVICE_RECEIVE", device: string };

export type DeviceAction =
  | ADD
  | REMOVE
  | SELECT
  | SET_NAME
  | SET_STATUS
  | AUTHORIZE
  | DEAUTHORIZE
  | SET_SERVER
  | SET_SERVER_STATUS
  | REQUEST
  | RECEIVE;

export function addDevice(device: Device, isUserDevice: boolean): ADD {
  return { type: "DEVICE_ADD", device, isUserDevice };
}

export function removeDevice(device: string): REMOVE {
  return { type: "DEVICE_REMOVE", device };
}

export function selectDevice(device: string): SELECT {
  return { type: "DEVICE_SELECT", device };
}

export function setDeviceName(device: string, name: string): SET_NAME {
  return { type: "DEVICE_SET_NAME", device, name };
}

export function setDeviceState(device: string, online: boolean): SET_STATUS {
  return { type: "DEVICE_SET_STATUS", device, online };
}

export function authorizeDevice(device: string): AUTHORIZE {
  return { type: "DEVICE_AUTHORIZE", device };
}

export function deauthorizeDevice(device: string): DEAUTHORIZE {
  return { type: "DEVICE_DEAUTHORIZE", device };
}

export function setDeviceServer(device: string, server: string): SET_SERVER {
  return {
    type: "DEVICE_SET_SERVER",
    device,
    server
  };
}

export function setDeviceServerStatus(
  device: string,
  hasConnection: boolean
): SET_SERVER_STATUS {
  return {
    type: "DEVICE_SET_SERVER_STATUS",
    device,
    hasConnection
  };
}

export function requestDevice(device: string): REQUEST {
  return {
    type: "DEVICE_REQUEST",
    device
  };
}

export function receiveDevice(device: string): RECEIVE {
  return {
    type: "DEVICE_RECEIVE",
    device
  };
}
