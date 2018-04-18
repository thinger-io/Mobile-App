import { Vibration } from "react-native";

export default (vibrate = () => next => action => {
  if (
    action.type !== "@@TOAST/DISPLAY_ERROR" &&
    action.type !== "@@TOAST/DISPLAY_INFO" &&
    action.type !== "@@TOAST/DISPLAY_WARNING"
  ) {
    return next(action);
  }

  Vibration.vibrate();
  return next(action);
});
