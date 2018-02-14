import API from "../API/API";

export const ADD_DEVICE = "ADD_DEVICE";
export const REMOVE_DEVICE = "REMOVE_DEVICE";
export const SELECT_DEVICE = "SELECT_DEVICE";
export const SET_DEVICE_STATUS = "SET_DEVICE_STATUS";
export const AUTHORIZE_DEVICE = "AUTHORIZE_DEVICE";
export const DEAUTHORIZE_DEVICE = "DEAUTHORIZE_DEVICE";
export const SET_DEVICE_SERVER = "SET_DEVICE_SERVER";
export const SET_DEVICE_SERVER_STATUS = "SET_DEVICE_SERVER_STATUS";
export const SELECT_RESOURCE = "SELECT_RESOURCE";
export const SELECT_ATTRIBUTE = "SELECT_ATTRIBUTE";
export const DESELECT_ATTRIBUTE = "DESELECT_ATTRIBUTE";
export const REMOVE_ITEMS = "REMOVE_ITEMS";
export const REQUEST_DEVICE = "REQUEST_DEVICE";
export const RECEIVE_DEVICE = "RECEIVE_DEVICE";
export const REQUEST_RESOURCE = "REQUEST_RESOURCE";
export const RECEIVE_RESOURCE = "RECEIVE_RESOURCE";
export const REMOVE_RESOURCES = "REMOVE_RESOURCES";
export const RESTART_LIVE_RESOURCE = "RESTART_LIVE_RESOURCE";
export const NAVIGATE = "Navigation/NAVIGATE";
export const GO_BACK = "Navigation/BACK";

export function addDevice(device) {
  return {
    type: ADD_DEVICE,
    device
  };
}

export function removeDevice(jti) {
  return {
    type: REMOVE_DEVICE,
    jti
  };
}

export function selectDevice(jti) {
  return {
    type: SELECT_DEVICE,
    jti
  };
}

export function setDeviceState(device, online) {
  return {
    type: SET_DEVICE_STATUS,
    device,
    online
  };
}

export function authorizeDevice(device) {
  return {
    type: AUTHORIZE_DEVICE,
    device
  };
}

export function deauthorizeDevice(device) {
  return {
    type: AUTHORIZE_DEVICE,
    device
  };
}

export function setDeviceServer(device, server) {
  return {
    type: SET_DEVICE_SERVER,
    device,
    server
  };
}

export function setDeviceServerStatus(device, hasConnection) {
  return {
    type: SET_DEVICE_SERVER_STATUS,
    device,
    hasConnection
  };
}

export function selectResource(key) {
  return {
    type: SELECT_RESOURCE,
    key
  };
}

export function selectAttribute(attribute, chart) {
  return {
    type: SELECT_ATTRIBUTE,
    attribute,
    chart
  };
}

export function deselectAttribute(attribute, chart) {
  return {
    type: DESELECT_ATTRIBUTE,
    attribute,
    chart
  };
}

export function removeItems() {
  return {
    type: REMOVE_ITEMS
  };
}

export function requestDevice(jti) {
  return {
    type: REQUEST_DEVICE,
    jti
  };
}

export function receiveDevice(jti) {
  return {
    type: RECEIVE_DEVICE,
    jti
  };
}

export function requestResource(id) {
  return {
    type: REQUEST_RESOURCE,
    id
  };
}

export function receiveResource(id, value) {
  return {
    type: RECEIVE_RESOURCE,
    id,
    value
  };
}

export function removeResources() {
  return {
    type: REMOVE_RESOURCES
  };
}

export function restartLiveResource() {
  return {
    type: RESTART_LIVE_RESOURCE
  };
}

export function navigate(screen, title) {
  return {
    type: NAVIGATE,
    routeName: screen,
    title
  };
}

export function goBack() {
  return {
    type: GO_BACK
  };
}

export function getResourceFromApi(device, key) {
  return dispatch => {
    dispatch(requestResource(key));
    return API.getResource(
      device.server,
      device.usr,
      device.dev,
      key,
      device.jwt
    )
      .then(response => response.json())
      .then(json => dispatch(receiveResource(key, json)))
      .catch(error => {
        throw error;
      });
  };
}

export function getResourcesFromApi(device) {
  return dispatch => {
    dispatch(requestDevice(device.jti));
    return API.getResources(device.server, device.usr, device.dev, device.jwt)
      .then(response => {
        dispatch(setDeviceServerStatus(device.jti, true));
        switch (response.status) {
          case 200:
            dispatch(authorizeDevice(device.jti));
            dispatch(setDeviceState(device.jti, true));
            break;
          case 401:
            dispatch(deauthorizeDevice(device.jti));
            break;
          case 404:
            dispatch(setDeviceState(device.jti, false));
            break;
        }
        return response.json();
      })
      .then(json => {
        const keys = Object.keys(json);
        let promises = [];
        for (const key of keys) {
          promises.push(dispatch(getResourceFromApi(device, key)));
        }
        return Promise.all(promises);
      })
      .then(() => dispatch(receiveDevice(device.jti)))
      .catch(error => {
        if (error instanceof TypeError)
          dispatch(setDeviceServerStatus(device.jti, false));
      });
  };
}

export function postResource(device, id, value) {
  return dispatch => {
    dispatch(requestResource(id));
    return API.post(
      device.server,
      device.usr,
      device.dev,
      id,
      value,
      device.jwt
    )
      .then(response => response.json())
      .then(json =>
        dispatch(receiveResource(id, Object.assign({}, { in: value }, json)))
      )
      .catch(error => {
        console.log(error);
      });
  };
}

export function runResource(device, id) {
  return API.run(device.server, device.usr, device.dev, id, device.jwt).catch(
    error => {
      console.log(error);
    }
  );
}
