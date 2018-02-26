//@flow

import {
  authorizeDevice,
  deauthorizeDevice,
  receiveDevice,
  requestDevice,
  setDeviceServerStatus,
  setDeviceState
} from "./device";
import { receiveResource, requestResource } from "./resource";
import API from "../API/API";
import type { Device } from "../types/Device";
import type { ThunkAction } from "../types/Dispatch";
import type { Attribute } from "../types/Attribute";

function handleResponseStatus(device, status, dispatch) {
  switch (status) {
    case 200:
      dispatch(authorizeDevice(device.jti));
      dispatch(setDeviceState(device.jti, true));
      break;
    case 401:
      dispatch(deauthorizeDevice(device.jti));
      break;
    case 404:
      dispatch(authorizeDevice(device.jti));
      dispatch(setDeviceState(device.jti, false));
      break;
  }
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
      dispatch(setDeviceServerStatus(device.jti, true));
      await handleResponseStatus(device, response.status, dispatch);
      const json = await response.json();
      return dispatch(receiveResource(resource, json));
    } catch (error) {
      if (error instanceof TypeError)
        dispatch(setDeviceServerStatus(device.jti, false));
    }
  };
}

export function getResourcesFromApi(device: Device): ThunkAction {
  return async dispatch => {
    try {
      dispatch(requestDevice(device.jti));
      let resources;
      if (!device.res) {
        const response = await API.getResources(
          device.server,
          device.usr,
          device.dev,
          device.jwt
        );
        dispatch(setDeviceServerStatus(device.jti, true));
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
      return dispatch(receiveDevice(device.jti));
    } catch (error) {
      dispatch(receiveDevice(device.jti));
      if (error instanceof TypeError)
        dispatch(setDeviceServerStatus(device.jti, false));
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
    const json = response.json();
    return dispatch(
      receiveResource(resource, Object.assign({}, { in: value }, json))
    );
  };
}

export function runResource(device: Device, resource: string): ThunkAction {
  return API.run(device.server, device.usr, device.dev, resource, device.jwt);
}
