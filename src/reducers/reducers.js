import {
  ADD_DEVICE,
  DISABLE_REFRESH,
  ENABLE_REFRESH,
  REMOVE_DEVICE,
  REMOVE_RESOURCES,
  RESTART_LIVE_RESOURCE,
  SELECT_DEVICE,
  SELECT_RESOURCE,
  RECEIVE_RESOURCE,
  EDIT_SINGLE_RESOURCE,
  EDIT_COMPLEX_RESOURCE_PAIR,
  REMOVE_ITEMS,
  DESELECT_ITEM,
  SELECT_ITEM,
  NAVIGATE,
  GO_BACK
} from "../actions/actions";
import base64 from "base-64";
import { Routes } from "../components/screens/Navigator";
import { NavigationActions } from "react-navigation";
import update from "update-immutable";

const { getActionForPathAndParams, getStateForAction } = Routes.router;

function devices(state = {}, action) {
  switch (action.type) {
    case ADD_DEVICE:
      // Parse
      const parts = action.jwt.split(".");
      if (parts.length === 3) {
        const payload = base64.decode(parts[1]);
        const json = JSON.parse(payload);
        return Object.assign({}, state, {
          [json.jti]: {
            isFetching: false,
            dev: json.dev,
            iat: json.iat,
            jti: json.jti,
            usr: json.usr,
            jwt: action.jwt
          }
        });
      }
      return state;
    case REMOVE_DEVICE:
      const newState = Object.assign({}, state);
      delete newState[action.jti];
      return newState;
    default:
      return state;
  }
}

function selectedDevice(state = null, action) {
  switch (action.type) {
    case SELECT_DEVICE:
      return action.jti;
    default:
      return state;
  }
}

function selectedResource(state = null, action) {
  switch (action.type) {
    case SELECT_RESOURCE:
      return action.key;
    default:
      return state;
  }
}

function refreshing(state = false, action) {
  switch (action.type) {
    case ENABLE_REFRESH:
      return true;
    case DISABLE_REFRESH:
      return false;
    default:
      return false;
  }
}

function resources(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESOURCE:
      return Object.assign({}, state, {
        [action.key]: action.value
      });
    case EDIT_SINGLE_RESOURCE:
      return {
        ...state,
        [action.resource]: {
          ...state[action.resource],
          in: action.value
        }
      };
    case EDIT_COMPLEX_RESOURCE_PAIR:
      return {
        ...state,
        [action.resource]: {
          ...state[action.resource],
          in: {
            ...state[action.resource].in,
            [action.key]: action.value
          }
        }
      };
    case REMOVE_RESOURCES:
      return [];
    default:
      return state;
  }
}

function liveResource(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESOURCE:
      const input = action.value["out"];
      if (typeof input === "object") {
        const keys = Object.keys(input);
        let newState = state;
        for (const key of keys) {
          newState = update(newState, { [key]: { $push: [input[key]] } });
        }
        return newState;
      } else {
        return update(state, { [action.key]: { $push: [input] } });
      }
    case RESTART_LIVE_RESOURCE:
      return {};
    default:
      return state;
  }
}

function selectedItems(state = {}, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return update(state, { [action.key]: {$set: true} });
    case DESELECT_ITEM:
      return update(state, { [action.key]: {$set: false} });
    case REMOVE_ITEMS:
      return {};
    default:
      return state;
  }
}

const initScreen = getStateForAction(getActionForPathAndParams("Main"));
function nav(state = initScreen, action) {
  switch (action.type) {
    case GO_BACK:
      return getStateForAction(NavigationActions.back(), state);
    case NAVIGATE:
      return getStateForAction(
        NavigationActions.navigate({ routeName: action.toScreen }),
        state
      );
    default:
      return state;
  }
}

export default {
  devices,
  selectedDevice,
  selectedResource,
  selectedItems,
  refreshing,
  resources,
  liveResource,
  nav
};
