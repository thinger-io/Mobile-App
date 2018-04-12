//@flow

type SET_USER = {
  type: "LOGIN_SET_USER",
  user: string
};
type SET_PASSWORD = {
  type: "LOGIN_SET_PASSWORD",
  password: string
};

export type LoginAction =
  | SET_USER
  | SET_PASSWORD;

export function setUser(user: string): SET_USER {
  return { type: "LOGIN_SET_USER", user };
}

export function setPassword(password: string): SET_PASSWORD {
  return { type: "LOGIN_SET_PASSWORD", password };
}