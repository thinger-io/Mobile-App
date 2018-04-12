//@flow

import update from "immutability-helper";
import type { LoginState } from "../types/State";
import type { LoginAction } from "../actions/login";

const initialState: LoginState = {
  user: undefined,
  password: undefined,
  isLogged: false
};

export default function devices(
  state: LoginState = initialState,
  action: LoginAction
) {
  switch (action.type) {
    case "LOGIN_SET_USER":
      return update(state, {
        user: { $set: action.user }
      });
    case "LOGIN_SET_PASSWORD":
      return update(state, {
        password: { $set: action.password }
      });
    default:
      return state;
  }
}
