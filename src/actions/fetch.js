//@flow

import {
  addDevice,
  authorizeDevice,
  deauthorizeDevice,
  receiveDevice,
  requestDevice,
  setDeviceServerStatus,
  setDeviceState
} from "./device";
import { receiveResource, requestResource } from "./resource";
import {receiveDevices, receiveSession, receiveSessionFailure, requestDevices, requestSession} from "./login";
import API from "../API/API";
import type { Device } from "../types/Device";
import type { ThunkAction } from "../types/Dispatch";
import type { Attribute } from "../types/Attribute";

function handleResponseStatus(device, status, dispatch) {
  switch (status) {
    case 200:
      dispatch(authorizeDevice(device.id));
      dispatch(setDeviceState(device.id, true));
      break;
    case 401:
      dispatch(deauthorizeDevice(device.id));
      break;
    case 404:
      dispatch(authorizeDevice(device.id));
      dispatch(setDeviceState(device.id, false));
      break;
  }
}

export function loginFromApi(
  server: string,
  username: string,
  password: string
): ThunkAction {
  return async dispatch => {
    try {
      dispatch(requestSession());
      const response = await API.login(server, username, password);
      if (response.status === 200) {
        const json = await response.json();
        return dispatch(receiveSession(json.access_token));
      } else {
        return dispatch(receiveSessionFailure());
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export function getDevicesFromUser(
  server: string,
  username: string,
  jwt: string
): ThunkAction {
  return async dispatch => {
    dispatch(requestDevices());
    const userDevices = await API.getUserDeviceList(server, username, jwt);
    const devices = await userDevices.json();
    const promises = devices.map(device =>
      dispatch(addDevice(
        {
          [device.device]: {
            jwt,
            id: device.device,
            dev: device.device,
            usr: username,
            name: device.description,
            isFetching: false,
            isOnline: device.connection === "active",
            isAuthorized: true,
            server,
            hasServerConnection: true
          }
        },
        true
      ))
    );
    await Promise.all(promises);
    return dispatch(receiveDevices());
  };
}

export function getResourceFromApi(
  device: Device,
  resource: string
): ThunkAction {
  return async dispatch => {
    try {
      dispatch(requestResource(resource));
      const response = await API.getResource(
        device.server,
        device.usr,
        device.dev,
        resource,
        device.jwt
      );
      dispatch(setDeviceServerStatus(device.id, true));
      await handleResponseStatus(device, response.status, dispatch);
      const json = await response.json();
      return dispatch(receiveResource(resource, json));
    } catch (error) {
      if (error instanceof TypeError)
        dispatch(setDeviceServerStatus(device.id, false));
    }
  };
}

export function getResourcesFromApi(device: Device): ThunkAction {
  return async dispatch => {
    try {
      dispatch(requestDevice(device.id));
      let resources;
      if (!device.res) {
        const response = await API.getResources(
          device.server,
          device.usr,
          device.dev,
          device.jwt
        );
        dispatch(setDeviceServerStatus(device.id, true));
        await handleResponseStatus(device, response.status, dispatch);
        const json = await response.json();
        resources = Object.keys(json);
      } else {
        resources = device.res;
      }
      const promises = resources.map(key =>
        dispatch(getResourceFromApi(device, key))
      );
      await Promise.all(promises);
      return dispatch(receiveDevice(device.id));
    } catch (error) {
      dispatch(receiveDevice(device.id));
      if (error instanceof TypeError)
        dispatch(setDeviceServerStatus(device.id, false));
    }
  };
}

export function postResource(
  device: Device,
  resource: string,
  value: Attribute | { [attribute: string]: Attribute }
): ThunkAction {
  return async dispatch => {
    dispatch(requestResource(resource));
    const response = await API.post(
      device.server,
      device.usr,
      device.dev,
      resource,
      value,
      device.jwt
    );
    const json = await response.json();
    return dispatch(
      receiveResource(resource, Object.assign({}, { in: value }, json))
    );
  };
}

export function runResource(device: Device, resource: string): ThunkAction {
  return API.run(device.server, device.usr, device.dev, resource, device.jwt);
}
