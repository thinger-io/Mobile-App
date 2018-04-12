//@flow

import type { NavAction } from "../actions/nav";
import { Routes } from "../components/navigation/Navigator";
import { NavigationActions } from "react-navigation";
import type { NavState } from "../types/State";

const { getActionForPathAndParams, getStateForAction } = Routes.router;

const initialState: NavState = getStateForAction(
  getActionForPathAndParams("Main/UserDevices")
);

export default function lockedAttributes(
  state: NavState = initialState,
  action: NavAction
) {
  switch (action.type) {
    case "Navigation/MAIN":
      return getStateForAction(
        NavigationActions.reset({
          key: null,
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Main" })]
        }),
        state
      );
    case "Navigation/BACK":
      return getStateForAction(NavigationActions.back(), state);
    case "Navigation/NAVIGATE":
      return getStateForAction(
        NavigationActions.navigate({ routeName: action.routeName }),
        state
      );
    default:
      return state;
  }
}
