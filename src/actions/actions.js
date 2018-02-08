import fetch from "cross-fetch";

export const ADD_DEVICE = "ADD_DEVICE";
export const REMOVE_DEVICE = "REMOVE_DEVICE";
export const SELECT_DEVICE = "SELECT_DEVICE";
export const SET_DEVICE_STATE = "SET_DEVICE_STATE";
export const SELECT_RESOURCE = "SELECT_RESOURCE";
export const SELECT_ATTRIBUTE = "SELECT_ATTRIBUTE";
export const DESELECT_ATTRIBUTE = "DESELECT_ATTRIBUTE";
export const REMOVE_ITEMS = "REMOVE_ITEMS";
export const RECEIVE_RESOURCE = "RECEIVE_RESOURCE";
export const REMOVE_RESOURCES = "REMOVE_RESOURCES";
export const RESTART_LIVE_RESOURCE = "RESTART_LIVE_RESOURCE";
export const ENABLE_REFRESH = "ENABLE_REFRESH";
export const DISABLE_REFRESH = "DISABLE_REFRESH";
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
    type: SET_DEVICE_STATE,
    device,
    online
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

export function enableRefresh() {
  return {
    type: ENABLE_REFRESH
  };
}

export function disableRefresh() {
  return {
    type: DISABLE_REFRESH
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

function generateGETHeader(jwt) {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + jwt,
      Accept: "application/json, text/plain, */*"
    }
  };
}

function generatePOSTHeader(jwt, json) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: "Bearer " + jwt,
      Accept: "application/json, text/plain, */*"
    },
    body: JSON.stringify(json)
  };
}

export function getResourceFromApi(device, key) {
  return dispatch =>
    fetch(
      `https://api.thinger.io/v2/users/${device.usr}/devices/${
        device.dev
      }/${key}/api`,
      generateGETHeader(device.jwt)
    )
      .then(response => response.json())
      .then(json => dispatch(receiveResource(key, json)))
      .catch(error => {
        console.error(error);
      });
}

export function getResourcesFromApi(device) {
  return dispatch =>
    fetch(
      `https://api.thinger.io/v2/users/${device.usr}/devices/${device.dev}/api`,
      generateGETHeader(device.jwt)
    )
      .then(response => {
        if (response.status === 200) dispatch(setDeviceState(device.jti, true));
        if (response.status === 404)
          dispatch(setDeviceState(device.jti, false));
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
      .catch(error => {
        console.error(error);
      });
}

export function postResource(device, id, value) {
  return dispatch =>
    fetch(
      `https://api.thinger.io/v2/users/${device.usr}/devices/${
        device.dev
      }/${id}`,
      generatePOSTHeader(device.jwt, { in: value })
    )
      .then(response => response.json())
      .then(json =>
        dispatch(receiveResource(id, Object.assign({}, { in: value }, json)))
      )
      .catch(error => {
        console.error(error);
      });
}

export function runResource(device, id) {
  fetch(
    `https://api.thinger.io/v2/users/${device.usr}/devices/${device.dev}/${id}`,
    generateGETHeader(device.jwt)
  ).catch(error => {
    console.error(error);
  });
}
