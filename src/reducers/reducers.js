import {
  ADD_DEVICE,
  REMOVE_DEVICE,
  REMOVE_RESOURCES,
  RESTART_LIVE_RESOURCE,
  SELECT_DEVICE,
  SELECT_RESOURCE,
  RECEIVE_RESOURCE,
  REMOVE_ITEMS,
  NAVIGATE,
  GO_BACK,
  SELECT_ATTRIBUTE,
  DESELECT_ATTRIBUTE,
  SET_DEVICE_STATUS,
  REQUEST_RESOURCE,
  RECEIVE_DEVICE,
  REQUEST_DEVICE,
  SET_DEVICE_SERVER,
  AUTHORIZE_DEVICE,
  DEAUTHORIZE_DEVICE,
  SET_DEVICE_SERVER_STATUS,
  LOCK_ATTRIBUTE,
  UNLOCK_ATTRIBUTE,
  GO_TO_MAIN
} from "../actions/actions";
import { Routes } from "../components/navigators/Navigator";
import { NavigationActions } from "react-navigation";
import update from "update-immutable";
import { BARS, LINES, PIE } from "../components/navigators/Charts";

const { getActionForPathAndParams, getStateForAction } = Routes.router;

function devices(state = {}, action) {
  switch (action.type) {
    case ADD_DEVICE:
      return Object.assign({}, state, action.device);
    case SET_DEVICE_STATUS:
      return update(state, {
        [action.device]: { isOnline: { $set: action.online } }
      });
    case AUTHORIZE_DEVICE:
      return update(state, {
        [action.device]: { isAuthorized: { $set: true } }
      });
    case DEAUTHORIZE_DEVICE:
      return update(state, {
        [action.device]: { isAuthorized: { $set: false } }
      });
    case SET_DEVICE_SERVER:
      return update(state, {
        [action.device]: { server: { $set: action.server } }
      });
    case SET_DEVICE_SERVER_STATUS:
      return update(state, {
        [action.device]: { hasServerConnection: { $set: action.hasConnection } }
      });
    case REQUEST_DEVICE:
      return update(state, { [action.jti]: { isFetching: { $set: true } } });
    case RECEIVE_DEVICE:
      return update(state, { [action.jti]: { isFetching: { $set: false } } });
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

function resources(state = {}, action) {
  switch (action.type) {
    case REQUEST_RESOURCE:
      return update(state, { [action.id]: { isFetching: { $set: true } } });
    case RECEIVE_RESOURCE:
      const newState = update(state, {
        [action.id]: { data: { $set: action.value } }
      });
      return update(newState, { [action.id]: { isFetching: { $set: false } } });
    case REMOVE_RESOURCES:
      return {};
    default:
      return state;
  }
}

function liveResource(state = {}, action) {
  switch (action.type) {
    case RECEIVE_RESOURCE:
      const output = action.value["out"];
      if (typeof output === "object") {
        const keys = Object.keys(output);
        let newState = state;
        for (const key of keys) {
          newState = update(newState, { [key]: { $push: [output[key]] } });
        }
        return newState;
      } else {
        return update(state, { [action.key]: { $push: [output] } });
      }
    case RESTART_LIVE_RESOURCE:
      return {};
    default:
      return state;
  }
}

const defaultState = { [LINES]: {}, [PIE]: {}, [BARS]: {} };
function selectedAttributes(state = defaultState, action) {
  switch (action.type) {
    case SELECT_ATTRIBUTE:
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: true } }
      });
    case DESELECT_ATTRIBUTE:
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: false } }
      });
    case REMOVE_ITEMS:
      return defaultState;
    default:
      return state;
  }
}

function lockedAttributes(state = defaultState, action) {
  switch (action.type) {
    case LOCK_ATTRIBUTE:
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: true } }
      });
    case UNLOCK_ATTRIBUTE:
      return update(state, {
        [action.chart]: { [action.attribute]: { $set: false } }
      });
    case REMOVE_ITEMS:
      return defaultState;
    default:
      return state;
  }
}

const initScreen = getStateForAction(getActionForPathAndParams("Main"));
function nav(state = initScreen, action) {
  switch (action.type) {
    case GO_TO_MAIN:
      return getStateForAction(
        NavigationActions.reset({
          key: null,
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Main" })]
        }),
        state
      );
    case GO_BACK:
      console.log(state);
      return getStateForAction(
        NavigationActions.back({ key: action.key }),
        state
      );
    case NAVIGATE:
      return getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
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
  selectedAttributes,
  lockedAttributes,
  resources,
  liveResource,
  nav
};
