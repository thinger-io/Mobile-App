import { NavigationActions } from "react-navigation";
import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
import ID from "../constants/GoogleAnalytics";

const tracker = new GoogleAnalyticsTracker(ID);

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
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
    tracker.trackScreenView(nextScreen);
  }
  return result;
});
