import { NavigationActions } from "react-navigation";
import { Analytics, PageHit } from "expo-analytics";
import ID from "../constants/GoogleAnalytics";

const tracker = new Analytics(ID);

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

export default (screenTracking = ({ getState }) => next => action => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen) {
    tracker.hit(new PageHit(nextScreen));
  }
  return result;
});
