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
  REMOVE_ITEMS,
  NAVIGATE,
  GO_BACK,
  SELECT_ATTRIBUTE,
  DESELECT_ATTRIBUTE,
  SET_DEVICE_STATE
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
    case SET_DEVICE_STATE:
      return update(state, {
        [action.device]: { online: { $set: action.online } }
      });
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
      return update(state, { [action.id]: { $set: action.value } });
    case REMOVE_RESOURCES:
      return {};
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

defaultState = { [LINES]: {}, [PIE]: {}, [BARS]: {} };
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

const initScreen = getStateForAction(getActionForPathAndParams("Main"));
function nav(state = initScreen, action) {
  switch (action.type) {
    case GO_BACK:
      return getStateForAction(NavigationActions.back(), state);
    case NAVIGATE:
      return getStateForAction(
        NavigationActions.navigate({
          routeName: action.routeName,
          params: { title: action.title }
        }),
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
  refreshing,
  resources,
  liveResource,
  nav
};
