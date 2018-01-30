import fetch from "cross-fetch";

export const ADD_DEVICE = "ADD_DEVICE";
export const REMOVE_DEVICE = "REMOVE_DEVICE";
export const SELECT_DEVICE = "SELECT_DEVICE";
export const SELECT_RESOURCE = "SELECT_RESOURCE";
export const SELECT_ITEM = "SELECT_ITEM";
export const UNSELECT_ITEM = "UNSELECT_ITEM";
export const UNSELECT_ALL_ITEMS = "UNSELECT_ALL_ITEMS";
export const RECEIVE_RESOURCE = "RECEIVE_RESOURCE";
export const EDIT_SINGLE_RESOURCE = "EDIT_SINGLE_RESOURCE";
export const EDIT_COMPLEX_RESOURCE_PAIR = "EDIT_COMPLEX_RESOURCE_PAIR";
export const REMOVE_RESOURCES = "REMOVE_RESOURCES";
export const RESTART_LIVE_RESOURCE = "RESTART_LIVE_RESOURCE";
export const ENABLE_REFRESH = "ENABLE_REFRESH";
export const DISABLE_REFRESH = "DISABLE_REFRESH";
export const NAVIGATE = "NAVIGATE";
export const GO_BACK = "Navigation/BACK";

export function addDevice(jwt) {
  return {
    type: ADD_DEVICE,
    jwt
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

export function selectResource(key) {
  return {
    type: SELECT_RESOURCE,
    key
  };
}

export function selectItem(key) {
  return {
    type: SELECT_ITEM,
    key
  };
}

export function unselectItem(key) {
  return {
    type: UNSELECT_ITEM,
    key
  };
}

export function unselectAllItems() {
  return {
    type: UNSELECT_ALL_ITEMS,
  };
}

export function receiveResource(key, value) {
  return {
    type: RECEIVE_RESOURCE,
    key,
    value
  };
}

export function editSimpleResource(resource, value) {
  return {
    type: EDIT_SINGLE_RESOURCE,
    resource,
    value
  };
}

export function editComplexResourcePair(resource, key, value) {
  return {
    type: EDIT_COMPLEX_RESOURCE_PAIR,
    resource,
    key,
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

export function navigate(screen) {
  return {
    type: NAVIGATE,
    toScreen: screen
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
      .then(response => response.json())
      .then(json => {
        const keys = Object.keys(json);
        for (const key of keys) {
          dispatch(getResourceFromApi(device, key));
        }
      })
      .catch(error => {
        console.error(error);
      });
}

export function postResource(device, key, value) {
  return dispatch =>
    fetch(
      `https://api.thinger.io/v2/users/${device.usr}/devices/${
        device.dev
      }/${key}`,
      generatePOSTHeader(device.jwt, { in: value })
    )
      .then(response => {
        response.json();
      })
      .then(() => {
        dispatch(getResourcesFromApi(device));
      })
      .catch(error => {
        console.error(error);
      });
}
